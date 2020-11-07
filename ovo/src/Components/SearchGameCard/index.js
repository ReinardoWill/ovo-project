import React,{useEffect,useState} from 'react'
import './searchgamecard.scss'
import { selectedGamesAsync}  from '../../Slices/gamesSlice';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

export default function SearchGameCard(Game) {
    const [currGame,setCurrGame] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        setCurrGame(Game.Game);
    }, [Game])
    const handleClickDetail= (id)=>{
        dispatch(selectedGamesAsync(id));
        history.push(
            {
                pathname: '/detail',
                data: {
                    type:'Game'
                }
            }
        )
    }
    return (
        <div className="searchGameCardContainer" onClick={()=>handleClickDetail(currGame.id)}>
            <div className="searchGameCardBackground" style={
                {
                    backgroundImage: 'url(' + currGame.background_image + ')'
                }
            }/>
            <h2>{currGame.name}</h2>
        </div>
    )
}
