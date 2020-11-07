import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {
  setSelectedCreators
} from '../../Slices/gamesSlice';
import './detailcreator.scss'
export default function DetailCreator() {
    const creator = useSelector(state=>state.games.selectedCreators);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!creator.name){
            // eslint-disable-next-line no-const-assign
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const data=JSON.parse(sessionStorage.getItem('search'));
            dispatch(setSelectedCreators(data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="detailCreatorContainer">
            {
                creator!=null &&
                <>
                    <div className="detailCreatorBackgroundContainer" style={
                        {
                            backgroundImage: 'url(' + creator.image_background + ')',
                        }
                    }>
                    </div>
                    <div className="detailCreatorAvatarContainer">
                        <img src={creator.image} alt=""/>
                    </div>
                    <div className="detailCreatorContent">
                        <div className="creatorName">
                            <h2>{creator.name}</h2>
                        </div>
                        <div className="creatorDescription">
                            <div dangerouslySetInnerHTML={{ __html: creator.description }} />
                        </div>
                        <div className="creatorPosition">
                            <h3>Positions</h3>
                            {creator.positions && creator.positions.map(pos=>
                                <div className="posTag">
                                    {pos.name}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
