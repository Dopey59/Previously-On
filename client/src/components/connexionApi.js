import axios from "axios";
import React, { useState } from "react";
import md5 from "md5";
import Series from '../components/series';
import { useCookies } from 'react-cookie';


export default function ConnexionApi(){

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    async function Auth(){
        const URL = "https://api.betaseries.com/members/auth";
        const apiKey = "bd0c0500c29c";

        await axios.post (URL,
            {
                "password": md5(password),
                "login" : login                 
            },
            {
                headers: {
                    'X-BetaSeries-Key': apiKey
                }

            }
        )
        .then((response) => {
            console.log(response.data.token)
            setCookie("token", response.data.token, { path: '/' });
            // window.location.replace("/Series")
        })
        .catch(e => {console.log(e)})
    }

    return(
        <div className="flex flex-col items-center justify-center mt-8">
                <div className="flex items-center  pb-12">
                    <h3 id="cnx" className="text-white text-xl">Se connecter</h3>
                </div>
                <div className="flex gap-12">
                    <input
                        type='text'
                        placeholder='email'
                        className="p-2 rounded-md outline-none"
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                        
                        />

                    <input
                        type='password'
                        placeholder='******'
                        className="p-2 rounded-md outline-none"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        
                        />

                    <button className="text-white bg-blue-600 rounded-md p-2"
                        onClick={Auth}>Valider</button>
                </div>
        </div>
    )
}