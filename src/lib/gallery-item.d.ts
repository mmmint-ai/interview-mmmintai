/**
 * Gallery items for @see ImageGallery.vue
 */
export interface GalleryItem {
  /**
   * The unique identifier for each image
   */
  id: string

  /**
   * The index of the specific image based on the absolute position within the GalleryItem Array.
   */
  index: number

  /**
   * The image url of the image.
   * On local files that can be created via `URL.createObjectURL(file)`
   * @example URL.createObjectURL(file)
   * @example "https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp"
   */
  src: string

  /**
   * A low rez image for displaying as thumbnail
   * On local files that can be created via `URL.createObjectURL(file)`
   * @example URL.createObjectURL(file)
   * @example "https://www.schadensmeldung.digital/images/fuhrparkmanagerin.webp"
   */
  thumbnail: string

  /**
   * Width of the image
   */
  w: number

  /**
   * Height of the image
   */
  h: number

  /**
   * Title of the image
   */
  title?: string
}
