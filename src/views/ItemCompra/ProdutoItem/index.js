import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ProdutoItem = () => {

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
        const getProduto = async () => {
            await axios.get(api + '/itemcompra/' + idd + '/produto')
                .then((response) => {
                    console.log(response.data.produto);
                    setData(response.data.produto);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                    //console.log('Erro: sem conexão com a API.')
                });
        };
        getProduto();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Produto do item</h1>
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
                            <th>Nome do produto</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};