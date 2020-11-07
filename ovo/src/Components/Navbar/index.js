import React,{useRef} from 'react'
import './navbar.scss'
import { useHistory } from 'react-router-dom';
import {
  queryGamesCreatorsAsync
} from '../../Slices/gamesSlice';
import { useDispatch } from 'react-redux'
export default function Navbar() {
    const history = useHistory();
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const handleSubmit= (event)=>{
        event.preventDefault();
        let searching=searchRef.current;
        if(searching.value && searching.value!==''){
            dispatch(queryGamesCreatorsAsync(searching.value))
            history.push("/search")
        }
    }
    return (
        <div className="navbarContainer">
            <h1 onClick={()=>history.push("/")}>GamesDBProject</h1>
            <div className="navbarSearchContainer">
                <form onSubmit={handleSubmit}>
                    <input ref={searchRef} type="search" placeholder="Search Games,Creators"/>
                </form>
            </div>
        </div>
    )
}
