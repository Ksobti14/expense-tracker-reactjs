import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Exptrack from './pages/signup/expense-tracker/Exptrack.js';
import Sign from './pages/signup/Sign.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Sign/>}/>
          <Route path='/expense-tracker' exact element={<Exptrack/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
