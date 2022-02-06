import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const CompraCliente = () => {

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
        const getCompra = async () => {
            await axios.get(api + '/cliente/' + idd + '/compras')
                .then((response) => {
                    console.log(response.data.compra);
                    setData(response.data.compra);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.'
                    })
                    //console.log('Erro: sem conexão com a API.')
                });
        };
        getCompra();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Compras do cliente {idd}</h1>
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
                            <th>Data da compra</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compra => (
                            <tr key={compra.ClienteId}>
                                <td>{compra.id}</td>
                                <td>{compra.data}</td>
                                <td className='text-center/'>
                                    <Link to={'/listar-itemcompras-compra/' + compra.id}
                                        className='btn btn-outline-primary btn-sm m-1'>Itens comprados</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};