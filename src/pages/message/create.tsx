import { CreateChannelApi} from '@/api';
import { CreateChannelForm } from '@/component/create-channel-form';
import AutorizedLayout from '@/layouts/autorized-layout';
import SideBarLayout from '@/layouts/side-bar-layout';
import { CreateChannelType } from '@/type';
import { NextRouter, useRouter } from 'next/router';

export default function CreateChannel() {
  const router: NextRouter = useRouter();
  const handleSubmit = (data: any) => {
    let dataTrancformed: CreateChannelType = {
      name: data.name,
      members: data.members,
      type: data.type,
    };
    CreateChannelApi(dataTrancformed)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        router.push('/');
      });
  };
  return (
    <SideBarLayout>
      <AutorizedLayout>
        <div className="bg-white py-24 sm:py-32">
          {CreateChannelForm(handleSubmit)}
        </div>
      </AutorizedLayout>
    </SideBarLayout>


  );
}
