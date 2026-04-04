import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, Container, Divider, Header, Icon, Modal,
    ModalActions,
    ModalContent,
    Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [dadosModal, setDadosModal] = useState(false);
    const [entregadorSelecionado, setEntregadorSelecionado] = useState();

    useEffect(() => {
        carregarLista()
    }, [])

    function carregarLista() {
        axios.get('http://localhost:8080/api/entregador')
            .then((response) => {
                setLista(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                notifySuccess('Entregador removido com sucesso.')

                axios.get('http://localhost:8080/api/entregador')
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                if (error.response.data.errors !== undefined) {
                    for (let i = 0; i < error.response.data.errors.length; i++) {
                        notifyError(error.response.data.errors[i].defaultMessage)
                    }
                } else {
                    notifyError(error.response.data.message)
                }
            })
        setOpenModal(false)
    }

    function exibirDados(id) {
        axios.get('http://localhost:8080/api/entregador/' + id)
            .then((response) => {
                setEntregadorSelecionado(response.data)
                setDadosModal(true)
            })
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

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated="right"
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>QTD Entregas Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor por Frete</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map((entregador) => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                        <Table.Cell>{entregador.ativo ? "Sim" : "Não"}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to={"/form-entregador"} state={{ id: entregador.id }} style={{ color: "green" }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color="blue"
                                                title='Clique aqui para visualizar todos os dados deste entregador'
                                                icon
                                                onClick={e => exibirDados(entregador.id)}>
                                                <Icon name="eye" />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>

                                ))}

                            </Table.Body>

                        </Table>

                    </div>

                </Container>

            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header>
                    <Icon name="trash" />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                closeIcon
                open={dadosModal}
                onClose={() => setDadosModal(false)}
                onOpen={() => setDadosModal(true)}
            >
                <Header icon='book' content='Dados do Entregador' />
                <ModalContent>
                    {entregadorSelecionado && (

                    <Modal.Content style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
                        <p style={{ color: 'black' }}>Nome: {entregadorSelecionado.nome}</p>
                        <p style={{ color: 'black' }}>Cpf: {entregadorSelecionado.cpf}</p>
                        <p style={{ color: 'black' }}>Rg: {entregadorSelecionado.rg}</p>
                        <p style={{ color: 'black' }}>Data Nascimento: {formatarData(entregadorSelecionado.dataNascimento)}</p>
                        <p style={{ color: 'black' }}>Telefone Celular: {entregadorSelecionado.foneCelular}</p>
                        <p style={{ color: 'black' }}>Telefone Fixo: {entregadorSelecionado.foneFixo}</p>
                        <p style={{ color: 'black' }}>Quantidade de Entregas Realizadas: {entregadorSelecionado.qtdEntregasRealizadas}</p>
                        <p style={{ color: 'black' }}>Valor do Frete: {entregadorSelecionado.valorFrete}</p>
                        <p style={{ color: 'black' }}>Rua: {entregadorSelecionado.enderecoRua}</p>
                        <p style={{ color: 'black' }}>Complemento: {entregadorSelecionado.enderecoComplemento}</p>
                        <p style={{ color: 'black' }}>Número: {entregadorSelecionado.enderecoNumero}</p>
                        <p style={{ color: 'black' }}>Bairro: {entregadorSelecionado.enderecoBairro}</p>
                        <p style={{ color: 'black' }}>Cep: {entregadorSelecionado.enderecoCep}</p>
                        <p style={{ color: 'black' }}>Uf: {entregadorSelecionado.enderecoUf}</p>
                        <p style={{ color: 'black' }}>Ativo: {entregadorSelecionado.ativo ? "Sim" : "Não"}</p>
                    </Modal.Content>
                )}
                </ModalContent>
                <ModalActions>
                    <Button color='#5e5e5e' onClick={() => setDadosModal(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>
                </ModalActions>
            </Modal>



        </div>
    )
}