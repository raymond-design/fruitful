export default function Sidebar({group}) {
  return (
    <div className="ml-6 w-80">
      <div className="p-3 bg-blue-500 rounded">
        <h1 className="font-semibold text-white">Welcome to the {group}s!</h1>
        <h2 className="mt-4 text-white">Group start date: 3/7/2022</h2>
        <h2 className="mt-1 text-white">Founder: Raymond</h2>
        <h2 className="mt-1 text-white">Leaderboard Position: 13</h2>
      </div>
    </div>
  )
}