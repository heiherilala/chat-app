import NavBarLayout from '@/layouts/nav-bar-layout';
import SideBarLayout from '@/layouts/side-bar-layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isConected, setIsConecded] = useState(false)
  useEffect(()=>{
    const ActualEmail: string | null = localStorage.getItem('email');
    typeof ActualEmail == "string"?setIsConecded(true):null
  },[isConected])
  
  return (
    <NavBarLayout>
        <Component {...pageProps} />
    </NavBarLayout>
  );
}
