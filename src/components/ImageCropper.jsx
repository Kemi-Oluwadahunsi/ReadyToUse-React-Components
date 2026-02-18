import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, ZoomOut, RotateCw, Check, X } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * ImageCropper - Drag-to-crop overlay with zoom, rotation, and aspect ratio lock.
 */
/*
 * @param {string} src - Image source URL or data URL
 * @param {boolean} isOpen - Controlled open state
 * @param {Function} onClose - Called when cancelled
 * @param {Function} onCrop - Called with cropped Blob and data URL: ({ blob, dataUrl, width, height }) => void
 * @param {number} aspectRatio - Aspect ratio (e.g. 1 for square, 16/9). Null = free
 * @param {number} quality - JPEG quality 0-1 (default 0.92)
 * @param {string} outputType - MIME type for output (default "image/jpeg")
 * @param {number} minZoom - Min zoom (default 1)
 * @param {number} maxZoom - Max zoom (default 3)
 * @param {boolean} showGrid - Show crop grid lines (default true)
 * @param {boolean} circular - Circular crop mask (default false)
 * @param {string} className - Extra CSS on the modal
 */
const ImageCropper = ({
  src,
  isOpen = false,
  onClose,
  onCrop,
  aspectRatio = 1,
  quality = 0.92,
  outputType = "image/jpeg",
  minZoom = 1,
  maxZoom = 3,
  showGrid = true,
  circular = false,
  className = "",
}) => {
  injectRuiStyles();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const imgRef = useRef(null);
  const cropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen, src]);

  const onImgLoad = () => {};

  /* ── drag ── */
  const onPointerDown = (e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };
  const onPointerUp = () => setDragging(false);

  /* ── wheel zoom ── */
  const onWheel = (e) => {
    e.preventDefault();
    setZoom((z) => Math.min(maxZoom, Math.max(minZoom, z - e.deltaY * 0.002)));
  };

  /* ── crop ── */
  const handleCrop = useCallback(() => {
    const img = imgRef.current;
    const cropEl = cropRef.current;
    if (!img || !cropEl) return;

    const cropRect = cropEl.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Scale factors from displayed to natural
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;

    // Crop area in natural image coordinates
    const sx = (cropRect.left - imgRect.left) * scaleX;
    const sy = (cropRect.top - imgRect.top) * scaleY;
    const sw = cropRect.width * scaleX;
    const sh = cropRect.height * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = cropRect.width * 2; // 2x for retina
    canvas.height = cropRect.height * 2;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";

    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const dataUrl = canvas.toDataURL(outputType, quality);
        onCrop?.({ blob, dataUrl, width: canvas.width, height: canvas.height });
      },
      outputType,
      quality
    );
  }, [rotation, outputType, quality, onCrop]);

  if (!isOpen) return null;

  const cropSize = 280;
  const cropW = cropSize;
  const cropH = aspectRatio ? cropSize / aspectRatio : cropSize;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,.85)" }}
    >
      <div
        className={`relative bg-zinc-900 rounded-2xl overflow-hidden max-w-lg w-full ${className}`}
        style={{ animation: "rui-crop-in .2s ease-out" }}
      >
        {/* Crop area */}
        <div
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ height: 400, cursor: dragging ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          {/* Image */}
          <img
            ref={imgRef}
            src={src}
            onLoad={onImgLoad}
            alt="Crop preview"
            className="absolute select-none pointer-events-none"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              maxWidth: "none",
              transition: dragging ? "none" : "transform .15s ease",
            }}
            draggable={false}
          />

          {/* Darkened overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(transparent 0%, transparent 0%)`,
            boxShadow: `0 0 0 9999px rgba(0,0,0,.6)`,
          }}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: cropW, height: cropH }}>
              {/* Clear center hole via box-shadow */}
            </div>
          </div>

          {/* Crop frame */}
          <div
            ref={cropRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: cropW,
              height: cropH,
              border: "2px solid white",
              borderRadius: circular ? "50%" : 8,
              boxShadow: "0 0 0 9999px rgba(0,0,0,.55)",
            }}
          >
            {/* Grid */}
            {showGrid && !circular && (
              <>
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Zoom slider */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ZoomOut className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="range"
              min={minZoom}
              max={maxZoom}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-gray-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" /> Rotate
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                type="button"
                onClick={handleCrop}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" /> Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

ImageCropper.displayName = "ImageCropper";

export { ImageCropper };
export default ImageCropper;
