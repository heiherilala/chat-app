import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';

const schema = yup.object().shape({
  email: yup.string().email('have to be email form').required('email required'),
  name: yup.string().required('name required'),
  bio: yup.string().required('bio required'),
  password: yup
  .string()
  .min(8, 'passord have to be more than 8 words')
  .max(32, 'passord have to be less than 32 words')
  .required('passord required'),
  confirmPassword: yup
  .string()
  .min(8, 'passord have to be more than 8 words')
  .max(32, 'passord have to be less than 32 words')
  .oneOf([yup.ref('password')], "Passwords don't match")
  .required('passord required')
  

});

export const UpdateProfileForm = (externalSubmitHandler: (data:any) => void, firstData:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(()=>{
    reset(
      {
        name:firstData?.name?firstData?.name:"",
        email:firstData?.email?firstData?.email:"",
        bio:firstData?.bio?firstData?.bio:""
      }
    )
  })
  const onSubmitHandler = (data: any) => {
      externalSubmitHandler(data);
      reset();
  };
  return (
    <form
      name='registrationForm'
      className="max-w-sm mx-auto mt-8 registrationForm"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2>Lets sign you up</h2>

      <div>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('email')}
          placeholder="email"
          type="text"
          name="email"
          required
        />
        {typeof errors.email?.message === 'string' && (
          <p>{errors?.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('name')}
          placeholder="name"
          type="text"
          name="name"
          required
        />
        {typeof errors.name?.message === 'string' && (
          <p>{errors?.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
        bio:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('bio')}
          placeholder="bio"
          type="text"
          name="bio"
          required
        />
        {typeof errors.bio?.message === 'string' && (
          <p>{errors?.bio.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          password:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('password')}
          placeholder="password"
          type="password"
          name="password"
          required
        />
        {typeof errors.password?.message === 'string' && (
          <p>{errors.password.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-bold mb-2"
        >
          confirmPassword:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('confirmPassword')}
          placeholder="confirmPassword"
          type="password"
          name="confirmPassword"
          required
        />
        {typeof errors.confirmPassword?.message === 'string' && (
          <p>{errors.confirmPassword.message}</p>
        )}
      </div>
      <br />

      <button
        className="updateProfileButton flex items-center px-3 py-2 border rounded text-gray-600 border-gray-500 hover:text-gray-800 hover:border-green-500 appearance-none focus:outline-none"
        type="submit"
      >
        Update Profile
      </button>
    </form>
  );
};
