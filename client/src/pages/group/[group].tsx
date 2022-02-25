import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";

export default function Group() {
  const router = useRouter();

  const groupName = router.query.group;

  const { data: group } = useSWR(groupName ? `groups/${groupName}` : null)

  return (
    <div className="container pt-5 flec">
      {group && (
        <div className="w-160">
          {group.posts.map(post => <PostCard key={post.identifier} post={post} />)}
        </div>
      )}
    </div>
  )
}