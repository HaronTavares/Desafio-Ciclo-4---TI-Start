import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ItemCompra = () => {

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
        const getItem = async () => {
            await axios.get(api + '/compra/' + idd + '/compras')
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
                        <h1>Itens comprados da compra {idd}</h1>
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
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className='text-center/'>
                                    <Link to={'/listar-produto-itemcompra/' + item.ProdutoId}
                                        className='btn btn-outline-primary btn-sm m-1'>Consultar Produto</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};