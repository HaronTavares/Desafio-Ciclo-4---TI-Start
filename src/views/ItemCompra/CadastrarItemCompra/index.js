import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarItemCompra = () => {

    const [itemcompra, setItemCompra] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemCompra({
        ...itemcompra, [e.target.name]: e.target.value
    });

    const cadItemCompra = async e => {
        e.preventDefault();
        console.log(itemcompra);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + '/itemcompras', itemcompra, { headers })
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
                    <h1>Cadastrar Item Comprado</h1>
                </div>
                <div className='p-2'>
                    <Link to='/listar-itemcompra'
                        className='btn btn-outline-success btn-sm'>Itens Comprados</Link>
                </div>
            </div>

            <hr className='m-1' />

            {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

            {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

            <Form className='p-2' onSubmit={cadItemCompra}>
                <FormGroup className='p-2'>
                    <Label>ID da compra</Label>
                    <Input type="text" name="CompraId" placeholder="ID da compra"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>ID do produto</Label>
                    <Input type="text" name="ProdutoId" placeholder="ID do produto"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade do item comprado"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className='p-2'>
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do item comprado"
                        onChange={valorInput} />
                </FormGroup>

                <Button type='submit' outline color='success'>Cadastrar</Button>
                <Button type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>
    );
};