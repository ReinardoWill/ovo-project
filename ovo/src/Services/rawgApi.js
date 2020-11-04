import axios from 'axios';

const key='538004402a3a4fdd8dcde6f002235e36';
// eslint-disable-next-line no-unused-vars
const API_URL = `https://api.rawg.io/api`; 

export default class rawgService{
    initGames = ()=>{
        return axios
	        .get(`${API_URL}/games?key=${key}&page=${Math.floor(Math.random() * 11)+1}`)
	        .then(response => {
                console.log(response.data)
	            return response.data;
	    });
    }
    initCreator = ()=>{
        return axios
	        .get(`${API_URL}/creators?key=${key}&page=${Math.floor(Math.random() * 11)+1}&page_size=3`)
	        .then(response => {
	            return response.data;
	    });
    }
}


