import { createRef, Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Head } from "next/document";
import Image from 'next/image';

import classNames from "classnames";
import useSWR from "swr";
import Axios from "axios";

import Sidebar from "../../components/sidebar";
import PostCard from "../../components/PostCard";

import { Group } from '../../types';
import { useAuthState } from "../../global_context/auth";

export default function GroupPage() {
  const [owner, setOwner] = useState(false);

  //Global Auth State
  const { auth, user } = useAuthState();
  
  const router = useRouter();
  const fileInputRef = createRef<HTMLInputElement>();
  
  const groupName = router.query.group;

  const { data: group, error, } = useSWR<Group>(groupName ? `/groups/${groupName}` : null)

  useEffect(() => {
    if(!group) {
      return setOwner( auth && user.username === group.username );
    }
  }, [group])
  
  const openFileInput = (type: string) => {
    if(!owner) 
      return fileInputRef.current.name = type;
      fileInputRef.current.click();
  }

  const uploadImage = async (event: any) => {
    const file = event.target.files[0];

    if(!file) return;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);

    try {
      const res = await Axios.post<Group>('/groups/${group.name}/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      //revalidate();
      
    } catch (error) {
      console.log(error);
    }
  }

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
            <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
            
            <div>
              <div 
                className={classNames("bg-blue-500", { 'cursor-pointer': owner })}
                onClick={() => openFileInput('banner')}
              >
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
              <div className="h-20 bg-white">
                <div className="container flex">
                  <div className="absolute" style={{ top: -15 }}>
                    {/*<Image 
                      src={group.imageUrl}
                      alt="Group"
                      onClick={() => openFileInput('image')}
                      width={100}
                      height={100}
                      className={classNames("bg-blue-500", { 'cursor-pointer': owner })}
                    />*/}
                  </div>
                  <div className="pt-2 pl-24">
                    <div className="flex items-center">
                      <h1 className="mb-1 text-2xl font-bold">
                        {group.title}
                      </h1> 
                    </div>
                    <p className="text-sm font-bold text-gray-500">
                      {group.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container flex pt-5">
              <div className="w-160">
                {postsMarkup}
              </div>
              <Sidebar/>
            </div>
          </Fragment>
        )}
    </div>
  )
}