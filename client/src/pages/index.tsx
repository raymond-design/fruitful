import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Axios from 'axios';

import styles from '../styles/Home.module.css'
import { Post } from '../types'

import { Post as PostCard } from '../components/Post'
import { GetServerSideProps } from 'next'

dayjs.extend(relativeTime);

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
        </h1>
        {/*Feed*/}
        
        <div className="w-160">
          {/**Looping thru Post Components here: */}
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await Axios.get('/posts');

    return { props: { posts: res.data } };
  } catch (error) {
    return { props: { error: 'Something went wrong!'} };
  }
} */