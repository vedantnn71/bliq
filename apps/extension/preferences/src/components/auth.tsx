import { useRouter } from "next/router";
import config from "config.json";

const Auth = () => {
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col gap-7">
      <h1 className="mx-auto font-bold text-2xl text-slate-800">Heyy Welcome! 👋</h1>
      <a
        className="bg-brand-primary p-2 rounded-md text-white text-lg hover:scale-[.98] duration-500 text-center" 
        href={config.appUrl + "/auth/signup"}
        target="_blank"
        rel="noreferrer"
      >
        Signup
      </a>   
      <a
        className="bg-gray-100 secondary p-2 rounded-md text-slate-800 border-2 border-brand-secondary text-lg text-center hover:scale-[.98] duration-500"
        href={config.appUrl + "/auth/login"}
        target="_blank"
        rel="noreferrer"
      >
        Login 
      </a>   
    </div>
  )
}

export default Auth;
