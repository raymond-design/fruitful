import Link from 'next/link'
import Logo from '../images/logo.svg'
import { Fragment } from 'react'
import Axios from 'axios';
import { useAuthDispatch, useAuthState } from '../global_context/auth';

const nav: React.FC = () => {
  const { auth, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  
  const logout = () => {
    Axios.get('/auth/logout')
      .then(() => {
        dispatch('LOGOUT')
        window.location.reload()
      })
      .catch(err => console.log(err))
  }
  return <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-blue-200">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Logo className="w-8 h-8 mr-2" />
            </a>
          </Link>
          <span className="font-semibold test-2xl">
            <Link href="/">Fruitful!</Link>
          </span>
        </div>

        <div className="flex items-center mx-auto transition duration-500 bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search l-4"></i>
          <input type="test" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none" placeholder="Find Fruitfuls"></input>
        </div>

        <div className="flex">
          {!loading &&
          (auth ? (
            //Logged In
            <button className="flex items-center justify-center w-32 px-6 py-1 mr-5 text-sm font-medium text-blue-500 border border-blue-300 rounded-md shadow-sm w-30 hollow bg-blue-50 hover:bg-blue-300 hover:text-whit hover:bg-transparent" onClick={logout}>
              Log Out
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <a className="flex items-center justify-center px-6 py-1 mr-5 text-sm font-medium text-blue-500 border border-blue-300 rounded-md shadow-sm w-30 hollow bg-blue-50 hover:bg-blue-300 hover:text-white">
                  Log In
                </a>
              </Link>
              <Link href="/register">
                <a className="flex items-center justify-center px-6 py-1 text-sm font-medium text-blue-500 border border-blue-300 rounded-md shadow-sm bg-blue-50 hover:bg-blue-300 hover:text-white">
                Sign Up
                </a>
            </Link>
          </Fragment>
          ))}
        </div>
      </div>
}

export default nav;