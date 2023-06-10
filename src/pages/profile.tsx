
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CreateUser } from '../type';
import { CreateUsersApi, GetUserApi } from '../api';
import SideBarLayout from '../layouts/side-bar-layout';
import AutorizedLayout from '../layouts/autorized-layout';
import { Profile } from '../features/user';
import { UpdateProfileForm } from '../features/authentication';
import { log } from 'console';

export default function ProfilePage() {
    const [user, setUser] = useState<CreateUser | null>(null);
  useEffect(() => {
    GetUserApi().then((res) => {setUser(res.user);});
    
  },[]);
  const router: NextRouter = useRouter();

  const handleSubmit = (data: any) => {
    let dataTrancformed: CreateUser = {
      email: data.email,
      password: data.password,
      bio: data.bio,
      name: data.name,
    };
    CreateUsersApi(dataTrancformed).then((res) => {
      res.user.email && localStorage.setItem('email', res.user.email);
      res.user.token && localStorage.setItem('token', res.user.token);
      res.user.name && localStorage.setItem('name', res.user.name);
      res.user.email && res.user.token && res.user.name && router.push('/');
    });
  };
  return (
    <SideBarLayout>
      <div className='flex justify-center basis-3/3 hover:basis-2/2'>
        <AutorizedLayout>
          <Profile />
          <div className="bg-white py-24 sm:py-32">{UpdateProfileForm(handleSubmit,user)}</div>
        </AutorizedLayout>
      </div>
    </SideBarLayout>

  )
}
