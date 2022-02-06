import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu.js';
import { Home } from './views/Home';

//Cliente

import { CadastrarCliente } from './views/Cliente/CadastrarCliente'
import { ListarCliente } from './views/Cliente/ListarCliente';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { PedidoCliente } from './views/Cliente/PedidoCliente';

//Pedido

import { CadastrarPedido } from './views/Pedido/CadastrarPedido'
import { ListarPedido } from './views/Pedido/ListarPedido';
import { EditarPedido } from './views/Pedido/EditarPedido';
import { ClientePedido } from './views/Pedido/ClientePedido/';
import { ItemPedido } from './views/Pedido/ItemPedido/';

//Item Pedido

import { CadastrarItemPedido } from './views/ItemPedido/CadastrarItemPedido'
import { ListarItemPedido } from './views/ItemPedido/ListarItemPedido';
import { EditarItemPedido } from './views/ItemPedido/EditarItemPedido';
import { PedidoItem } from './views/ItemPedido/PedidoItem';
import { ServicoItem } from './views/ItemPedido/ServicoItem';

//Serviço

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

          {/* Cliente */}

          <Route path='/cadastrar-cliente' element={<CadastrarCliente />} />
          <Route path='/listar-cliente' element={<ListarCliente />} />
          <Route path='/editar-cliente/:id' element={<EditarCliente />} />
          <Route path='/listar-pedidos-cliente/:id' element={<PedidoCliente />} />  

          {/* Pedido */}

          <Route path='/cadastrar-pedido' element={<CadastrarPedido />} />
          <Route path='/listar-pedido' element={<ListarPedido />} />
          <Route path='/editar-pedido/:id' element={<EditarPedido />} />
          <Route path='/listar-cliente-pedido/:id' element={<ClientePedido />} />
          <Route path='/listar-itempedidos-pedido/:id' element={<ItemPedido />} />

          {/* Item pedido */} 

          <Route path='/cadastrar-itempedido' element={<CadastrarItemPedido />} />
          <Route path='/listar-itempedido' element={<ListarItemPedido />} />
          <Route path='/editar-itempedido/:id' element={<EditarItemPedido />} />
          <Route path='/listar-pedido-itempedido/:id' element={<PedidoItem />} />
          <Route path='/listar-servico-itempedido/:id' element={<ServicoItem />} />

          {/* Serviço */}

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