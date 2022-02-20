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
  username: String
  email: String
  createdAt: String
  updatedAt: String
}