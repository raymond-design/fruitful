import '../styles/tailwind.css'
import { AppProps } from 'next/app'
import Axios from 'axios'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'

import { AuthProvide } from '../global_context/auth'

import Nav from '../components/nav'

Axios.defaults.baseURL = process.env.NEXT_BASE_URL + '/api';
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}
function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter(); 
  const authRoutes = ['/register', '/login', '/privacy'];

  const authRoute = authRoutes.includes(pathname);

  return (
    <SWRConfig
      value={{
        fetcher, dedupingInterval: 10000
      }}
    >
      <AuthProvide>
        {!authRoute && <Nav />}
        <div className={authRoute ? '' : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvide>
    </SWRConfig>
  )
}

export default App
