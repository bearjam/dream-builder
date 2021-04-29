import { NextApiRequest, NextApiResponse } from "next"
import { serializeError } from "serialize-error"
import { api } from "lib/unsplash"
const topics = [
  {
    title: "Nature",
    slug: "nature",
    id: "6sMVjTLSkeQ",
  },
  {
    title: "People",
    slug: "people",
    id: "towJZFskpGg",
  },
  {
    title: "Architecture",
    slug: "architecture",
    id: "rnSKDHwwYUk",
  },
  {
    title: "Business & Work",
    slug: "business-work",
    id: "aeu6rL-j6ew",
  },
  {
    title: "Experimental",
    slug: "experimental",
    id: "qPYsDzvJOYc",
  },
  {
    title: "Film",
    slug: "film",
    id: "hmenvQhUmxM",
  },
  {
    title: "Health & Wellness",
    slug: "health",
    id: "_hb-dl4Q-4U",
  },
  {
    title: "Interiors",
    slug: "interiors",
    id: "R_Fyn-Gwtlw",
  },
  {
    title: "Street Photography",
    slug: "street-photography",
    id: "xHxYTMHLgOc",
  },
  {
    title: "Technology",
    slug: "technology",
    id: "J9yrPaHXRQY",
  },
  {
    title: "Travel",
    slug: "travel",
    id: "Fzo3zuOHN6w",
  },
  {
    title: "Textures & Patterns",
    slug: "textures-patterns",
    id: "iUIsnVtjB0Y",
  },
  {
    title: "Animals",
    slug: "animals",
    id: "Jpg6Kidl-Hk",
  },
  {
    title: "Food & Drink",
    slug: "food-drink",
    id: "xjPR4hlkBGA",
  },
  {
    title: "Athletics",
    slug: "athletics",
    id: "Bn-DjrcBrwo",
  },
  {
    title: "Spirituality",
    slug: "spirituality",
    id: "_8zFHuhRhyo",
  },
  {
    title: "Arts & Culture",
    slug: "arts-culture",
    id: "bDo48cUhwnY",
  },
  {
    title: "History",
    slug: "history",
    id: "dijpbw99kQQ",
  },
]

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { response } = await api.topics.list({
      topicIdsOrSlugs: topics.map((t) => t.id),
    })
    if (!response) throw new Error("No response")
    res.json(response)
  } catch (e) {
    res.status(400).json({ error: serializeError(e) })
  }
}
