import React, { HTMLProps } from "react"
import useSWR from "swr"
import Link from "components/Link"
import { fetcher } from "lib/util"
import { UnsplashTopic } from "types/unsplash"
import css from "./index.module.css"
import UnsplashPhoto from "components/UnsplashPhoto"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Submit from "components/inputs/Submit"
import TextInput from "components/inputs/TextInput"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { GetStaticPropsContext } from "next"
import { getTopics } from "pages/api/unsplash/topics"
import clsx from "clsx"
import Image from "next/image"

const schema = z.object({
  text: z.string().nonempty(),
})

type TextFormProps = Omit<HTMLProps<HTMLFormElement>, "onSubmit"> & {
  onSubmit: (text: string) => any
}

const TextForm = ({ onSubmit, ...props }: TextFormProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(schema),
  })

  async function submitHandler({ text }: { text: string }) {
    if (onSubmit) onSubmit(text)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} {...props}>
      <TextInput name="text" ref={register} autoComplete="off" />
      <Submit className="ml-2 bg-blue" />
    </form>
  )
}

type Data = { results: UnsplashTopic[]; total: number }
type Props = { data: Data }

export async function getStaticProps(context: GetStaticPropsContext) {
  const data = await getTopics()
  return {
    props: {
      data,
    },
  }
}

const Explore = ({ data }: Props) => {
  const router = useRouter()
  return (
    <div className={css.root}>
      <section>
        <h1>Search</h1>
        <TextForm
          onSubmit={(text) =>
            void router.push({
              pathname: "/explore/search",
              query: {
                q: text,
              },
            })
          }
        />
      </section>
      <section>
        <h1>Choose a collection</h1>
        <div className={css.topicsContainer}>
          {data.results.map((topic) => (
            <div key={topic.id}>
              <Link href={`/explore/topics/${topic.slug}`}>
                <a>
                  <div className={css.cover}>
                    <h2>{topic.title}</h2>
                    <div>
                      <Image
                        src={topic.cover_photo!.urls.small}
                        width={400}
                        height={
                          topic.cover_photo!.height *
                          (400 / topic.cover_photo!.width)
                        }
                        unoptimized
                        className="select-none"
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Explore
