import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + '/listaservicos')
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log('Erro: sem conexão com a API.')
            });
    };

    const apagarServico = async (idServico) => {
        console.log(idServico);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + '/excluirservico/' + idServico, { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar a API.'
                })
            });
    };

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Visualizar informações dos serviços</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/cadastrar-servico'
                            className='btn btn-outline-success btn-sm'>Cadastrar</Link>
                        {/* <Link to={'/servico/' + idd}
                            className='btn btn-outline-primary btn-sm mr-1'>Consultar</Link>*/}
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
                                    <Link to={'/listar-itempedidos-servico/' + item.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Itens</Link>
                                    <Link to={'/editar-servico/' + item.id}
                                        className='btn btn-outline-secondary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarServico(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};