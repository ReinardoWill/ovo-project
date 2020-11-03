import React,{useEffect} from 'react'
import Navbar from '../../Components/Navbar'
import rawgService from '../../Services/rawgApi'
import { useDispatch,useSelector } from 'react-redux'
import {
  setAccToken,
  setInitGames,
  setSelectedGames,
} from '../../Slices/gamesSlice';


export default function Home() {
    const dispatch = useDispatch();
    const acc_token= useSelector(state=>state.games.accToken);
    const rawg= new rawgService();
    useEffect(() => {
       rawg.initGames();
        
    }, [])

    return (
        <div>
            <Navbar/>
        </div>
    )
}
