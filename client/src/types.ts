export interface Post {
  identifier: string
  title: string
  body?: string
  slug: string
  group: string
  createdAt: string
  updatedAt: string
  username: string
  //virtual
  url: string
  //optional
  voteScore?: number
  commentCount?: number
  userVote?: number
}

export interface User {
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Group {
  createdAt: string
  updatedAt: string
  name: string
  title: string
  description: string
  imageUrn: string
  bannerUrn: string
  username: string
  posts: Post[]
  imageUrl: string
  bannerUrl: string
  count?: number
}