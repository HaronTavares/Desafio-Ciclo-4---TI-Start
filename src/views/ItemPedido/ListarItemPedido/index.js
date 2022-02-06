import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarItemPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemPedidos = async () => {
        await axios.get(api + '/listaitempedidos')
            .then((response) => {
                console.log(response.data.itempedidos);
                setData(response.data.itempedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarItemPedido = async (PedidoId, ServicoId) => {
        console.log(PedidoId);
        console.log(ServicoId);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/pedido/' + PedidoId + '/servico/' + ServicoId + '/excluiritempedido', { headers })
            .then((response) => {
                console.log(response.data.error);
                getItemPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getItemPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos itens pedidos</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-itempedido'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>ID do Serviço</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className='d-flex justify-content-center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className='text-center/ d-flex justify-content-center'>
                                    <Link to={'/listar-pedido-itempedido/' + item.PedidoId}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Pedido</Link>
                                    <Link to={'/listar-servico-itempedido/' + item.ServicoId}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Serviço</Link>
                                    <Link to={'/editar-itempedido/' + item.PedidoId}
                                        className='btn btn-outline-secondary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarItemPedido(item.PedidoId, item.ServicoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};