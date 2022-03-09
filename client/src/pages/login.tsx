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
    <div className="flex items-center justify-center px-4 py-12 bg-white sm:px-6 lg:px-8">
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
                src="/images/apple.png"
                alt="Fruitful"
                width={48}
                height={55}
              />
              <Image
                src="/images/apple.png"
                alt="Fruitful"
                width={35}
                height={42}
              />
              <Image
                src="/images/apple.png"
                alt="Fruitful"
                width={30}
                height={35}
              />
            </div>
          </div>
          <h1 className="mt-2 mb-3 text-3xl font-extrabold text-center text-gray-900">Login In to Fruitful</h1>
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
              className="mb-4"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-green-500 border border-green-600 rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Let's Go!
            </button>
          </form>
          <small>
            No Account?
            <Link href="/register">
              <a className="ml-1 text-center text-green-600 hover:text-green-400">Sign Up Here!</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
