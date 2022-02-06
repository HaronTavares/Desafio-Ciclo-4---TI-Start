import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { api } from '../../../config';

export const EditarCliente = () => {

    // const [data, setData] = useState([]);

    const { id } = useParams();
    const [idd] = useState(Number(id));

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/atualizacliente', { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            await axios.get(api + '/cliente/' + idd)
                .then((response) => {
                    setNome(response.data.cliente.nome);
                    setEndereco(response.data.cliente.endereco);
                    setCidade(response.data.cliente.cidade);
                    setUf(response.data.cliente.uf);
                    setNascimento(response.data.cliente.nascimento);
                    setClienteDesde(response.data.cliente.clienteDesde);
                })
                .catch(() => {
                    console.log('Erro: Não foi possível conectar a API.')
                })
        };
        getCliente();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Editar cliente</h1>
                    </div>

                    <div className='p-2'>
                        <Link to='/listar-cliente'
                            className='btn btn-outline-success btn-sm mr-1'>Clientes</Link>
                    </div>
                </div>

                <hr className='m-1' />

                {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

                {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

                <Form className='p-2' onSubmit={edtCliente}>
                    <FormGroup className='p-2'>
                        <Label>Nome</Label>
                        <Input type='text' name='nome'
                            placeholder='Nome do cliente' value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Endereço</Label>
                        <Input type='text' name='endereco'
                            placeholder='Endereço do cliente' value={endereco}
                            onChange={e => setEndereco(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Cidade</Label>
                        <Input type='text' name='cidade'
                            placeholder='Cidade do cliente' value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>UF</Label>
                        <Input type='text' name='uf'
                            placeholder='Estado do cliente' value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Data de nascimento</Label>
                        <Input type='date' name='nascimento'
                            placeholder='MM/DD/AAAA' value={nascimento}
                            onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Cliente Desde</Label>
                        <Input type='date' name='clienteDesde'
                            placeholder='MM/DD/AAAA' value={clienteDesde}
                            onChange={e => setClienteDesde(e.target.value)} />
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