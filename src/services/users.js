import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const apiUsers = axios.create({
  baseURL: "https://api-fluents.herokuapp.com/user",
});

export default apiUsers;