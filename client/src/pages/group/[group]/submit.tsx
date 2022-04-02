import { useRouter } from "next/router";
import Axios from 'axios';
import Head from "next/head";
import useSWR from "swr";
import Sidebar from "../../../components/sidebar";
import { FormEvent, useState } from "react";

export default function submit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading...</div>
  }
  
  const {group: groupName} = router.query;
  const { data: group, error } = useSWR(groupName ? `/groups/${groupName}` : null);

  if(error) {
    router.push("/");
  }
  
  const submission = async (event: FormEvent) => {
    event.preventDefault();

    if(title.trim() === "") {
      return;
    }

    try {
      await Axios.post('/posts', {title: title.trim(), body, group: groupName})
    } catch (error) {
      
    }
  }
  
  return (
    <div className="container flex pt-5">
      <Head>
        <title>{groupName}</title>
      </Head>
      <div className="w-160">
        <div className="p-4 bg-white rounded">
          <h1 className="mb-3 text-lg">
            Submit Fruitful
          </h1>
          <form onSubmit={submission}>
            <div className="relative mb-2">
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" 
              placeholder="Title" maxLength={200} value={title} onChange={event => setTitle(event.target.value)}
              />
              <div className="absolute mb-2 text-sm text-red-300 select-none">{title.trim().length}/300</div>
            </div>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600" value={body} placeholder="Text (optional)" rows={4}>
              <button className="px-3 py-1 blue-500" type="submit" disabled={title.trim().length === 0}>Submit!</button>
            </textarea>
          </form>
        </div>
      </div>
      {group && <Sidebar group={group}/>}
    </div>
  
  );
}