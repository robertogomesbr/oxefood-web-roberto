import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Button, Container, Divider, Header, Icon, Modal,
    Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListEnderecoCliente() {

    const { state } = useLocation();

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    useEffect(() => {
        carregarLista()
    }, [])

    function carregarLista() {
        axios.get('http://localhost:8080/api/cliente/' + state.id)
            .then((response) => {

                const cliente = response.data;

                const enderecos = cliente.enderecos.map(endereco => ({
                    ...endereco,
                    clienteId: cliente.id
                }));

                setLista(enderecos);
            })
            .catch((error) => {
                notifyError("Erro ao carregar lista");
            });
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cliente/endereco/' + idRemover)
            .then(() => {
                notifySuccess('Endereço removido com sucesso.')
                carregarLista()
            })
            .catch((error) => {
                if (error.response?.data?.errors) {
                    error.response.data.errors.forEach(e => notifyError(e.defaultMessage))
                } else {
                    notifyError(error.response?.data?.message || "Erro ao remover")
                }
            })

        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>

                    <h2> Endereços dos Clientes </h2>
                    <Divider />

                    <Table color='orange' sortable celled>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Rua</Table.HeaderCell>
                                <Table.HeaderCell>Número</Table.HeaderCell>
                                <Table.HeaderCell>Bairro</Table.HeaderCell>
                                <Table.HeaderCell>Cep</Table.HeaderCell>
                                <Table.HeaderCell>Cidade</Table.HeaderCell>
                                <Table.HeaderCell>UF</Table.HeaderCell>
                                <Table.HeaderCell>Complemento</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {lista.map((endereco) => (

                                <Table.Row key={endereco.id}>
                                    <Table.Cell>{endereco.rua}</Table.Cell>
                                    <Table.Cell>{endereco.numero}</Table.Cell>
                                    <Table.Cell>{endereco.bairro}</Table.Cell>
                                    <Table.Cell>{endereco.cep}</Table.Cell>
                                    <Table.Cell>{endereco.cidade}</Table.Cell>
                                    <Table.Cell>{endereco.estado}</Table.Cell>
                                    <Table.Cell>{endereco.complemento}</Table.Cell>

                                    <Table.Cell textAlign="center">

                                        {/* EDITAR */}
                                        <Button
                                            inverted
                                            circular
                                            color='green'
                                            icon
                                        >
                                            <Link
                                                to={"/form-endereco-cliente"}
                                                state={{ id: endereco.id, clienteId: endereco.clienteId }} // 🔥 OBRIGATÓRIO
                                                style={{ color: "green" }}
                                            >
                                                <Icon name='edit' />
                                            </Link>
                                        </Button>

                                        {/* DELETAR */}
                                        <Button
                                            inverted
                                            circular
                                            color='red'
                                            icon
                                            onClick={() => confirmaRemover(endereco.id)}
                                        >
                                            <Icon name='trash' />
                                        </Button>

                                    </Table.Cell>
                                </Table.Row>

                            ))}

                        </Table.Body>

                    </Table>

                    <div style={{ marginTop: '4%' }}>

                        <Link to={'/list-cliente'}>
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

                    </div>

                </Container>

            </div>

            {/* MODAL */}
            <Modal basic open={openModal}>
                <Header>
                    <Icon name="trash" />
                    <div style={{ marginTop: '5%' }}>
                        Tem certeza que deseja remover esse endereço?
                    </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={remover}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}