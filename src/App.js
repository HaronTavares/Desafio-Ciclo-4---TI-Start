import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { Listar } from './views/Cliente/Listar/';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" element = {<Home/>}/>
          <Route path = '/listar-cliente' element = {<Listar/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
