import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg font-semibold">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="px-4 py-2 blue button">Home Page!</a>
      </Link>
    </div>
  );
}