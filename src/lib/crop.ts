import { CanvasImageItem } from "types/canvas"

export function executeCrop(
  htmlImage: HTMLImageElement,
  inset: [number, number, number, number]
): Partial<CanvasImageItem> {
  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d")

  if (!ctx) throw new Error("Couldn't get a 2D canvas")

  const [t, r, b, l] = inset

  const crop = {
    width: htmlImage.width - (l * htmlImage.width + r * htmlImage.width),
    height: htmlImage.height - (t * htmlImage.height + b * htmlImage.height),
    left: l * htmlImage.width,
    top: t * htmlImage.height,
  }

  ctx.canvas.width = crop.width
  ctx.canvas.height = crop.height

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = {
    sx: l * htmlImage.width,
    sy: t * htmlImage.height,
    sWidth: crop.width,
    sHeight: crop.height,
    dx: 0,
    dy: 0,
    dWidth: crop.width,
    dHeight: crop.height,
  }

  ctx.drawImage(htmlImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  const newImage = ctx.canvas.toDataURL("image/png")
  const test = new Image(crop.width, crop.height)
  test.src = newImage
  document.body.appendChild(test)
  return {
    src: newImage,
    width: crop.width,
    height: crop.height,
  }
}

export default executeCrop
