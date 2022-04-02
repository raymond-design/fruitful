import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useSWR from 'swr';


import { Group } from '../types'

import PostCard from '../components/PostCard'
//import { GetServerSideProps } from 'next'

dayjs.extend(relativeTime);
 
export default function Home() {
  const {data: posts} = useSWR('/posts')
  const {data: topGroups} = useSWR('/other/top-groups')
  
  return (
    <Fragment>
      <Head>
        <title>Fruitful!</title>
      </Head>
      <div className="container flex pt-4">
        <h1>
          Recent Posts
        </h1>
        {/*Feed*/}
        
        <div className="w-160">
          {/**Looping thru Post Components here: */}
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        <div className="nl-6 w-80">
          <div className="rounded bg-blue50">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center text-blue-100 transition duration-300 bg-blue-400 rounded cursor-pointer hover:text-white hover:bg-blue-400">
                Leaderboard - {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              {(topGroups? 
                topGroups?.map((group: Group) => (
                <div key={group.name} className="flex items-center py-2 border border-b">
                  <div className="mr-2 overflow-hidden rounded-full cursor-pointer">
                  <Link href={`Team: {group.name}`}>
                    <Image
                      src={group.imageUrl}
                      alt={group.name}
                      width={100}
                      height={100}
                    />
                  </Link>

                  </div>
                  <Link href={`Team: {group.name}`}>
                      <a className="font-bold hover:cursor-pointer">
                        {group.name}
                      </a>
                  </Link>
                    <p className="ml-auto font-med">{group.count}</p>
                </div>
              )) : <p className="text-center text-blue-500 hover:text-gray-800 ">Error Loading!</p> )}
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