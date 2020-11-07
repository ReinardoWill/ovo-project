import React,{useRef,useEffect} from 'react'
import './tab.scss'
import SearchGameCard from '../SearchGameCard';
import SearchCreatorCard from '../SearchCreatorCard';
import {
    setSelectedGames,
    setSelectedCreators
} from '../../Slices/gamesSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
export default function Tab() {
    const tabRef=useRef(null);
    const tabBtnRef=useRef(null);
    const games = useSelector(state=>state.games.selectedGames);
    const creators = useSelector(state=>state.games.selectedCreators);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        openSection(0)
        let data_games=[];
        let data_creators=[];
        if(games!=null){
            if( games.length<1){
                // eslint-disable-next-line no-const-assign
                // eslint-disable-next-line react-hooks/exhaustive-deps
                data_games=JSON.parse(sessionStorage.getItem('search_games'));
                dispatch(setSelectedGames(data_games))
            }
        }
        if(creators!=null){
            if(creators.length<1){
                // eslint-disable-next-line no-const-assign
                // eslint-disable-next-line react-hooks/exhaustive-deps
                data_creators=JSON.parse(sessionStorage.getItem('search_creators'));
                dispatch(setSelectedCreators(data_creators))
            }
        }
        if(games==null && creators==null && data_games.length<1 && data_creators.length<1){
            history.push('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const openSection = (index)=>{
        const tabDom = tabRef.current;
        const tabBtnDom = tabBtnRef.current;
        let i=0;
        for(i = 0; i < tabDom.children.length; i++){
            tabDom.children[i].style.display = "none";
            tabBtnDom.children[i].className = tabBtnDom.children[i].className.replace(" active", "");
        }
        tabDom.children[index].style.display = "flex";
        tabBtnDom.children[index].className+=" active";
    }

    return (
        <div className="tabContainer">
            <div className="tabBtn" ref={tabBtnRef}>
                <button className="tabLinks" onClick={()=>openSection(0)}>Games</button>
                <button className="tabLinks" onClick={()=>openSection(1)}>Creators</button>
            </div>
            <div ref={tabRef} className="tabContentContainer">
                <div className="tabContent">
                    {games!=null && Array.isArray(games) && games.map(game=>
                        <SearchGameCard Game={game} key={game.id}/>
                    )}
                </div>
                <div className="tabContent">
                    {creators!=null && Array.isArray(creators) && creators.map(creator=>
                        <SearchCreatorCard Creator={creator} key={creator.id}/>
                    )}
                </div>
            </div>
            
        </div>
    )
}
