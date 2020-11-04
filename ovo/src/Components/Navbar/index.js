import React from 'react'
import './navbar.scss'
export default function Navbar() {
    return (
        <div className="navbarContainer">
            <h1>GamesDBProject</h1>
            <div className="navbarSearchContainer">
                <input type="search" placeholder="Search Games,Creators"/>
            </div>
        </div>
    )
}
