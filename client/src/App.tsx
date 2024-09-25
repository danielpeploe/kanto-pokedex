import './App.css'
import PokemonList from './components/PokemonList';
import PokemonDisplay from './components/PokemonDisplay';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDisplay />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App