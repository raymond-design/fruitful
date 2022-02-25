import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";

export default function Group() {
  const router = useRouter();

  const groupName = router.query.group;

  const { data: group, error } = useSWR(groupName ? `groups/${groupName}` : null)

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
    <div className="container pt-5 flec">
      {group && (
        <div className="w-160">
          {postsMarkup}
        </div>
      )}
    </div>
  )
}