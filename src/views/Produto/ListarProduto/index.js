import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + '/listaprodutos')
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarProduto = async (idProduto) => {
        console.log(idProduto);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/excluirproduto/' + idProduto, { headers })
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos produtos</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-produto'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className='d-flex justify-content-center'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className='text-center/ d-flex justify-content-center'>
                                    <Link to={'/listar-itemcompras-produto/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Itens</Link>
                                    <Link to={'/editar-produto/' + item.id}
                                        className='btn btn-outline-secondary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarProduto(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};