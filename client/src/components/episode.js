import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';


function Episode(){

    const [detail, setDetail] = useState([]);
    const [seen, setSeen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const apiKey = "bd0c0500c29c";
    const jeton = cookies['token'];
    const params = useParams();

    useEffect(() => {
        axios.get("https://api.betaseries.com/episodes/display", {
            params: {
                id: params.id
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            setDetail(res.data.episode)
        })

        axios.get('https://api.betaseries.com/episodes/display', {
            params: {
                id: params.id,
                token: cookies["token"]
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
        .then((res) => {
            setSeen(res.data.episode.user.seen)
        })
    }, [detail]);

    function markAsSeen(){
        axios.post(`https://api.betaseries.com/episodes/watched?key=${apiKey}&id=${params.id}&token=${jeton}`)
    }

    function deleteSeen(){
        axios.delete("https://api.betaseries.com/episodes/watched", {
            params: {
                id: params.id,
                token: cookies["token"]
            },
            headers: {
                'X-BetaSeries-Key': apiKey,
            },
        })
    }

    return (
        <>
        
        <div className="flex py-6 bg-slate-900 fixed w-full text-white">
            <a href="/" className="text-2xl ml-4 font-bold ">Previously On</a >
        </div>

        <div className="w-screen overflow-x-hidden flex justify-around items-center bg-slate-800 text-white h-screen p-12">
        <div>
            <a href="/">
                <FontAwesomeIcon  icon={faArrowAltCircleLeft} style={{color: 'white', cursor:'pointer'}}
                    className="flex items-start justify-start text-2xl hover:opacity-75"/> 
            </a>
        </div>
            <div className="flex flex-col text-white gap-4 w-1/2">
                <h1 className="text-4xl font-semibold ">Détail de l'épisode</h1>
                <p className="text-2xl"> Titre : {detail.title}</p>
                <p className="text-xl"> Date de diffusion : {detail.date} </p>
                <p className="text-xl"> Description : {detail.description} </p>
            </div>
            {
                seen ? (
                    <button className="p-2 bg-green-600 hover:bg-green-500 rounded-lg text-white" onClick={deleteSeen}>Supprimer des vus</button>
                ):(
                    <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white" onClick={markAsSeen}>Marquer comme vu</button>
                )
            }
        </div>
        </>
    )
}

export default Episode