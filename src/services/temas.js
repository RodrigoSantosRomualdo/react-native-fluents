import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const apiTemas = axios.create({
  baseURL: "https://api-fluents.herokuapp.com",
});

export default apiTemas;