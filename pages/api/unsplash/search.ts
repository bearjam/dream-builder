import { api } from "lib/unsplash"
import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import * as z from "zod"

const reqP = z.object({
  q: z.string().nonempty(),
  page: z.string().regex(/^\d+$/).transform(Number),
})

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q: query, page = 1 } = reqP.parse(req.query)
    const { response } = await api.search.getPhotos({
      query,
      perPage: 50,
      page,
    })
    if (!response) throw new Error("No response")
    res.json(response)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
