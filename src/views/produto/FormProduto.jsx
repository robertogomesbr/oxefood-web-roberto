import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon, TextArea } from "semantic-ui-react";

export default function FormProduto () {
    
    return (

        <div>

            <div style={{margin: '3%'}}>

                <Container textAlign="justified">

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    width={10}
                                    maxLength="50"
                                    placeholder="Informe o título do produto"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder="Informe o código do produto"
                                    width={6}
                                />

                            </Form.Group>

                            <Form.TextArea
                                fluid
                                label='Descrição'
                                placeholder="Informe a descrição do produto"
                            />

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                />

                                <Form.Input 
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder="30"
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder="40"
                                />

                            </Form.Group>

                        </Form>

                        <div style={{marginTop: '4%'}}>

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

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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