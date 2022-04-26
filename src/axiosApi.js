import axios from "axios";

const Axios = axios.create({baseURL:'http://localhost:3500/item'});

export default Axios;