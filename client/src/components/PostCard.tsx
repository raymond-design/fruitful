import {Fragment} from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'

import ActionButton from './ActionButton'

import {Post} from '../types'
import Axios from 'axios'
import { doesNotReject } from 'assert'
interface PostCardProps {
  post: Post
}

dayjs.extend(relativeTime)

export default function PostCard({post: {
  identifier,
  slug,
  title, 
  body, 
  group, 
  createdAt, 
  voteScore, 
  userVote, 
  commentCount, 
  url, 
  username
}}: PostCardProps) {

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
    <div key={identifier} className="flex mb-4 bg-blue-400 border border-blue-500 rounded">
              {/*votes*/}
              <div className="w-10 text-center bg-blue-400 rounded-l">
                <div className="w-6 mx-auto text-white rounded cursor-pointer hover:text-blue-500" onClick={()=> vote(1)}>
                  <i className={classNames('icon-arrow-up', {'text-blue-500': userVote === 1})}>YES</i>
                </div>
              <p className="flex text-center text-white font-small">Score: {voteScore}</p>
              </div>
              <div className="w-10 text-center bg-blue-400 rounded-l">
                <div className="w-6 mx-auto text-white rounded cursor-pointer hover:text-red-500" onClick={()=> vote(-1)}>
                  <i className={classNames('icon-arrow-down', {'text-red-500': userVote === -1})}>NO</i>
                </div>
              </div>
              {/*info/data about post*/}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/group/${group}`}>
                      <img src="http://www.gravatar.com/avatar" className="w-6 h-6 mr-1 rounded-full cursor-pointer" />             
                  </Link>
                  <p className="text-xs text-blue-100">
                    Posted by -
                  <Link href={`/${username}`}>
                    <a className="mx-1 hover:underline">{username}</a>
                  </Link>
                  <Link href={url}>
                  <a className="mx-1 hover:underline">
                    {dayjs(createdAt).fromNow()}
                  </a>
                  </Link>
                 </p>
                </div>
                <Link href={url}><a className="my-1 text-lg font-medium text-blue-100">{title}</a></Link>
                {body && <p className="my-1 text-sm text-blue-100">{body}</p>}
                <div className="flex">
                  <Link href={url}>
                    <a>
                      <ActionButton>
                        <i className="mr-1 text-blue-100 hover:text-blue-500 fas fa-comment-alt fa-xs"></i>
                        <span className='font-bold text-blue-100 hover:text-blue-500'>{commentCount} Comments</span>
                      </ActionButton>
                    </a>
                  </Link>
                  <ActionButton>
                    <i className="mr-1 text-blue-100 fas hover:text-blue-500 fa-bookmark fa-xs"></i>
                    <span className='font-bold text-blue-100 hover:text-blue-500'>Save</span>
                  </ActionButton>
                  <ActionButton>
                    <i className="mr-1 text-blue-100 hover:text-blue-500 fas fa-share fa-xs"></i>
                    <span className='font-bold text-blue-100 hover:text-blue-500'>Share</span>
                  </ActionButton>
                </div>
              </div>
            </div>
  )
}