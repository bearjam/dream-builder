import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import * as z from "zod"
import { api } from "lib/unsplash"

const reqP = z.object({
  slug: z.string().nonempty(),
  page: z.string().regex(/^\d+$/).transform(Number),
})

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug, page = 1 } = reqP.parse(req.query)
    const { response } = await api.topics.getPhotos({
      topicIdOrSlug: slug,
      perPage: 50,
      page,
    })
    if (!response) throw new Error("No response")
    res.json(response)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
