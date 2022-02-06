import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + '/listaclientes')
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarCliente = async (idCliente) => {
        console.log(idCliente);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/excluircliente/' + idCliente, { headers })
            .then((response) => {
                console.log(response.data.error);
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos clientes</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-cliente'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente Desde</th>
                            <th className='d-flex justify-content-center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.clienteDesde}</td>
                                <td className='text-center/ d-flex justify-content-center'>
                                    <Link to={'/listar-pedidos-cliente/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Pedidos</Link>
                                    <Link to={'/listar-compras-cliente/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Compras</Link>
                                    <Link to={'/editar-cliente/' + item.id}
                                        className='btn btn-outline-secondary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarCliente(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};