import { createApi } from "unsplash-js"

export const api = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY! })
