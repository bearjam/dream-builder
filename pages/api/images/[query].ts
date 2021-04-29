import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import * as z from "zod"
import { api } from "../../../src/lib/unsplash"

const reqP = z.object({
  query: z.string().nonempty(),
})

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = reqP.parse(req.query)
    const { response } = await api.search.getPhotos({ query })
    if (!response) throw new Error("No response")
    res.json(response)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
