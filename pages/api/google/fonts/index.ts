import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import * as z from "zod"
import fetch from "node-fetch"
import { stringifyUrl } from "query-string"

const { GOOGLE_FONTS_API_KEY: apiKey } = z
  .object({ GOOGLE_FONTS_API_KEY: z.string().nonempty() })
  .nonstrict()
  .parse(process.env)

const LIST_BASE_URL = "https://www.googleapis.com/webfonts/v1/webfonts"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = stringifyUrl({
      url: LIST_BASE_URL,
      query: {
        sort: "popularity",
        key: apiKey,
      },
    })
    const { items } = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((x) => x.json())
    res.json(items)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
