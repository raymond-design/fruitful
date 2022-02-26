import { useRouter } from "next/router";
import { Head } from "next/document";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import { Fragment } from "react";

import { Group } from '../../types';

export default function Group() {
  const router = useRouter();

  const groupName = router.query.group;

  const { data: group, error } = useSWR<Group>(groupName ? `groups/${groupName}` : null)

  if (error) {
    router.push('/');
  }
  let postsMarkup
  if(!group) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>
  } 
  else if(group.posts.length == 0) {
    postsMarkup = <p className="text-lg text-center">No posts yet!</p>
  }
  else {
    postsMarkup = group.posts.map(post => <PostCard key={post.identifier} post={post} />)
  }
  return (
    <div>
      <Head>
        <title>{group?.name}</title>
      </Head>
        {group && (
          <Fragment>
            <div>
              <div className="bg-blue-500">
                {group.bannerUrl ? (
                  <div className="h-56 bg-blur-500" style={{
                    backgroundImage: `url(${group.bannerUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}></div>
                ) : (
                  <div className="h-20 bg-blue-500"></div>
                )}
                  
              </div>
            </div>
            <div className="container flex pt-5">
              <div className="w-160">
                {postsMarkup}
              </div>
            </div>
          </Fragment>
        )}
    </div>
  )
}