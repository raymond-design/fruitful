import Head from 'next/head'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Axios, {AxiosError} from 'axios';
import { useRouter } from 'next/router';

import InputGroup from '../components/inputGroup';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  
  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post('/auth/login', {
        username,
        password,
      });

      router.push('/');

    } catch (error) {
      //Refer to axios docs on handling errors
      //This just checks if the server returns a response at all
      //The rest of the conditions will just be logged
      if (error.response) {
        setErrors(error.response.data);
      }
      else{
        console.log(error);
      }
    }
  }
  
  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: `url('/images/fruit.png')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              type="text"
              value={username}
              setValue={setUsername}
              placeholder="USERNAME"
              error={errors.username}
            />
            <InputGroup
              className="mb-4"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="PASSWORD"
              error={errors.password}
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Login
            </button>
          </form>
          <small>
            Sign Up Here
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign Up!</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
