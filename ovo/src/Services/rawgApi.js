import axios from 'axios';

const key='538004402a3a4fdd8dcde6f002235e36';
// eslint-disable-next-line no-unused-vars
const API_URL = `https://api.rawg.io/api`; 
export default class rawgService{
    initGames = ()=>{
        return axios
	        .get(`${API_URL}/games?key=${key}`)
	        .then(response => {
	            return response.data;
	    });
    }
}


