import refresh from "api/google/fonts/refresh"
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import * as z from "zod"

const { FONTS_PATH } = z
  .object({
    FONTS_PATH: z.string().nonempty(),
  })
  .nonstrict()
  .parse(process.env)

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const exists = fs.existsSync(FONTS_PATH)
    if (!exists) {
      await refresh()
    }
    const { limit = 100 } = req.query
    const fonts = JSON.parse(fs.readFileSync(FONTS_PATH, { encoding: "utf-8" }))
    res.json(fonts.slice(0, limit))
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
