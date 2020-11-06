import React,{useEffect, useRef} from 'react'
import {
  setSelectedGames
} from '../../Slices/gamesSlice';
import { useDispatch,useSelector } from 'react-redux';
import './detailgame.scss'
export default function DetailGame() {
    const game = useSelector(state=>state.games.selectedGames);

    const videoRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!game.name){
            // eslint-disable-next-line no-const-assign
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const data=JSON.parse(sessionStorage.getItem('search'));
            dispatch(setSelectedGames(data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if(game.clip){
            console.log(videoRef.current)
            videoRef.current.play();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef])
    return (
        <div className="detailGameContainer">
            {
                game!=null  &&
                <div className="detailGameVideoContainer">
                    <img src={game.background_image} alt=""/>
                    {
                        game.clip && 
                        <video controls>
                            <source ref={videoRef} src={game.clip.clips.full} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    }
                </div>
            }
            
        </div>
    )
}
