import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Axios from 'axios';
import useSWR from 'swr';


import styles from '../styles/Home.module.css'
import { Post } from '../types'
import { Group } from '../types'

import PostCard from '../components/PostCard'
import { GetServerSideProps } from 'next'

dayjs.extend(relativeTime);
 
export default function Home() {
  const {data: posts} = useSWR('/posts')
  const {data: topGroups} = useSWR('/groups/top')
  
  return (
    <Fragment>
      <Head>
        <title>Fruitful!</title>
      </Head>
      <div className="container flex pt-4">
        <h1>
        </h1>
        {/*Feed*/}
        
        <div className="w-160">
          {/**Looping thru Post Components here: */}
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        <div className="nl-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Other Groups
              </p>
            </div>
            <div>
              {topGroups?.map((group: Group) => (
                <div key={group.name} className="flex items-center py-2 border border-b">
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
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