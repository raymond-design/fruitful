import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import Axios, {AxiosError} from 'axios';
import { useRouter } from 'next/router';

import { useAuthState } from '../global_context/auth';

import InputGroup from '../components/inputGroup';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { auth } = useAuthState();

  const router = useRouter();
  
  //re-route to home page if already logged in:
  if(auth) {
    router.push('/');
  }
  
  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: 'You must agree to T&Cs' })
      return
    }

    try {
      await Axios.post('/auth/register', {
        email,
        password,
        username,
      });

      router.push('/login');

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
    <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md space-y-8 w-70 outline-style:solid">
      <Head>
        <title>Register - Fruitful</title>
      </Head>

      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
            <div>
              <Image
                src="/images/fruitfullogotwo.png"
                alt="Fruitful"
                width={180}
                height={100}
              />
            </div>
          </div>
        <div className="w-70">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Fruitful!</h1>
          <h1 className="mt-4 text-lg font-medium text-center">Register for an account</h1>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mt-4 mb-3"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              error={errors.email}
            />
            <InputGroup
              className="mb-3"
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
            <p className="text-xs text-center">
              By continuing, you agree to our User Agreement and Privacy Policy
            </p>
            <div className="mb-4">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to this
                <Link href="/privacy">
                  <a className="mb-10 ml-1 text-xs text-center text-blue-500 cursor-pointer hover:text-purple-400">
                    Privacy Policy
                  </a>
                </Link>
              </label>
              <small className="block font-medium text-red-600">
                {errors.agreement}
              </small>
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Sign Up
            </button>
          </form>
          <small>
            Have an account?
            <Link href="/login">
              <a className="ml-1 text-blue-500">Log In</a>
            </Link>
          </small>
        </div>
      </div>
      </div>
    </div>
  );
}
