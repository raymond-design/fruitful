import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import Axios, {AxiosError} from 'axios';
import { useRouter } from 'next/router';

import { useAuthDispatch, useAuthState } from '../global_context/auth';

import InputGroup from '../components/inputGroup';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { auth } = useAuthState();
  
  const router = useRouter();
  
  //re-route to home page if already logged in:
  if(auth) {
    router.push('/');
  }
  
  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post('/auth/login', {
        username,
        password,
      });

      dispatch('LOGIN', res.data);
      
      router.back();

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
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Login - Fruitful</title>
      </Head>

      {/*<div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: `url('/images/fruit.png')`,
        }}
      ></div>*/}
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image
                src="/images/fruitfullogo.png"
                alt="Fruitful"
                width={100}
                height={100}
              />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Fruitful!</h1>
          <h1 className="mt-4 text-lg font-medium text-center">Login to your account</h1>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mt-4 mb-3"
              type="text"
              value={username}
              setValue={setUsername}
              placeholder="Fruit-sername"
              error={errors.username}
            />
            <InputGroup
              className="mb-3"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-300 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Let's Go!
            </button>
          </form>
          <small>
            No Account?
            <Link href="/register">
              <a className="ml-1 text-center text-blue-500 hover:text-purple-400">Sign Up Here!</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
