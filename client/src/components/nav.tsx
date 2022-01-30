import Link from 'next/link'
import Logo from '../images/logo.svg'

const nav: React.FC = () => (
  <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Logo className="w-8 h-8 mr-2" />
            </a>
          </Link>
          <span className="font-semibold test-2xl">
            <Link href="/">Fruitful</Link>
          </span>
        </div>

        <div className="flex items-center mx-auto transition duration-500 bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search l-4"></i>
          <input type="test" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none" placeholder="Search"></input>
        </div>

        <div className="flex">
          <Link href="/login">
            <a className="w-32 py-1 mr-5 hollow blue button ">
              Log In
            </a>
          </Link>
          <Link href="/register">
            <a className="w-32 py-1 blue button ">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
)

export default nav;