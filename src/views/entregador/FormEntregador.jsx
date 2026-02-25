import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon, Radio, Select } from 'semantic-ui-react';

export default function FormEntregador () {

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

    return (

        <div>

            <div style={{marginTop:'3%'}}>

                <Container textAlign='justified'>

                    <h2> <span style={{color:'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size='small'/> </span> Cadastro</h2>

                    <Divider />

                    <div style={{marginTop:'4%'}}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid                                   
                                    label='Nome'
                                    width={8}
                                />

                                <Form.Input
                                    required
                                    fluid                                   
                                    label='CPF'
                                    width={4}
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={4}
                                >
                                    <InputMask
                                        required
                                        mask="99.999.999-9"
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group widths={'equal'}>

                                <Form.Input 
                                    fluid
                                    label='DT Nascimento'
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985" 
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                >
                                    <InputMask
                                        mask="(99) 9999-9999"
                                    />
                                </Form.Input>

                                <Form.Input 
                                    fluid
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        mask="(99) 9999-9999"
                                    />
                                </Form.Input>

                                <Form.Input 
                                    fluid
                                    label='QTD Entregas Realizadas'
                                />

                                <Form.Input 
                                    fluid
                                    label='Valor Por Frete'
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={12}
                                    maxLength="100"
                                />

                                <Form.Input 
                                    fluid                                   
                                    label='Número'
                                    width={4}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input 
                                    fluid
                                    label='Bairro'
                                    width={8}
                                />

                                <Form.Input 
                                    fluid
                                    label='Cidade'
                                    width={8}
                                />

                                <Form.Input 
                                    fluid
                                    label='CEP'
                                    width={2}
                                >
                                    <InputMask
                                        mask="99999-999"
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
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                />

                            </Form.Group>

                            <Form.Group inline>
                                <label>Ativo:</label>

                                <Form.Radio
                                    label='Sim'
                                    value='sim'
                                    name='ativo'
                                />

                                <Form.Radio
                                    label='Não'
                                    value='nao'
                                    name='ativo'
                                />
                            </Form.Group>

                        </Form>

                        <div style={{marginTop:'4%'}}>

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