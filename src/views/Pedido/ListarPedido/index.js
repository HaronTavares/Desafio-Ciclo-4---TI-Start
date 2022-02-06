import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + '/listapedidos')
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/excluirpedido/' + idPedido, { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos pedidos</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-pedido'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do pedido</th>
                            <th>ID do cliente</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>
                                <td className='text-center/'>
                                    <Link to={'/listar-pedidos-pedidos/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Itens</Link>
                                    <Link to={'/editar-pedido/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarPedido(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};