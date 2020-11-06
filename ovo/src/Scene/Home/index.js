import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  initGamesAsync,
  initCreatorsAsync
} from '../../Slices/gamesSlice';
import Slider from '../../Components/Slider';
import CreatorCard from '../../Components/CreatorCard';
import './home.scss'
import Navbar from '../../Components/Navbar';

export default function Home() {
    const dispatch = useDispatch();
    const selectedGames= useSelector(state=>state.games.selectedGames);
    useEffect(() => {
        selectedGames=[];
        dispatch(initGamesAsync());
        dispatch(initCreatorsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="homeContainer">
            <Navbar/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/detail">

                    </Route>
                </Switch>
            </Router>
            <Slider/>
            <CreatorCard/>
        </div>
    )
}
