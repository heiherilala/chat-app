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
    <>
    <button onClick={addInSession}> {'session'}</button>
    <button onClick={clearInSession}> {'clear'}</button>
    
    <Component {...pageProps} />
    </>
  )
}
