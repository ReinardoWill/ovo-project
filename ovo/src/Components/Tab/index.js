import React,{useRef,useEffect,useCallback,useState} from 'react'
import './tab.scss'
import SearchGameCard from '../SearchGameCard';
import SearchCreatorCard from '../SearchCreatorCard';
import {
    setSelectedGames,
    setSelectedCreators,
    setHasMoreGamesUrl,
    setHasMoreCreatorsUrl
} from '../../Slices/gamesSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import rawgService from '../../Services/rawgApi';
export default function Tab() {
    const rawg= new rawgService();
    const tabRef=useRef(null);
    const tabBtnRef=useRef(null);
    const games = useSelector(state=>state.games.selectedGames);
    const creators = useSelector(state=>state.games.selectedCreators);
    const [loading, setLoading] = useState(false)
    const hasMoreGamesUrl=useSelector(state=>state.games.hasMoreGamesUrl);
    const hasMoreCreatorsUrl=useSelector(state=>state.games.hasMoreCreatorsUrl);
    const dispatch = useDispatch();
    const history = useHistory();
    const gameObs= useRef();
    const searchNext= (next,type) =>{
        setLoading(true)
        rawg.searchNext(next,type).then((result) => {
            if(type==='Game'){
                console.log(result.data)
                dispatch(setSelectedGames([...games,...result.data]))
                let currData= JSON.parse(sessionStorage.getItem('search_games'));
                sessionStorage.setItem('search_games',JSON.stringify([...currData,...result.data]));
                dispatch(setHasMoreGamesUrl(result.hasMore));
                setLoading(false)
            }
            else{
                dispatch(setSelectedCreators([...creators,result.data]))
                let currData= JSON.parse(sessionStorage.getItem('search_creators'));
                sessionStorage.setItem('search_creators',JSON.stringify([...currData,...result.data]));
                dispatch(setHasMoreCreatorsUrl(result.hasMore));
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        });
    };
    const lastGameRef = useCallback(node=>{
        if(loading){ 
            return
        }
        else{
            if(gameObs.current){
                gameObs.current.disconnect();
            }
            gameObs.current = new IntersectionObserver(entries=>{
                if(entries[0].isIntersecting && hasMoreGamesUrl && hasMoreGamesUrl!=null && hasMoreGamesUrl!=='null' ){
                    (async () => {
                        let func1= await searchNext(hasMoreGamesUrl,'Game')
                    })();
                }
            })
            if(node){
                gameObs.current.observe(node)
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading,hasMoreGamesUrl])


    useEffect(() => {
        openSection(0)
        let data_games=[];
        let data_creators=[];
        let hasMore_games='';
        let hasMore_creator='';
        if(games!=null){
            if( games.length<1){
                // eslint-disable-next-line no-const-assign
                // eslint-disable-next-line react-hooks/exhaustive-deps
                data_games=JSON.parse(sessionStorage.getItem('search_games'));
                console.log(JSON.stringify(data_games));
                hasMore_games=JSON.parse(sessionStorage.getItem('hasMore_games'));
                dispatch(setSelectedGames([]))
                dispatch(setSelectedGames(data_games))
                dispatch(setHasMoreGamesUrl(hasMore_games))
            }
        }
        if(creators!=null){
            if(creators.length<1){
                // eslint-disable-next-line no-const-assign
                // eslint-disable-next-line react-hooks/exhaustive-deps
                data_creators=JSON.parse(sessionStorage.getItem('search_creators'));
                hasMore_creator=JSON.parse(sessionStorage.getItem('hasMore_creator'));
                dispatch(setSelectedCreators([]))
                dispatch(setSelectedCreators(data_creators))
                dispatch(setHasMoreCreatorsUrl(hasMore_creator))
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
                    {games!=null && Array.isArray(games) && games.map((game,i)=>{
                        if(i===games.length-1){
                            return(
                                <React.Fragment key={game.id}>
                                    <div ref={lastGameRef}></div>
                                    <SearchGameCard Game={game}/>
                                </React.Fragment>
                            )
                        }
                        else{
                            return(
                                <React.Fragment key={game.id}>
                                    <div></div>
                                    <SearchGameCard Game={game}/>
                                </React.Fragment>
                            )
                        }
                        
                    })}
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
