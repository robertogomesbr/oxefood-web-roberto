import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormProduto() {

    const {state} = useLocation();
    const [idCategoriaProduto, setIdCategoriaProduto] = useState();
    const [descricao, setDescricao] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoriaProduto(response.data.id)
                    setDescricao(response.data.descricao)
                })
        }
    }, [state])

    function salvar () {

        let categoriaProdutoRequest = {
            descricao: descricao
        }

        if (idCategoriaProduto != null) {
            axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
                .then((response) => { notifySuccess("Categoria de produto alterado com sucesso.") })
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }
                })
        } else {
            axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { notifySuccess("Categoria de produto cadastrado com sucesso.") })
                .catch((error) => {
                    if (error.response.data.errors !== undefined) {
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
            <MenuSistema tela={'categoria-produto'}/>

            <div style={{ margin: '3%' }}>

                <Container textAlign="justified">

                    {idCategoriaProduto === undefined &&
                        <h2> <span style={{ color: "darkgray" }}> Categoria Produto &nbsp; <Icon name="angle double right" size="small" /> </span> Cadastro </h2>
                    }
                    {idCategoriaProduto !== undefined &&
                        <h2> <span style={{ color: "darkgray" }}> Categoria Produto &nbsp; <Icon name="angle double right" size="small" /> </span> </h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    width={16}
                                    maxLength="50"
                                    placeholder="Informe a descrição da categoria"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-categoria-produto'}>
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