import { useState } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
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
    console.log(formData); // ou envoyez les données à votre backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};
