import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './slider.scss'
import {
  selectedGamesAsync
} from '../../Slices/gamesSlice';
import { useHistory } from 'react-router-dom';
export default function Slider() {
    const initGames= useSelector(state=>state.games.initGames);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClickDetail= (id)=>{
        dispatch(selectedGamesAsync(id));
        history.push(
            {
                pathname: '/detail',
                data: {
                    type:'Game'
                } // your data array of objects
            }
        )
    }
    return (
        <div className="slider">
            {initGames.hasOwnProperty('count') && 
                initGames.results.map((games,index)=>{
                    return(
                        <React.Fragment key={games.id}>
                            <input type="radio" name="radioSlider" defaultChecked={index===0? true:false}/>
                            <div className="imgBx">
                                <img src={games.background_image} alt=""/>
                                <div className="content" onClick={()=>handleClickDetail(games.id)}>
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
