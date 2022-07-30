import axios from "axios";

const getDocuments = async () => {
  const response = await axios.get("/api/document");
  return response;
}

export default getDocuments;
