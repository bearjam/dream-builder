import fs from "fs"
import fetch from "node-fetch"
import { stringifyUrl } from "query-string"
import * as z from "zod"

const { GOOGLE_FONTS_API_KEY: apiKey, FONTS_PATH } = z
  .object({
    GOOGLE_FONTS_API_KEY: z.string().nonempty(),
    FONTS_PATH: z.string().nonempty(),
  })
  .nonstrict()
  .parse(process.env)

const LIST_BASE_URL = "https://www.googleapis.com/webfonts/v1/webfonts"

export default async function () {
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
  fs.writeFileSync(FONTS_PATH, JSON.stringify(items, null, 2))
}
