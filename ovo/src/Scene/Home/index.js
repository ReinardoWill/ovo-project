import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {
  initGamesAsync,
  initCreatorsAsync,
  resetSelectedGames
} from '../../Slices/gamesSlice';
import Slider from '../../Components/Slider';
import CreatorCard from '../../Components/CreatorCard';
import './home.scss'
import Navbar from '../../Components/Navbar';
export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.clear();
        dispatch(resetSelectedGames());
        dispatch(initGamesAsync());
        dispatch(initCreatorsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="homeContainer">
            <Navbar/>
            <Slider/>
            <CreatorCard/>
        </div>
    )
}
