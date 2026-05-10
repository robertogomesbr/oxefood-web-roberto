import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormEnderecoCliente() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [idEndereco, setIdEndereco] = useState();
    const [idCliente, setIdCliente] = useState();
    const opcoesEstados = [
        { key: 'AC', text: 'Acre', value: 'AC' },
        { key: 'AL', text: 'Alagoas', value: 'AL' },
        { key: 'AP', text: 'Amapá', value: 'AP' },
        { key: 'AM', text: 'Amazonas', value: 'AM' },
        { key: 'BA', text: 'Bahia', value: 'BA' },
        { key: 'CE', text: 'Ceará', value: 'CE' },
        { key: 'DF', text: 'Distrito Federal', value: 'DF' },
        { key: 'ES', text: 'Espírito Santo', value: 'ES' },
        { key: 'GO', text: 'Goiás', value: 'GO' },
        { key: 'MA', text: 'Maranhão', value: 'MA' },
        { key: 'MT', text: 'Mato Grosso', value: 'MT' },
        { key: 'MS', text: 'Mato Grosso do Sul', value: 'MS' },
        { key: 'MG', text: 'Minas Gerais', value: 'MG' },
        { key: 'PA', text: 'Pará', value: 'PA' },
        { key: 'PB', text: 'Paraíba', value: 'PB' },
        { key: 'PR', text: 'Paraná', value: 'PR' },
        { key: 'PE', text: 'Pernambuco', value: 'PE' },
        { key: 'PI', text: 'Piauí', value: 'PI' },
        { key: 'RJ', text: 'Rio de Janeiro', value: 'RJ' },
        { key: 'RN', text: 'Rio Grande do Norte', value: 'RN' },
        { key: 'RS', text: 'Rio Grande do Sul', value: 'RS' },
        { key: 'RO', text: 'Rondônia', value: 'RO' },
        { key: 'RR', text: 'Roraima', value: 'RR' },
        { key: 'SC', text: 'Santa Catarina', value: 'SC' },
        { key: 'SP', text: 'São Paulo', value: 'SP' },
        { key: 'SE', text: 'Sergipe', value: 'SE' },
        { key: 'TO', text: 'Tocantins', value: 'TO' },
    ]
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState()
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoUf, setEnderecoUf] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {

            axios.get("http://localhost:8080/api/cliente/" + state.clienteId)
                .then((response) => {

                    const endereco = response.data.enderecos.find(e => e.id === state.id);

                    if (endereco) {
                        setIdEndereco(endereco.id);
                        setIdCliente(response.data.id);

                        setEnderecoRua(endereco.rua);
                        setEnderecoNumero(endereco.numero);
                        setEnderecoBairro(endereco.bairro);
                        setEnderecoCidade(endereco.cidade);
                        setEnderecoCep(endereco.cep);
                        setEnderecoComplemento(endereco.complemento);
                        setEnderecoUf(endereco.estado);
                    }
                })
        }

        if (state != null && state.clienteId != null && state.id == null) {
            setIdCliente(state.clienteId);
        }

    }, [state])

    function salvar() {

        let enderecoRequest = {
            rua: enderecoRua,
            numero: enderecoNumero,
            bairro: enderecoBairro,
            cidade: enderecoCidade,
            cep: enderecoCep,
            complemento: enderecoComplemento,
            estado: enderecoUf
        }

        if (idEndereco != null) {

            axios.put("http://localhost:8080/api/cliente/endereco/" + idEndereco, enderecoRequest)
                .then(() => { notifySuccess('Endereço alterado com sucesso.') })
                .catch((error) => {
                    if (error.response?.data?.errors) {
                        error.response.data.errors.forEach(e => notifyError(e.defaultMessage))
                    } else {
                        notifyError(error.response?.data?.message)
                    }
                })
        }

        else {

            axios.post("http://localhost:8080/api/cliente/endereco/" + idCliente, enderecoRequest)
                .then(() => { notifySuccess('Endereço cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response?.data?.errors) {
                        error.response.data.errors.forEach(e => notifyError(e.defaultMessage))
                    } else {
                        notifyError(error.response?.data?.message)
                    }
                })
        }

    }

    function voltar() {

        if (idEndereco != null) {

            navigate('/list-endereco-cliente', {
                state: { id: idCliente }
            });

        }

        else {
            navigate('/list-cliente');
        }
    }

    return (

        <div>

            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idEndereco == null &&
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Endereço &nbsp;
                                <Icon name='angle double right' size="small" />
                            </span>
                            Cadastro
                        </h2>
                    }

                    {idEndereco != null &&
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Endereço &nbsp;
                                <Icon name='angle double right' size="small" />
                            </span>
                            Alteração
                        </h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={12}
                                    maxLength="100"
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={8}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={8}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={2}
                                >
                                    <InputMask
                                        mask="99999-999"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Select
                                    fluid
                                    label='UF'
                                    width={16}
                                    options={opcoesEstados}
                                    placeholder='Selecione'
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}
                                />

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={voltar}
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
