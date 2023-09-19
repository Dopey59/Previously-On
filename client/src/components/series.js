import React, { useEffect, useState, } from 'react';
import axios from 'axios';

function Series() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const apiKey = 'bd0c0500c29c'; // Remplacez par votre clé d'API réelle
      
      const FetchSeries = async () => {
          try {
              const response = await axios.get('https://api.betaseries.com/shows/discover', {
                  params : {
                    "limit" : 20,
                  },
                  
                  headers: {
                      'X-BetaSeries-Key': apiKey,
                    },
                });
                // La réponse de l'API est stockée dans response.data
                setData(response.data.shows);
                console.log(response.data)
            } catch (error) {
                console.error('Erreur lors de la requête GET :', error);
                setLoading(false);
            }
        };
        
        FetchSeries();
    }, []);
    
    return (
        <>
        <div className=' grid grid-cols-4 h-full  bg-slate-700 text-white p-6 '>
      {
        data.map((show) => (
            <div className="mx-4 py-4 flex ">
                <div className='gap-3 flex flex-col items-center '>
                    <h1 className='text-xl'>
                        {
                            show.title.length >= 40
                            ? `${show.title.slice(0, 40)} ... `
                            : show.title
                        }
                    </h1>
                    <a href={'/detail/'+show.id}>
                        <img className='rounded-md w-auto h-auto duration-0 transition hover:duration-500 hover:opacity-80
                            hover:cursor-pointer'  src={show.images.poster} alt="poster" />
                    </a>
                </div>
            </div>
        ))
      }
      
    </div>
        </>
  );
}

export default Series;
