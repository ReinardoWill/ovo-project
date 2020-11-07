import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom';
import DetailCreator from '../../Components/DetailCreator';
import DetailGame from '../../Components/DetailGame';
import Navbar from '../../Components/Navbar';
export default function Detail() {
    const history = useHistory();
    const [type, setType] = useState("");
    useEffect(() => {
        if(!history.location.data){
            if(sessionStorage.getItem("type")){
                setType(sessionStorage.getItem("type"));
            }
            else{
                history.push('/')
            }
        }
        else{
            setType(history.location.data.type);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Navbar/>
            {type==='Game' ? <DetailGame/>:<DetailCreator/>}
        </div>
    )
}
