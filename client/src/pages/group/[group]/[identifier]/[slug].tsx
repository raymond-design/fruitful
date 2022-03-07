import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Post } from '../../../../types'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'
import Axios from 'axios'

import Sidebar from '../../../../components/sidebar'

dayjs.extend(relativeTime)

export default function PostPage() {
  const router = useRouter()
  const {identifier, group, slug} = router.query
  const { data: post, error } = useSWR<Post>((identifier && slug ) ? `/posts/${identifier}/${slug}` : null)
  if(error) {
    router.push('/')
  }

  const vote =async (value: number) => {
    try {
      const res = await Axios.post("/other/vote", {
        identifier,
        slug,
        value
      })

      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Link href={`${group}`}>
        <a>
          <div className="flex items-center w-full h-20 p-8 bg-blue-500">
            <div className="container flex">
              {post && (
                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                  <Image
                    src={post.groupItem.imageUrl}
                    height={8 * 16 /4}
                    width={8 * 16 /4}
                  />
                </div>
              )}
              <p className="text-xl font-semibold text-white">
                {group}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="container flex pt-5">
        <div className="w-160">
          <div className="bg-white rounded">
            {post && (
              <div className="flex">
                <div className="w-10 text-center bg-gray-200 rounded-l">
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500" onClick={()=> vote(1)}>
                  <i className={classNames('icon-arrow-up', {'text-blue-500': post.userVote === 1})}>YES</i>
                </div>
              <p>{post.voteScore}</p>
              </div>
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500" onClick={()=> vote(-1)}>
                  <i className={classNames('icon-arrow-down', {'text-red-500': post.userVote === -1})}>NO</i>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
        {post && <Sidebar />}
      </div>
    </>
  )
}