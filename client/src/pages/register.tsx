import Head from 'next/head'
import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/fruit.png')"}}></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">Please read our Privacy Policy here.</p>

          <form>
            <div className="mb-6">
              <input type="checkbox" className="mr-1 cursor-pointer" id="agreement" />
              <label htmlFor='agreement' className="text-xs cursor-pointer">
                Send me emails about fruitful updates!
              </label>
            </div>
            <div className="mb-2">
            <input 
              type="email"
              className="w-full px-3 bg-gray-100 border border-gray-200 rounded py2" 
              placeholder='Email'>
            </input>
          </div>
          <div className="mb-2">
            <input 
              type="text"
              className="w-full px-3 bg-gray-100 border border-gray-200 rounded py2" 
              placeholder='Username'>
            </input>
          </div>
          <div className="mb-2">
            <input 
              type="password"
              className="w-full px-3 bg-gray-100 border border-gray-200 rounded py2" 
              placeholder='Password'>
            </input>
          </div>
          <button className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-300 border border-blue-400 rounded'>
            Sign Up
          </button>
          </form>
          <small>
            For Existing Users:
            <Link href="/login">
              <a className="ml-1 text-blue-400 uppercase">
                Log In
              </a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
