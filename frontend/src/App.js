import './App.css';
import { SearchMenu } from './SearchMenu.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// add CSS class for home-link

function App() {
  return (
    <Router>
      <div className="App">
        <nav id="nav-bar" className="nav-bar">
          <Link className="home-link" to="/">Home</Link>
          <h1 className="header">Degree Planner</h1>
        </nav>
        <Routes>
          <Route path="/" element={<SearchMenu/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
