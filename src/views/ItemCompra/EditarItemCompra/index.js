import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { api } from '../../../config';

export const EditarItemCompra = () => {

    // const [data, setData] = useState([]);

    const { id } = useParams();
    const [idd] = useState(Number(id));

    const navegar = useNavigate();

    console.log(idd);

    const [ProdutoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');


    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/compras/' + idd + '/atualizaitem', { ProdutoId, quantidade, valor }, { headers })
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
        const getItemCompra = async () => {
            await axios.get(api + '/compras/' + idd + '/itemcompras')
                .then((response) => {
                    setProdutoId(response.data.itemcompra.ProdutoId);
                    setQuantidade(response.data.itemcompra.quantidade);
                    setValor(response.data.itemcompra.valor);
                })
                .catch(() => {
                    console.log('Erro: Não foi possível conectar a API.')
                })
        };
        getItemCompra();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Editar item comprado</h1>
                    </div>

                    <div className='p-2'>
                        <Button className='btn btn-outline-secondary btn-sm mr-1' type='button' outline
                            onClick={() => navegar(-1)}>Voltar</Button>
                    </div>
                </div>

                <hr className='m-1' />

                {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

                {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

                <Form className='p-2' onSubmit={edtItemCompra}>
                    <FormGroup className='p-2'>
                        <Label>Insira o produto do item a ser editado</Label>
                        <Input type='text' name='ProdutoId'
                            placeholder='ID do produto' value={ProdutoId}
                            onChange={e => setProdutoId(e.target.value)} />
                    </FormGroup>
                </Form>

                <hr className='m-1' />

                <Form className='p-2' onSubmit={edtItemCompra}>
                    <FormGroup className='p-2'>
                        <Label>Quantidade</Label>
                        <Input type='text' name='quantidade'
                            placeholder='Quantidade do item comprado' value={quantidade}
                            onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Valor</Label>
                        <Input type='text' name='valor'
                            placeholder='Valor do item comprado' value={valor}
                            onChange={e => setValor(e.target.value)} />
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