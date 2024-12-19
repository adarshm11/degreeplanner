import './App.css';
import { SearchMenu } from './SearchMenu.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Main app component with routing setup
function App() {
  return (
    <Router>
      <div className="App">
        <nav id="nav-bar" className="nav-bar">
          {/* Home link that navigates to the main page */}
          <Link className="home-link" to="/">Home</Link>
          {/* Header for the application */}
          <h1 className="header">Degree Planner</h1>
        </nav>
        <Routes>
          {/* Route for displaying the SearchMenu component */}
          <Route path="/" element={<SearchMenu/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;