import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { api } from '../../../config';

export const EditarCompra = () => {

    // const [data, setData] = useState([]);

    const { id } = useParams();
    const [idd] = useState(Number(id));

    const navegar = useNavigate();

    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/atualizacompra', { id, data, ClienteId }, { headers })
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
        const getCompra = async () => {
            await axios.get(api + '/compras/' + idd)
                .then((response) => {
                    setData(response.data.compra.data);
                    setClienteId(response.data.compra.ClienteId);
                })
                .catch(() => {
                    console.log('Erro: Não foi possível conectar a API.')
                })
        };
        getCompra();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Editar compra</h1>
                    </div>

                    <div className='p-2'>
                        <Button className='btn btn-outline-secondary btn-sm mr-1' type='button' outline
                            onClick={() => navegar(-1)}>Voltar</Button>
                    </div>
                </div>

                <hr className='m-1' />

                {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

                {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

                <Form className='p-2' onSubmit={edtCompra}>
                    <FormGroup className='p-2'>
                        <Label>Data da compra</Label>
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