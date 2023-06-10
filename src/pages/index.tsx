import { Inter } from 'next/font/google';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MessegeItem } from '@/features/chat-message';
import MessageList from '@/features/chat-message/component/message-list';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [idUserActual, setIdUserActual] = useState(0);
  const [messagesItem] = useState<MessegeItem[]>([]);
  const router: NextRouter = useRouter();
  const tokenVerification = () => {
    const ActualEmail: string | null = localStorage.getItem('token');
    if (!ActualEmail) {
      router.push('/login');
    }
    //setTimeout(() => setInterval(() => setUpdate(update + 1), 10000), 5000);
  };

  useEffect(() => {
    tokenVerification();
    router.push('/profile');
  }, []);

  return (
      <div className="bg-white absolute inset-0 w-full h-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full h-full flex flex-col justify-between">
          <div>
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Welcome to HEI-Chat{' '}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                This site allows you to chat with other HEI students
              </p>
            </div>
            {MessageList(messagesItem, idUserActual)}
          </div>
        </div>
      </div>
  );
}
