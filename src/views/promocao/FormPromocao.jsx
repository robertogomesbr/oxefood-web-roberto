import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormPromocao() {
    
    const { state } = useLocation();
    const [idPromocao, setIdPromocao] = useState();
    const [titulo, setTitulo] = useState();
    const [dataInicio, setDataInicio] = useState();
    const [dataFim, setDataFim] = useState();
    const [regra, setRegra] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [promoValida, setPromoValida] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/promocao/" + state.id)
                .then((response) => {
                    setIdPromocao(response.data.idPromocao)
                    setTitulo(response.data.titulo)
                    setDataInicio(formatarData(response.data.dataInicio))
                    setDataFim(formatarData(response.data.dataFim))
                    setRegra(response.data.regra)
                    setValorDesconto(response.data.valorDesconto)
                    setPromoValida(response.data.promoValida)
                })
        }
    }, [state])

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {

        let promocaoRequest = {
            titulo: titulo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            regra: regra,
            valorDesconto: valorDesconto,
            promoValida: promoValida
        }

        if (idPromocao != null) { //Alteração:
            axios.put("http://localhost:8080/api/promocao/" + idPromocao, promocaoRequest)
                .then((response) => { notifySuccess('Promocao alterado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }
                })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/promocao", promocaoRequest)
                .then((response) => { notifySuccess('Promocao cadastrado com sucesso.') })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }
                })
        }

    }

    return (

        <div>

            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>

                <Container  textAlign='justified' >

                    {idPromocao === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Promocao &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idPromocao != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Promocao &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>                          

                            <Form.Input 
                                required
                                fluid
                                label='Título'
                                placeholder="Informe o título da promoção"
                                maxLength="100"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                            />

                            <Form.TextArea 
                                fluid
                                label='Regra'
                                value={regra}
                                onChange={e => setRegra(e.target.value)}
                            />

                            <Form.Group widths='equal'>

                                <Form.Input 
                                    fluid
                                    label='Valor Desconto (R$)'
                                    value={valorDesconto}
                                    onChange={e => setValorDesconto(e.target.value)}
                                />
                                
                                <Form.Input 
                                    required
                                    fluid
                                    label='A partir de'
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/2022 12:00:00"
                                        value={dataInicio}
                                        onChange={e => setDataInicio(e.target.value)}
                                    />                            
                                </Form.Input>

                                <Form.Input 
                                    required
                                    fluid
                                    label='Terminando em'                                    
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/2022 18:00:00"
                                        value={dataFim}
                                        onChange={e => setDataFim(e.target.value)}
                                    />                            
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-promocao'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>

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

    )
}