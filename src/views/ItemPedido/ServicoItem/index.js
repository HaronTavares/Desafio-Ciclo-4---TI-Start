import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ServicoItem = () => {

    const [data, setData] = useState([]);

    const navegar = useNavigate();

    const { id } = useParams();
    console.log(Number(id));
    const [idd, /*setId*/] = useState(Number(id));

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + '/itempedido/' + idd + '/servico')
                .then((response) => {
                    console.log(response.data.servico);
                    setData(response.data.servico);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                    //console.log('Erro: sem conexão com a API.')
                });
        };
        getServico();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Serviço do item</h1>
                    </div>

                    <div className='p-2'>
                        <Button className='btn btn-outline-secondary btn-sm mr-1' type='button' outline
                            onClick={() => navegar(-1)}>Voltar</Button>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color='danger'> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do serviço</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(servico => (
                            <tr key={servico.id}>
                                <td>{servico.id}</td>
                                <td>{servico.nome}</td>
                                <td>{servico.descricao}</td>
                                {/* <td className='text-center/'>
                                    <Link to={'/listar-itempedidos-pedido/' + pedido.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Itens</Link>
                                    <Link to={'/editar-pedido/' + pedido.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Editar</Link>
                                    <span className='btn btn-outline-danger btn-sm mr-1 m-1'
                                        onClick={() => apagarPedido(pedido.id)}>Excluir</span>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};