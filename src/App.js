import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu.js';
import { Home } from './views/Home';
import { ListarCliente } from './views/Cliente/Listar/';
import { ListarPedido } from './views/Pedido/Listar/';
import { ListarServico } from './views/Servico/ListarServico/';
import { Item } from './views/Servico/Item/';
import { Cadastrar } from './views/Servico/Cadastrar';
import { Editar } from './views/Servico/EditarServico';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path='/listar-cliente' element={<ListarCliente />} />
          <Route path='/listar-pedido' element={<ListarPedido />} />
          <Route path='/listar-servico' element={<ListarServico />} />
          <Route path='/listar-pedido/:id' element={<Item />} />
          <Route path='/cadastrar-servico' element={<Cadastrar />} />
          <Route path='/editar-pedido/:id' element={<Editar />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;