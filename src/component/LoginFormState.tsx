import { setSessionStorageItem } from "@/operation/sessionStorageProv";
import { useState } from "react";
import { NextRouter, useRouter } from 'next/router';

interface LoginFormState {
  email: string;
  password: string;
}




export default function LoginForm() {

  const router:NextRouter = useRouter();

  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem("try")
    sessionStorage.setItem("email", formData.email)
    router.push('/');
  };

  return (
    <form className="max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Adresse e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Entrez votre adresse e-mail"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className='flex items-center px-3 py-2 border rounded text-gray-100 border-gray-600 hover:text-gray-300 hover:border-green-500 appearance-none focus:outline-none'
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};
