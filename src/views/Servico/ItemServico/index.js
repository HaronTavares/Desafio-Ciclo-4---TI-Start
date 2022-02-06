import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ItemServico = () => {

    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log(Number(id));
const [idd, /*setId*/] = useState(Number(id));

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getItem = async () => {
            await axios.get(api + '/servico/' + idd + '/pedidos')
                .then((response) => {
                    console.log(response.data.item);
                    setData(response.data.item);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                    //console.log('Erro: sem conexão com a API.')
                });
        };
        getItem();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Itens pedidos do serviço {idd}</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/listar-servico'
                            className='btn btn-outline-success btn-sm mr-1'>Serviços</Link>
                        {/* <Link to={'/servico/' + idd}
                            className='btn btn-outline-primary btn-sm mr-1'>Consultar</Link> */}
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className='text-center/'>
                                    <Link to={'/listar-pedido/'}
                                        className='btn btn-outline-primary btn-sm'>
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};