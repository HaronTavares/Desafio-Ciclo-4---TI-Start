import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const PedidoCliente = () => {

    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log(Number(id));
    const [idd, /*setId*/] = useState(Number(id));

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + '/cliente/' + idd + '/pedidos')
                .then((response) => {
                    console.log(response.data.pedido);
                    setData(response.data.pedido);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                    //console.log('Erro: sem conexão com a API.')
                });
        };
        getPedido();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Pedidos do cliente {idd}</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/listar-cliente'
                            className='btn btn-outline-success btn-sm mr-1'>Clientes</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do pedido</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedido => (
                            <tr key={pedido.ClienteId}>
                                <td>{pedido.id}</td>
                                <td>{pedido.data}</td>
                                <td className='text-center/'>
                                    <Link to={'/listar-itempedidos-pedido/' + pedido.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Itens</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};