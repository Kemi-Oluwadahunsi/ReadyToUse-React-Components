import { FilterableGallery } from "../components/FilterableGallery";

const galleryItems = [
  { id: 1, src: "https://picsum.photos/seed/arch1/600/600", title: "Mountain Retreat", categories: ["Nature", "Travel"] },
  { id: 2, src: "https://picsum.photos/seed/arch2/600/600", title: "City Skyline", categories: ["Architecture", "Travel"] },
  { id: 3, src: "https://picsum.photos/seed/arch3/600/600", title: "Forest Path", categories: ["Nature"] },
  { id: 4, src: "https://picsum.photos/seed/arch4/600/600", title: "Modern Building", categories: ["Architecture"] },
  { id: 5, src: "https://picsum.photos/seed/arch5/600/600", title: "Ocean Sunset", categories: ["Nature", "Travel"] },
  { id: 6, src: "https://picsum.photos/seed/arch6/600/600", title: "Street Art", categories: ["Art"] },
  { id: 7, src: "https://picsum.photos/seed/arch7/600/600", title: "Abstract Painting", categories: ["Art"] },
  { id: 8, src: "https://picsum.photos/seed/arch8/600/600", title: "Historic Bridge", categories: ["Architecture", "Travel"] },
  { id: 9, src: "https://picsum.photos/seed/arch9/600/600", title: "Wildflower Meadow", categories: ["Nature"] },
  { id: 10, src: "https://picsum.photos/seed/arch10/600/600", title: "Sculpture Garden", categories: ["Art", "Nature"] },
  { id: 11, src: "https://picsum.photos/seed/arch11/600/600", title: "Desert Dunes", categories: ["Nature", "Travel"] },
  { id: 12, src: "https://picsum.photos/seed/arch12/600/600", title: "Glass Tower", categories: ["Architecture"] },
];

export default {
  title: "Data Display/FilterableGallery",
  component: FilterableGallery,
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    showLightbox: { control: "boolean" },
    allLabel: { control: "text" },
  },
};

export const Default = {
  args: {
    items: galleryItems,
    columns: 3,
    showLightbox: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterableGallery
  items={[
    { id: 1, src: "https://picsum.photos/seed/a/600/600", title: "Mountain", categories: ["Nature"] },
    { id: 2, src: "https://picsum.photos/seed/b/600/600", title: "Skyline", categories: ["Architecture"] },
    // ...more items
  ]}
  columns={3}
  showLightbox
/>`,
      },
    },
  },
};

export const FourColumns = {
  args: {
    items: galleryItems,
    columns: 4,
    showLightbox: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterableGallery items={items} columns={4} />`,
      },
    },
  },
};

export const NoLightbox = {
  args: {
    items: galleryItems.slice(0, 6),
    columns: 3,
    showLightbox: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterableGallery items={items} showLightbox={false} />`,
      },
    },
  },
};

export const CustomCategories = {
  args: {
    items: galleryItems,
    categories: ["Nature", "Architecture"],
    columns: 3,
    allLabel: "Show All",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterableGallery
  items={items}
  categories={["Nature", "Architecture"]}
  allLabel="Show All"
/>`,
      },
    },
  },
};
