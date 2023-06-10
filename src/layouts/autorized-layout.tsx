import { NextRouter, useRouter } from 'next/router';
import React, { Children, ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function AutorizedLayout({ children }: LayoutProps) {
  const router: NextRouter = useRouter();
  const [isAutantified,setIsAutentified] = useState(false)
  const tokenVerification = () => {
    const ActualEmail: string | null = localStorage.getItem('email');
    if (!ActualEmail) {
      router.push('/login');
    }else{
      setIsAutentified(true)
    }
  };
  useEffect(()=>{tokenVerification()},[isAutantified])
  return (
  <div>{isAutantified?children:""}</div>
  );
}
