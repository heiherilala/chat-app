
import { Inter } from 'next/font/google';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  GetUserApi,
  GetUsersApi,
  getMessagesByUser,
  sendMessage,
} from '@/api';
import { MessageType, SedMessageType } from '@/type';
import { MessegeItem } from '@/features/chat-message';
import MessageList from '@/features/chat-message/component/message-list';
import Send from '@/features/chat-message/component/send';
import SideBarLayout from '@/layouts/side-bar-layout';
import AutorizedLayout from '@/layouts/autorized-layout';

const inter = Inter({ subsets: ['latin'] });

export default function Message() {
  const [idUserActual, setIdUserActual] = useState(0);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messagesItem, setMessagesItem] = useState<MessegeItem[]>([]);
  const [UserName, setUserName] = useState('friend');
  const router: NextRouter = useRouter();
  const idUser = Number(router.query.id) 


  useEffect(() => {
    localStorage.getItem('token')
      ? GetUserApi().then((res) => {
          setIdUserActual(res.user.id);
        })
      : router.push('/login');
  }, []);
  useEffect(() => {
    if (idUser!=null) {
      getMessagesByUser(idUser).then((res) => setMessages(res.messages));
      GetUsersApi().then((res) => {
        let userList: any[] = res.users;
        userList = userList.filter((item: any) => item.id == idUser);
        setUserName(userList[0]?.name || '......');
      });
    }
  }, [ idUser]);
  useEffect(() => {
    let newMessagesItem: MessegeItem[] = [];
    messages &&
      messages.forEach((item) => newMessagesItem.push(convertMessage(item)));
    setMessagesItem(newMessagesItem);
  }, [messages]);

  const convertMessage = (message: MessageType) => {
    return {
      id: message.id,
      userId: message.sender.id,
      message: message.content,
      name: message.sender.name,
    };
  };

  const sendMessageActual = (messages: string) => {
    const messageToSend: SedMessageType = {
      channelId: null,
      content: messages,
      recipientId: null,
    };
    if (idUser) {
      sendMessage({ ...messageToSend, recipientId: idUser }).then(() =>
        getMessagesByUser(idUser).then((res) => setMessages(res.messages))
      );
    }
  };

  return (
    <SideBarLayout>
    <AutorizedLayout>
      <div className="bg-white absolute inset-0 w-full h-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full h-full flex flex-col justify-between">
            <div>
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {'Whith the friend : ' + UserName}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  This site allows you to chat with other HEI students
                </p>
              </div>
              {MessageList(messagesItem, idUserActual)}
            </div>
            {Send((item) => {
              sendMessageActual(item);
            })}
          </div>
        </div>
    </AutorizedLayout>
  </SideBarLayout>

  );
}
