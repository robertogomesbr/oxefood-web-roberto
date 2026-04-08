import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, Container, Divider, Header, Icon, Modal,
    ModalActions,
    ModalContent,
    Table,
} from "semantic-ui-react";
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListPromocao() {
    
    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [dadosModal, setDadosModal] = useState(false);
    const [promocaoSelecionado, setPromocaoSelecionado] = useState();
    
    useEffect(() => {
            carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/promocao")
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

        await axios.delete('http://localhost:8080/api/promocao/' + idRemover)
            .then((response) => {

                notifySuccess('Promoção removido com sucesso.')

                axios.get("http://localhost:8080/api/promocao")
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
        axios.get('http://localhost:8080/api/promocao/' + id)
            .then((response) => {
                setPromocaoSelecionado(response.data)
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

    async function alterarValidade(promocao) {

    const promocaoAtualizada = {
        ...promocao,
        promoValida: !promocao.promoValida
    };

    await axios.put('http://localhost:8080/api/promocao/' + promocao.id, promocaoAtualizada)
        .then(() => {
            notifySuccess('Status da promoção atualizado com sucesso!');
            carregarLista();
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

            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Promocao </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-promocao'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Título</Table.HeaderCell>
                                    <Table.HeaderCell>Data de início</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Fim</Table.HeaderCell>
                                    <Table.HeaderCell>Promo Válida</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(promocao => (

                                    <Table.Row key={promocao.id}>
                                        <Table.Cell>{promocao.titulo}</Table.Cell>
                                        <Table.Cell>{formatarData(promocao.dataInicio)}</Table.Cell>
                                        <Table.Cell>{formatarData(promocao.dataFim)}</Table.Cell>
                                        <Table.Cell>{promocao.promoValida ? "Sim" : "Não"}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta promocao'
                                                icon>
                                                <Link to="/form-promocao" state={{ id: promocao.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta promocao'
                                                icon
                                                onClick={e => confirmaRemover(promocao.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color="blue"
                                                title='Clique aqui para visualizar todos os dados desta promocao'
                                                icon
                                                onClick={e => exibirDados(promocao.id)}>
                                                <Icon name="eye" />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color="orange"
                                                title='Ativar/Desativar promoção'
                                                icon
                                                onClick={() => alterarValidade(promocao)}
                                            >
                                                <Icon name="exchange" />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>

                        </Table>

                    </div>

                </ Container>

            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
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
                <Header icon='book' content='Detalhamento da Promoção' />
                <ModalContent>
                    {promocaoSelecionado && (

                    <Modal.Content style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
                        <p style={{ color: 'black' }}>Título: {promocaoSelecionado.titulo}</p>
                        <p style={{ color: 'black' }}>Data de Início: {formatarData(promocaoSelecionado.dataInicio)}</p>
                        <p style={{ color: 'black' }}>Data de Fim: {formatarData(promocaoSelecionado.dataFim)}</p>
                        <p style={{ color: 'black' }}>Regra: {promocaoSelecionado.regra}</p>
                        <p style={{ color: 'black' }}>Valor de Desconto: {promocaoSelecionado.valorDesconto}%</p>
                        <p style={{ color: 'black' }}>Promoção Válida: {promocaoSelecionado.promoValida ? "Sim" : "Não"}</p>
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