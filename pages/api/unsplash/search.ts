import { api } from "lib/unsplash"
import { NextApiRequest, NextApiResponse } from "next"
import { parseUrl } from "query-string"
import { serializeError } from "serialize-error"
import * as z from "zod"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q: query } = z
      .object({
        q: z.string().nonempty(),
      })
      .nonstrict()
      .parse(req.query)
    const { response } = await api.search.getPhotos({
      query,
    })
    if (!response) throw new Error("No response")
    res.json(response)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
