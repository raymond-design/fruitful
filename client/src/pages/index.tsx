import Head from 'next/head'
import Link from 'next/link'

import { Fragment, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import { Post } from '../types'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    Axios.get('/posts')
    .then(res => setPosts(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="pt-12">
      <Head>
        <title>Fruitful!</title>
      </Head>
      <div className="container flex pt-4">
        <h1>
          Your Feed
        </h1>
        {/*Posts*/}
        
        <div className="w-160">
          {posts.map((post) => (
            <div key={post.identifier} className="flex mb-4 bg-white rounded">
              {/*votes*/}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <p>YO</p>
              </div>
              {/*info/data about post*/}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/group/${post.group}`}>
                    <Fragment>
                      <img src="http://www.gravatar.com/avatar" className="w-6 h-6 mr-1 rounded-full cursor-pointer" />
                      <a className="text-cs font-bold hover:underline">
                      /group/{post.group}
                      </a>
                    </Fragment>
                  </Link>
                  <p className="text-xs text-gray-600">
                    <span className="mx-1">-</span>
                    Posted by
                    <Link href={`/u/user`}>
                      <a className="mx-1 hover:underline">
                        /u/user
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}