import navBar from '@/component/navBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const addInSession = ()=>{
  localStorage.setItem("try", "herilala")
}

const clearInSession = ()=>{
  localStorage.clear()
}


export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      {navBar()}
      <Component {...pageProps} />
    </div>
  )
}
