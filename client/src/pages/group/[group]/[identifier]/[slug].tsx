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
import { useAuthState } from '../../../../global_context/auth'

import Sidebar from '../../../../components/sidebar'

import ActionButton from '../../../../components/ActionButton'

dayjs.extend(relativeTime)

export default function PostPage() {
  //State management (context)
  const { auth } = useAuthState()
  const router = useRouter()
  const {identifier, group, slug} = router.query
  const { data: post, error } = useSWR<Post>((identifier && slug ) ? `/posts/${identifier}/${slug}` : null)
  if(error) {
    router.push('/')
  }

  const vote =async (value: number) => {
    if(!auth) {
      router.push('/login')
    }

    if(value === post.userVote) {
      value = 0
    }
    
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
    <div>
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
          <div className="flex items-center">
                  <Link href={`/group/${group}`}>
                      <img src="http://www.gravatar.com/avatar" className="w-6 h-6 mr-1 rounded-full cursor-pointer" />             
                  </Link>
                  <p className="text-xs text-gray-500">
                    Posted by
                  <Link href={`/${post.username}`}>
                    <a className="mx-1 hover:underline">/{post.username}</a>
                  </Link>
                  <Link href={post.url}>
                  <a className="mx-1 hover:underline">
                    {dayjs(post.createdAt).fromNow()}
                  </a>
                  </Link>
                 </p>
                </div>
                {/*Post*/}
                <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                <p className='my-3 text-sm'>{post.body}</p>
                {/*Action Buttons*/}
                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <ActionButton>
                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                        <span className='font-bold'>{post.commentCount} Comments</span>
                      </ActionButton>
                    </a>
                  </Link>
                  <ActionButton>
                    <i className="mr-1 fas fa-bookmark fa-xs"></i>
                    <span className='font-bold'>Save</span>
                  </ActionButton>
                  <ActionButton>
                    <i className="mr-1 fas fa-share fa-xs"></i>
                    <span className='font-bold'>Share</span>
                  </ActionButton>
                </div>     
          </div>
        </div>
        {post && <Sidebar />}
      </div>
    </div>
  )
}