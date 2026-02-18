import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, File, Image, CheckCircle, AlertCircle } from "lucide-react";

/**
 * FileUploader - Drag-and-drop file upload zone with previews & validation.
 */
/*
 * @param {Function} onUpload - Called with accepted File[] after selection
 * @param {string[]} accept - Allowed MIME types or extensions (e.g. ["image/*", ".pdf"])
 * @param {number} maxSize - Max file size in bytes (default 10MB)
 * @param {number} maxFiles - Max number of files (default 10)
 * @param {boolean} multiple - Allow multiple files (default true)
 * @param {boolean} showPreview - Show file previews (default true)
 * @param {string} className - Extra CSS
 * @param {string} dropzoneClassName - Extra CSS on the drop area
 * @param {string} label - Main label text
 * @param {string} hint - Secondary hint text
 * @param {Function} onError - Called with error object { file, reason }
 * @param {Function} renderFile - Custom file renderer: (file, { remove, progress }) => JSX
 */
const FileUploader = ({
  onUpload,
  accept: acceptProp = [],
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  multiple = true,
  showPreview = true,
  className = "",
  dropzoneClassName = "",
  label,
  hint,
  onError,
  renderFile: customRenderFile,
}) => {
  const accept = Array.isArray(acceptProp) ? acceptProp : acceptProp.split(",").map((s) => s.trim()).filter(Boolean);
  const [files, setFiles] = useState([]); // { id, file, preview?, status, error? }
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const nextId = useRef(0);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateFile = useCallback(
    (file) => {
      if (maxSize && file.size > maxSize) {
        return `File exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB limit`;
      }
      if (accept.length > 0) {
        const ok = accept.some((a) => {
          if (a.startsWith(".")) return file.name.toLowerCase().endsWith(a.toLowerCase());
          if (a.endsWith("/*")) return file.type.startsWith(a.replace("/*", "/"));
          return file.type === a;
        });
        if (!ok) return "File type not accepted";
      }
      return null;
    },
    [accept, maxSize]
  );

  const addFiles = useCallback(
    (incoming) => {
      const newFiles = [];
      const allFiles = [...files];

      for (const file of incoming) {
        if (allFiles.length + newFiles.length >= maxFiles) {
          onError?.({ file, reason: `Maximum ${maxFiles} files allowed` });
          break;
        }
        const error = validateFile(file);
        if (error) {
          onError?.({ file, reason: error });
          continue;
        }
        const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
        newFiles.push({
          id: nextId.current++,
          file,
          preview,
          status: "ready",
          error: null,
        });
      }

      if (newFiles.length > 0) {
        const updated = multiple ? [...allFiles, ...newFiles] : newFiles.slice(0, 1);
        setFiles(updated);
        onUpload?.(updated.map((f) => f.file));
      }
    },
    [files, maxFiles, multiple, onUpload, onError, validateFile]
  );

  const removeFile = useCallback(
    (id) => {
      setFiles((prev) => {
        const next = prev.filter((f) => {
          if (f.id === id && f.preview) URL.revokeObjectURL(f.preview);
          return f.id !== id;
        });
        onUpload?.(next.map((f) => f.file));
        return next;
      });
    },
    [onUpload]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles([...e.dataTransfer.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={className}>
      {/* Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all
          ${dragOver
            ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.01]"
            : "border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/30 hover:border-gray-300 dark:hover:border-zinc-600"
          }
          ${dropzoneClassName}
        `}
      >
        <div className={`p-3 rounded-xl transition-colors ${dragOver ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-zinc-800"}`}>
          <Upload className={`w-6 h-6 ${dragOver ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label || (dragOver ? "Drop files here" : "Drag & drop files or click to browse")}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {hint || `${accept.length ? accept.join(", ") : "Any file"} • Max ${(maxSize / (1024 * 1024)).toFixed(0)}MB${multiple ? ` • Up to ${maxFiles} files` : ""}`}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept.join(",")}
          onChange={(e) => { if (e.target.files.length) addFiles([...e.target.files]); e.target.value = ""; }}
          className="hidden"
        />
      </div>

      {/* File list */}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f) =>
            customRenderFile ? (
              customRenderFile(f.file, { remove: () => removeFile(f.id), progress: 100 })
            ) : (
              <div
                key={f.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700"
              >
                {/* Preview */}
                {f.preview ? (
                  <img src={f.preview} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
                    <File className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{f.file.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{formatSize(f.file.size)}</p>
                </div>

                {/* Status */}
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />

                {/* Remove */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

FileUploader.displayName = "FileUploader";

export { FileUploader };
export default FileUploader;
