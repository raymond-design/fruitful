import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, createRef, Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import PostCard from '../../components/PostCard'
import Image from 'next/image'
import classNames from 'classnames'

import { Group } from '../../types'
import { useAuthState } from '../../global_context/auth'
import Axios from 'axios'
import Sidebar from '../../components/sidebar'

export default function GroupPage() {
  // Local state
  const [ownGroup, setOwnGroup] = useState(false)
  // Global state
  const { auth , user } = useAuthState()
  // Utils
  const router = useRouter()
  const fileInputRef = createRef<HTMLInputElement>()

  const groupName = router.query.group

  const { data: group, error } = useSWR<Group>(
    groupName ? `/groups/${groupName}` : null
  )

  useEffect(() => {
    if (!group) return
    setOwnGroup(auth  && user.username === group.username)
  }, [group])

  const openFileInput = (type: string) => {
    if (!ownGroup) return
    fileInputRef.current.name = type
    fileInputRef.current.click()
  }

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', fileInputRef.current.name)

    try {
      await Axios.post<Group>(`/groups/${group.name}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      //revalidate()
    } catch (err) {
      console.log(err)
    }
  }

  if (error) router.push('/')

  let postsMarkup
  if (!group) {
    postsMarkup = <p className="text-lg text-center">Loading..</p>
  } else if (group.posts.length === 0) {
    postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>
  } else {
    postsMarkup = group.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ))
  }

  return (
    <div>
      <Head>
        <title>{group?.title}</title>
      </Head>

      {group && (
        <Fragment>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          <div>
            {/* Banner image */}
            <div
              className={classNames('bg-blue-500', {
                'cursor-pointer': ownGroup,
              })}
              onClick={() => openFileInput('banner')}
            >
              {group.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundImage: `url(${group.bannerUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-blue-500"></div>
              )}
            </div>
            {/* Group meta data */}
            <div className="h-20 bg-white">
              <div className="container relative flex">
                <div className="absolute" style={{ top: -15 }}>
                  <Image
                    src={group.imageUrl}
                    alt="Group"
                    className={classNames('rounded-full', {
                      'cursor-pointer': ownGroup,
                    })}
                    onClick={() => openFileInput('image')}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{group.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    {group.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Posts & Sidebar */}
          <div className="container flex pt-5">
            <div className="w-160">{postsMarkup}</div>
            <Sidebar group={group} />
          </div>
        </Fragment>
      )}
    </div>
  )
}