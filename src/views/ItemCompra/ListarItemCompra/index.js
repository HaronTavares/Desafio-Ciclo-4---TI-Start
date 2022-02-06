import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarItemCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemCompras = async () => {
        await axios.get(api + '/listaitemcompras')
            .then((response) => {
                console.log(response.data.itemcompras);
                setData(response.data.itemcompras);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarItemCompra = async (CompraId, ProdutoId) => {
        console.log(CompraId);
        console.log(ProdutoId);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/compra/' + CompraId + '/produto/' + ProdutoId + '/excluiritemcompra', { headers })
            .then((response) => {
                console.log(response.data.error);
                getItemCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getItemCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos itens comprados</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-itemcompra'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID da Compra</th>
                            <th>ID do Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className='d-flex justify-content-center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className='text-center/ d-flex justify-content-center'>
                                    <Link to={'/listar-compra-itemcompra/' + item.CompraId}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Compra</Link>
                                    <Link to={'/listar-produto-itemcompra/' + item.ProdutoId}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Produto</Link>
                                    <Link to={'/editar-itemcompra/' + item.CompraId}
                                        className='btn btn-outline-secondary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarItemCompra(item.CompraId, item.ProdutoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};