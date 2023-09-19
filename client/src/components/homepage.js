import React from 'react';
import '../index.css';
import ConnexionApi from '../components/connexionApi';
import Series from '../components/series';


export default function Homepage(){
    
    return(
        <main className='bg-black h-screen'>
            <div className='flex items-center justify-around py-52'>
                <h1 className='text-6xl w-3/6 text-white '><span className='bg-red-600'> Je me suis réincarné en 
                 <span className='font-bold'> développeur-web</span>, 
                 du coup j'ai créer un site sur <span className='font-bold'>les séries-animées</span></span></h1>
                <div>
                    <h1 className='text-white text-4xl'>Previously On</h1>
                </div>

            </div>
                <div className='flex justify-center'>
                    <h1 className='text-white text-4xl'>Accède à n'importe quels films ou séries.</h1>
                </div>
                <div className='p-6'>
                    <ConnexionApi/>
                </div>
                <div>
                    <Series/>
                </div>
        </main>
    );
}