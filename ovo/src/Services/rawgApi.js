import axios from 'axios';

const key='538004402a3a4fdd8dcde6f002235e36';
// eslint-disable-next-line no-unused-vars
const API_URL = `https://api.rawg.io/api`; 

export default class rawgService{
    initGames = ()=>{
        return axios
	        .get(`${API_URL}/games?key=${key}&page=${Math.floor(Math.random() * 11)+1}&page_size=10`)
	        .then(response => {
	            return response.data;
	    });
    }
    searchGames = (query)=>{
        return axios
	        .get(`${API_URL}/games/${query}?key=${key}`)
	        .then(response => {
                sessionStorage.setItem('type','Game');
                sessionStorage.setItem('search',JSON.stringify(response.data));
	            return response.data;
	    });
    }
    searchGamesScreenshots = (query)=>{
        return axios
	        .get(`${API_URL}/games/${query}/screenshots?key=${key}`)
	        .then(response => {
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
    searchCreator = (query)=>{
        return axios
	        .get(`${API_URL}/creators/${query}?key=${key}`)
	        .then(response => {
                sessionStorage.setItem('type','Creator');
                sessionStorage.setItem('search',JSON.stringify(response.data));
	            return response.data;
	    });
    }

    searchGamesByQuery = (query)=>{
        return axios
	        .get(`${API_URL}/games?key=${key}&search=${query}`)
	        .then(response => {
                sessionStorage.setItem('type','All');
                sessionStorage.setItem('search_games',JSON.stringify(response.data.results));
	            return response.data.results;
	    });
    }
    searchCreatorByQuery = (query)=>{
        return axios
	        .get(`${API_URL}/creators?key=${key}&search=${query}`)
	        .then(response => {
                sessionStorage.setItem('type','All');
                sessionStorage.setItem('search_creators',JSON.stringify(response.data.results));
	            return response.data.results;
	    });
    }
}


