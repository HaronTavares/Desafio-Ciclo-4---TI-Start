import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Home</h1>
                    </div>
                    <div className='p-2'>
                        <a href="/listar-cliente" className="btn btn-success btn-sm" >Clientes</a>
                    </div>
                    <div className='p-2'>
                        <a href="/listar-pedido" className="btn btn-success btn-sm" >Pedidos</a>
                    </div>
                    <div className='p-2'>
                        <a href="/listar-itempedido" className="btn btn-success btn-sm" >Itens Pedidos</a>
                    </div>
                    <div className='p-2'>
                        <a href="/listar-servico" className="btn btn-success btn-sm" >Serviços</a>
                    </div>
                </div>
            </Container>
        </div>
    );
};