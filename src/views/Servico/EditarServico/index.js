import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { api } from '../../../config';

export const EditarServico = () => {

    // const [data, setData] = useState([]);

    const { id } = useParams();
    const [idd] = useState(Number(id));

    const navegar = useNavigate();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + '/atualizaservico', { id, nome, descricao }, { headers })
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
        const getServico = async () => {
            await axios.get(api + '/servico/' + idd)
                .then((response) => {
                    // console.log(response.data.servico);
                    setNome(response.data.servico.nome);
                    setDescricao(response.data.servico.descricao);
                    
                })
                .catch(() => {
                    console.log('Erro: Não foi possível conectar a API.')
                })
        };
        getServico();
    }, [idd]);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className='m-auto p-2'>
                        <h1>Editar serviço</h1>
                    </div>

                    <div className='p-2'>
                        <Button className='btn btn-outline-secondary btn-sm mr-1' type='button' outline
                            onClick={() => navegar(-1)}>Voltar</Button>
                    </div>
                </div>

                <hr className='m-1' />

                {status.type === 'error' ? <Alert color='danger'>{status.message}</Alert> : ''}

                {status.type === 'success' ? <Alert color='success'>{status.message}</Alert> : ''}

                <Form className='p-2' onSubmit={edtServico}>
                    <FormGroup className='p-2'>
                        <Label>Nome</Label>
                        <Input type='text' name='nome'
                            placeholder='Nome do serviço' value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='p-2'>
                        <Label>Descrição</Label>
                        <Input type='text' name='descricao'
                            placeholder='Descrição do serviço' value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
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