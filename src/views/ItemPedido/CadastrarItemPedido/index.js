import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarItemPedido = () => {

    const [itempedido, setItemPedido] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({
        ...itempedido, [e.target.name]: e.target.value
    });

    const cadItemPedido = async e => {
        e.preventDefault();
        console.log(itempedido);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + '/itempedidos', itempedido, { headers })
            .then((response) => {
                // console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                console.log('Erro: Sem conexão com a API.');
            });
    };

    return (
        <Container>
            <div className='d-flex'>
                <div className='m-auto p-2'>
                    <h1>Cadastrar Item Pedido</h1>
                </div>
                <div className='p-2'>
                    <Link to='/listar-itempedido'
                        className='btn btn-outline-success btn-sm'>Itens Pedidos</Link>
                </div>
            </div>

            <hr className='m-1' />

            {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

            {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

            <Form className='p-2' onSubmit={cadItemPedido}>
                <FormGroup className='p-2'>
                    <Label>ID do pedido</Label>
                    <Input type="text" name="PedidoId" placeholder="ID do pedido"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>ID do serviço</Label>
                    <Input type="text" name="ServicoId" placeholder="ID do serviço"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade do item pedido"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do item pedido"
                        onChange={valorInput} />
                </FormGroup>

                <Button type='submit' outline color='success'>Cadastrar</Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};