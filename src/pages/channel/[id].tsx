import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  GetChannelsByIdApi,
  GetUserApi,
  getMessagesByChannel,
  sendMessage,
} from '@/api';
import { MessageType, SedMessageType } from '@/type';
import { MessegeItem } from '@/features/chat-message';
import MessageList from '@/features/chat-message/component/message-list';
import useStore from '@/zustand/useChannel';
import Send from '@/features/chat-message/component/send';
import SideBarLayout from '@/layouts/side-bar-layout';
import AutorizedLayout from '@/layouts/autorized-layout';

export default function Channel() {

  const [idUserActual, setIdUserActual] = useState(0);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messagesItem, setMessagesItem] = useState<MessegeItem[]>([]);
  const [ChannelName, setChannelName] = useState('Channel name');
  const router: NextRouter = useRouter();
  const idChannel = Number(router.query.id) 

  useEffect(() => {
    localStorage.getItem('token')
      ? GetUserApi().then((res) => {
          setIdUserActual(res.user.id);
        })
      : router.push('/login');
  }, []);
  useEffect(() => {
    if (idChannel!=null) {
      getMessagesByChannel('' + idChannel).then((res) =>
        res.messages&&setMessages(res.messages)
      );
      GetChannelsByIdApi(idChannel).then((res) =>
        res.channel&&setChannelName(res.channel.name)
      );
    }
  }, [idChannel]);
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
    if (idChannel) {
      sendMessage({ ...messageToSend, channelId: idChannel }).then(() =>
        getMessagesByChannel('' + idChannel).then((res) =>
          setMessages(res.messages)
        )
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
                {'You are in Channel : ' + ChannelName}
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
