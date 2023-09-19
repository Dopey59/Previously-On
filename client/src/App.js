import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../src/components/homepage';
import ConnexionApi from '../src/components/connexionApi';
import Series from '../src/components/series';
import Detail from './components/detail';
import Episode from './components/episode';

function App(){
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Connexion" element={<ConnexionApi />} />
        <Route path="/Series" element={<Series />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/episode/:id' element={<Episode/>} />
    </Routes>
  )

}

export default App;