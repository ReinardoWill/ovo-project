import React from 'react'
import './creatorcard.scss'
import { useSelector,useDispatch } from 'react-redux'
import { setSelectedCreatorsAsync}  from '../../Slices/gamesSlice';
import { useHistory } from 'react-router-dom';

export default function CreatorCard() {
    const initCreators= useSelector(state=>state.games.initCreators);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClickDetail= (id)=>{
        dispatch(setSelectedCreatorsAsync(id));
        history.push(
            {
                pathname: '/detail',
                data: {
                    type:'Creator'
                }
            }
        )
    }
    return (
        <div className="creatorCardContainer" >
            <h2>Top Creator</h2>
            <div className="cardList">
                {initCreators.hasOwnProperty('count') && 
                    initCreators.results.map((creator,index)=>{
                        let backgroundStyling = {
                            backgroundImage: 'url(' + creator.image_background + ')',
                        };
                        return(
                            <div className="creatorCard" key={creator.id} onClick={()=>handleClickDetail(creator.id)}>
                                <div className="creatorCardAvatarBackground" style={backgroundStyling}>
                                </div>
                                <div className="creatorCardAvatarContainer">
                                    <img src={creator.image} alt=""/>
                                </div>
                                
                                <div className="creatorCardName">
                                    <h2>{creator.name}</h2>
                                </div>
                                <div className="creatorCardContentContainer">
                                    <h3>Known for</h3>
                                    {creator.games.map(game=>{
                                        return(
                                            <h4 key={game.id}>{game.name}</h4>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
