import {Fragment} from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'

import {Post} from '../types'
import Axios from 'axios'
interface PostCardProps {
  post: Post
}

dayjs.extend(relativeTime)

const ActionButton = ({ children }) => {
  return <div className="px-1 mr-2 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
      {children}
    </div>

}
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

  const vote =async (value) => {
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
    <div key={identifier} className="flex mb-4 bg-white rounded">
              {/*votes*/}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500" onClick={()=> vote(1)}>
                  <i className={classNames('icon-arrow-up', {'text-blue-500': userVote === 1})}>YES</i>
                </div>
              <p>{voteScore}</p>
              </div>
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500" onClick={()=> vote(-1)}>
                  <i className={classNames('icon-arrow-down', {'text-red-500': userVote === -1})}>NO</i>
                </div>
              </div>
              {/*info/data about post*/}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/group/${group}`}>
                    <Fragment>
                      <img src="http://www.gravatar.com/avatar" className="w-6 h-6 mr-1 rounded-full cursor-pointer" />
                      <a className="font-bold text-cs hover:underline">
                        Group: {group}
                      </a>
                    </Fragment>
                  </Link>
                  <p className="text-xs text-gray-500">
            Posted by
            <Link href={`/${username}`}>
              <a className="mx-1 hover:underline">/{username}</a>
            </Link>
            <Link href={url}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
                </div>
                <Link href={url}><a className="my-1 text-lg font-medium">{title}</a></Link>
                {body && <p className="my-1 text-sm">{body}</p>}
                <div className="flex">
                  <Link href={url}>
                    <a>
                      <ActionButton>
                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                        <span className='font-bold'>{commentCount} Comments</span>
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
  )
}