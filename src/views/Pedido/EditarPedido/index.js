import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { api } from '../../../config';

export const EditarPedido = () => {

    // const [data, setData] = useState([]);

    const { id } = useParams();
    const [idd] = useState(Number(id));

    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/atualizapedido', { data, ClienteId }, { headers })
            .then((response) => {
                // console.log(response.data.error);
                // console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        formSave: false,
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        formSave: false,
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível conectar a API.'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + '/pedidos/' + idd)
                .then((response) => {
                    setData(response.data.pedido.data);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    console.log('Erro: Não foi possível conectar a API.')
                })
        };
        getPedido();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Editar pedido</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/listar-pedido'
                            className='btn btn-outline-success btn-sm mr-1'>Pedidos</Link>
                    </div>
                </div>

                <hr className='m-1' />

                {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

                {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

                <Form className='p-2' onSubmit={edtPedido}>
                    <FormGroup className='p-2'>
                        <Label>Data do pedido</Label>
                        <Input type='date' name='date'
                            value={data}
                            onChange={e => setData(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Id do cliente</Label>
                        <Input type='text' name='ClienteId'
                            placeholder='Id do cliente' value={ClienteId}
                            onChange={e => setClienteId(e.target.value)} />
                    </FormGroup>

                    {status.formSave ?
                        <Button type='submit' outline color='warning' disabled>Salvando...
                            <Spinner size='sm' color='warning' /></Button> :
                        <Button type='submit' outline color='warning'>Salvar</Button>}
                </Form>
            </Container>
        </div>
    )
}