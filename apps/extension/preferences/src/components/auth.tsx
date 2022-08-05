import { useRouter } from "next/router";
import config from "config.json";

const Auth = () => {
  const router = useRouter();

  return (
    <div className="py-4 px-6 flex flex-col gap-6 justify-center">
      <div className="flex flex-row justify-center items-center mx-auto">
        <img src="images/logo.svg" className="w-20 mx-0" />
        <h1 className="font-bold text-3xl text-slate-800">
          Bliq <span className="text-brand-secondary">for chrome</span>
        </h1>
      </div>
      <div>
        <h2 className="font-semibold text-slate-800 text-xl">
          Signup now to:
        </h2>
        <ul className="text-lg align-center justify-center py-2 text-gray-800">
          <li className="flex flex-row gap-1">
            <img src="images/check.png" />
            Get blazing fast auto-completions
          </li>
          <li className="flex flex-row gap-1">
            <img src="images/check.png" />
            Increase your productivity
          </li>
          <li className="flex flex-row gap-1">
            <img src="images/check.png" />
            Improve your writing
          </li>
        </ul>
      </div>
      <a
        className="bg-brand-primary p-2 rounded-md text-white text-lg hover:scale-[.98] duration-500 text-center text-semibold" 
        href={config.appUrl + "/auth/signup"}
        target="_blank"
        rel="noreferrer"
      >
        Signup
      </a>  
      <a
        className="bg-gray-100 secondary p-2 rounded-md text-slate-800 border-2 border-brand-secondary text-lg text-center hover:scale-[.98] duration-500 text-semibold"
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
