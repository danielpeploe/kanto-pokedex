import './App.css'
import PokemonList from './components/PokemonList';
import PokemonDisplay from './components/PokemonDisplay';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Navigate to="/pokemon" />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDisplay />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App