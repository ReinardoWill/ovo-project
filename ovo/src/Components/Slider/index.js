import React from 'react'
import { useSelector } from 'react-redux'
import './slider.scss'
export default function Slider() {
    const initGames= useSelector(state=>state.games.initGames);
    return (
        <div className="slider">
            {initGames.hasOwnProperty('count') && 
                initGames.results.map((games,index)=>{
                    return(
                        <React.Fragment key={games.id}>
                            <input type="radio" name="radioSlider" defaultChecked={index===0? true:false}/>
                            <div className="imgBx">
                                <img src={games.background_image} alt=""/>
                                <div className="content">
                                    <h2>{games.name}</h2>
                                    <br/>
                                    <h3>Released in {games.released}</h3>
                                    <h3>Metacritic Score {games.metacritic}</h3>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })
            }
        </div>
    )
}
