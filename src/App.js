import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu.js';
import { Home } from './views/Home';

//Cliente

import { CadastrarCliente } from './views/Cliente/CadastrarCliente'
import { ListarCliente } from './views/Cliente/ListarCliente';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { PedidoCliente } from './views/Cliente/PedidoCliente';
import { CompraCliente } from './views/Cliente/CompraCliente';

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

//Compra

import { CadastrarCompra } from './views/Compra/CadastrarCompra'
import { ListarCompra } from './views/Compra/ListarCompra';
import { EditarCompra } from './views/Compra/EditarCompra';
import { ClienteCompra } from './views/Compra/ClienteCompra/';
import { ItemCompra } from './views/Compra/ItemCompra/';

//Item Compra

import { CadastrarItemCompra } from './views/ItemCompra/CadastrarItemCompra'
import { ListarItemCompra } from './views/ItemCompra/ListarItemCompra';
import { EditarItemCompra } from './views/ItemCompra/EditarItemCompra';
import { CompraItem } from './views/ItemCompra/CompraItem';
import { ProdutoItem } from './views/ItemCompra/ProdutoItem';

//Produto

import { CadastrarProduto } from './views/Produto/CadastrarProduto';
import { ListarProduto } from './views/Produto/ListarProduto/';
import { EditarProduto } from './views/Produto/EditarProduto';
import { ItemProduto } from './views/Produto/ItemProduto/';

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
          <Route path='/listar-compras-cliente/:id' element={<CompraCliente />} /> 

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

          {/* Compra */}

          <Route path='/cadastrar-compra' element={<CadastrarCompra />} />
          <Route path='/listar-compra' element={<ListarCompra />} />
          <Route path='/editar-compra/:id' element={<EditarCompra />} />
          <Route path='/listar-cliente-compra/:id' element={<ClienteCompra />} />
          <Route path='/listar-itemcompras-compra/:id' element={<ItemCompra />} />

          {/* Item compra */} 

          <Route path='/cadastrar-itemcompra' element={<CadastrarItemCompra />} />
          <Route path='/listar-itemcompra' element={<ListarItemCompra />} />
          <Route path='/editar-itemcompra/:id' element={<EditarItemCompra />} />
          <Route path='/listar-compra-itemcompra/:id' element={<CompraItem />} />
          <Route path='/listar-produto-itemcompra/:id' element={<ProdutoItem />} />

          {/* Produto */}

          <Route path='/cadastrar-produto' element={<CadastrarProduto />} />
          <Route path='/listar-produto' element={<ListarProduto />} />
          <Route path='/editar-produto/:id' element={<EditarProduto />} />
          <Route path='/listar-itemcompras-produto/:id' element={<ItemProduto />} />   
        </Switch>
      </Router>
    </div>
  );
}

export default App;