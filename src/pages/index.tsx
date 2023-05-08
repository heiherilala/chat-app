import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router:NextRouter = useRouter()
  const [email, setEmail] = useState<string|null>(null)
  useEffect(()=>{    
    const ActualEmail:string|null = sessionStorage.getItem("email")
    setEmail(ActualEmail)
    if (!ActualEmail) {
      router.push("/loging")
      }
  },[email,typeof window !== 'undefined'&&sessionStorage.getItem("email")])
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to HEI-Chat </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">This site allows you to chat with other HEI students</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                  </svg>
                </div>
                {email?email:'...'}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">An example of a message written by you.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

  )
}
