import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoDeEntregaMinimo, setTempoDeEntregaMinimo] = useState();
    const [tempoDeEntregaMaximo, setTempoDeEntregaMaximo] = useState();
    
    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
            .then((response) => {
                setIdProduto(response.data.id)
                setTitulo(response.data.titulo)
                setCodigo(response.data.codigo)
                setDescricao(response.data.descricao)
                setValorUnitario(response.data.valorUnitario)
                setTempoDeEntregaMinimo(response.data.tempoDeEntregaMinimo)
                setTempoDeEntregaMaximo(response.data.tempoDeEntregaMaximo)
            })
        }
    }, [state])

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoDeEntregaMinimo: tempoDeEntregaMinimo,
            tempoDeEntregaMaximo: tempoDeEntregaMaximo
        }

        if (idProduto != null) {
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
            .then((response) => { console.log("Produto alterado com sucesso.") })
            .catch((error) => { console.log("Erro ao alterar um produto.") })
        } else {
            axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => { console.log("Produto cadastrado com sucesso.") })
            .catch((error) => { console.log("Erro ao incluir um produto.") })
        }
    }

    return (

        <div>

            <MenuSistema tela={'produto'} />

            <div style={{ margin: '3%' }}>

                <Container textAlign="justified">

                    { idProduto === undefined &&
                        <h2> <span style={{color: "darkgray"}}> Produto &nbsp; <Icon name="angle double right" size="small"/> </span> Cadastro</h2>
                    }
                    { idProduto != undefined &&
                        <h2> <span style={{color: "darkgray"}}> Produto &nbsp; <Icon name="angle double right" size="small"/> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    width={10}
                                    maxLength="50"
                                    placeholder="Informe o título do produto"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder="Informe o código do produto"
                                    width={6}
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />

                            </Form.Group>

                            <Form.TextArea
                                fluid
                                label='Descrição'
                                placeholder="Informe a descrição do produto"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder="30"
                                    value={tempoDeEntregaMinimo}
                                    onChange={e => setTempoDeEntregaMinimo(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder="40"
                                    value={tempoDeEntregaMaximo}
                                    onChange={e => setTempoDeEntregaMaximo(e.target.value)}
                                />

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-produto'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Listar
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