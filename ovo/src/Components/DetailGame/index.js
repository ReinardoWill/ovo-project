import React,{useEffect,useState, useRef} from 'react'
import {
  setSelectedGames
} from '../../Slices/gamesSlice';
import { useDispatch,useSelector } from 'react-redux';
import './detailgame.scss'
import rawgService from '../../Services/rawgApi'


export default function DetailGame() {
    const game = useSelector(state=>state.games.selectedGames);
    const dispatch = useDispatch();
    const [screenshot,setScreenshot] =useState(null);
    const [slideIndex,setSlideIndex] =useState(1);
    const rawg= new rawgService();
    const slidesRef=useRef(null);
    useEffect(() => {
        if(game!=null){
            if(!game.name){
                // eslint-disable-next-line no-const-assign
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const data=JSON.parse(sessionStorage.getItem('search'));
                dispatch(setSelectedGames(data))
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //For Changing Slides
    useEffect(() => {
        if(game!=null && game.id){
            let i;
            for (i = 0; i < slidesRef.current.children.length; i++) {
                slidesRef.current.children[i].style.display = "none";
            }
            if(slideIndex > slidesRef.current.children.length){
                setSlideIndex(1)
                slidesRef.current.children[0].style.display = "block";
            }
            else if(slideIndex < 1){
                setSlideIndex(slidesRef.current.children.length)
                slidesRef.current.children[slidesRef.current.children.length-1].style.display = "block";
            }
            else{
                slidesRef.current.children[slideIndex-1].style.display = "block";
            }
            
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideIndex])


    useEffect(() => {
        if(game!=null && game.id){
            rawg.searchGamesScreenshots(game.id).then((result) => {
                setScreenshot(result);
                setSlideIndex(1);
                slidesRef.current.children[1].style.display = "block";
            }).catch((err) => {
                console.log(err);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game])

    return (
        <div className="detailGameContainer">
            {
                game!=null  &&
                <>
                    <div className="detailBackgroundContainer" style={
                        {
                            backgroundImage: 'url(' + game.background_image + ')',
                        }
                    }>
                    </div>
                    <div className="detailContent">
                        <h2>{game.name}</h2>
                        <div className="detailScreenshots">
                            <div className="detailSlides" ref={slidesRef}>
                                {
                                    (game!=null && game.clip) &&
                                    <div className="slide fade">
                                        <iframe
                                            allowFullScreen
                                            mozallowfullscreen="true"
                                            msallowfullscreen="true"
                                            oallowfullscreen="true"
                                            webkitallowfullscreen="true"
                                            title={game.id} src={`https://www.youtube.com/embed/${game.clip.video}?autoplay=1&mute=1`}/>
                                    </div>
                                }
                                {
                                    (game!=null && screenshot!=null) &&
                                        screenshot.results.map((shot)=>
                                            <div key={shot.id} className="slide fade">
                                                <img  src={shot.image} alt="" className="screenshot"/>
                                            </div>
                                        )
                                }
                            </div>
                            <button className="prev" onClick={()=>setSlideIndex(slideIndex-1)}>&#10094;</button>
                            <button className="next" onClick={()=>setSlideIndex(slideIndex+1)}>&#10095;</button>
                        </div>
                        <h3>Released in {game.released}</h3>
                        <div className="detailInnerContent">
                            <div className="detailAbout">
                                <div dangerouslySetInnerHTML={{ __html: game.description }} />
                            </div>
                            <div className="detailDescp">
                                Tags
                                <div className="detailTagContainer">
                                    {game.tags && game.tags.map(tag=>
                                        <div key={tag.id} className="detailTag">
                                            {tag.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </>
            }
            
        </div>
    )
}
