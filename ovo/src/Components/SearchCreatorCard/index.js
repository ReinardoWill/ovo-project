import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedCreatorsAsync}  from '../../Slices/gamesSlice';
import { useHistory } from 'react-router-dom';
import './searchcreatorcard.scss'
export default function SearchCreatorCard(Creator) {
    const [currCreator,setCreator] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        setCreator(Creator.Creator);
    }, [Creator])
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
        <div className="searchCreatorCardContainer" onClick={()=>handleClickDetail(currCreator.id)}>
            <div className="searchCreatorCardBackground" style={
                {
                    backgroundImage: 'url(' + currCreator.image_background + ')'
                }
            }/>
            <div className="searchCreatorCardAvatarContainer">
                <img src={currCreator.image} alt=""/>
            </div>
            <h2>{currCreator.name}</h2>
        </div>
    )
}
