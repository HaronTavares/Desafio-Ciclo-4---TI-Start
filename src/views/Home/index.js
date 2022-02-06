import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className='d-flex justify-content-center p-3'>
                    <div>
                        <h1>Home</h1>
                    </div>
                </div>
            </Container>
            <Container>
                <div className='d-flex row justify-content-center'>
                    <div className='w-40'>
                        <h4 className='d-flex justify-content-center p-2'>Seja Bem vindo(a) ao site da TI Academy!</h4>
                        <div className='m-4'></div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='w-25'>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de clientes cadastrados</h6>
                            </div>
                            <div className='p-1'></div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de pedidos registrados</h6>
                            </div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de items pedidos</h6>
                            </div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de serviços ofertados</h6>
                            </div>
                            <div className='p-1'></div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de compras registradas</h6>
                            </div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de items comprados</h6>
                            </div>
                            <div className='d-flex justify-content-between m-4'>
                                <h6 className=''>Acessar lista de produtos ofertados</h6>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-cliente" className="btn btn-success btn-sm flex-fill" >Clientes</a>
                            </div>
                            <div className='p-3'></div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-pedido" className="btn btn-primary btn-sm flex-fill" >Pedidos</a>
                            </div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-itempedido" className="btn btn-primary btn-sm flex-fill" >Itens Pedidos</a>
                            </div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-servico" className="btn btn-primary btn-sm flex-fill" >Serviços</a>
                            </div>
                            <div className='p-3'></div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-compra" className="btn btn-danger btn-sm flex-fill" >Compras</a>
                            </div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-itemcompra" className="btn btn-danger btn-sm flex-fill" >Itens Comprados</a>
                            </div>
                            <div className='d-flex justify-content-center m-3'>
                                <a href="/listar-produto" className="btn btn-danger btn-sm flex-fill" >Produtos</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};