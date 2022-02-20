import '../styles/tailwind.css'
import { AppProps } from 'next/app'
import Axios from 'axios'
import { useRouter } from 'next/router'

import { AuthProvide } from '../global_context/auth'

import Nav from '../components/nav'

Axios.defaults.baseURL = 'http://localhost:5000/api';
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter(); 
  const authRoutes = ['/register', '/login'];

  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvide>
      {!authRoute && <Nav />}
      <Component {...pageProps} />
    </AuthProvide>
  )
}

export default App
