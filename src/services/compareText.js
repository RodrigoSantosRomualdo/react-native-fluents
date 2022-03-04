import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const apiComparaText = axios.create({
  baseURL: "https://stream-audio-react-native.herokuapp.com/compare",
});

export default apiComparaText;