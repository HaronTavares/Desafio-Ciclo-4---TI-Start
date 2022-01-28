import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu.js';
import { Home } from './views/Home';
import { ListarCliente } from './views/Cliente/Listar/';
import { ListarPedido } from './views/Pedido/Listar/';
import { ListarServico } from './views/Servico/ListarServico/';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route path = "/" element = {<Home/>}/>
          <Route path = '/listar-cliente' element = {<ListarCliente/>}/>
          <Route path = '/listar-pedido' element = {<ListarPedido/>}/>
          <Route path = '/listar-servico' element = {<ListarServico/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;