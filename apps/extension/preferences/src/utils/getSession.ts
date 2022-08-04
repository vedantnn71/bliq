import axios from "axios";

const getSession = async () => {
  const response = await axios.get("https://bliq.vercel.app/api/auth/session");
  const data = await response.data;

  return data;
}

export default getSession;
