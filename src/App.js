import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu.js';
import { Home } from './views/Home';

import { CadastrarCliente } from './views/Cliente/CadastrarCliente'
import { ListarCliente } from './views/Cliente/ListarCliente';
import { EditarCliente } from './views/Cliente/EditarCliente';

import { CadastrarPedido } from './views/Pedido/CadastrarPedido'
import { ListarPedido } from './views/Pedido/ListarPedido';
import { EditarPedido } from './views/Pedido/EditarPedido';

import { CadastrarServico } from './views/Servico/CadastrarServico';
import { ListarServico } from './views/Servico/ListarServico/';
import { EditarServico } from './views/Servico/EditarServico';
import { ItemServico } from './views/Servico/ItemServico/';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" element={<Home />} />

          <Route path='/cadastrar-cliente' element={<CadastrarCliente />} />
          <Route path='/listar-cliente' element={<ListarCliente />} />
          <Route path='/editar-cliente/:id' element={<EditarCliente />} />

          <Route path='/cadastrar-pedido' element={<CadastrarPedido />} />
          <Route path='/listar-pedido' element={<ListarPedido />} />
          <Route path='/editar-pedido/:id' element={<EditarPedido />} />

          <Route path='/cadastrar-servico' element={<CadastrarServico />} />
          <Route path='/listar-servico' element={<ListarServico />} />
          <Route path='/editar-servico/:id' element={<EditarServico />} />
          <Route path='/listar-itempedidos-servico/:id' element={<ItemServico />} />    
        </Switch>
      </Router>
    </div>
  );
}

export default App;