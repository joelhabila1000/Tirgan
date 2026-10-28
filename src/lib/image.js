/**
 * Turn a picked File into a resized JPEG data URL, in the browser.
 *
 * Doing this here keeps uploads small (a phone photo becomes ~200 KB) and means
 * the API never has to decode or resize images.
 */
const MAX_EDGE = 1600
const QUALITY = 0.82

export async function fileToResizedDataUrl(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Choose an image file (JPEG, PNG or WebP).')
  }

  /* imageOrientation honours the EXIF tag, so phone photos are not sideways. */
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  /* Flatten transparency onto white; JPEG would otherwise render it black. */
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(bitmap, 0, 0, width, height)
  if (typeof bitmap.close === 'function') bitmap.close()

  return canvas.toDataURL('image/jpeg', QUALITY)
}
