import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Logo from '../images/logo.svg'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fruitful!</title>
      </Head>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
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
          <input type="test" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none">

          </input>
        </div>
      </div>
    </div>
  )
}