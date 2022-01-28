import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Home</h1>
                    </div>
                </div>
                <div className='p-2'>
                    <a href="/listar-cliente" className="btn btn-success btn-sm" >Cliente</a>
                    <a href="/listar-pedido" className="btn btn-success btn-sm" >Pedido</a>
                    <a href="/listar-servico" className="btn btn-success btn-sm" >Servico</a>
                </div>
            </Container>
        </div>
    );
};