import React from 'react'
import './navbar.scss'
import { useHistory } from 'react-router-dom';


export default function Navbar() {
    const history = useHistory();
    return (
        <div className="navbarContainer">
            <h1 onClick={()=>history.push("/")}>GamesDBProject</h1>
            <div className="navbarSearchContainer">
                <input type="search" placeholder="Search Games,Creators"/>
            </div>
        </div>
    )
}
