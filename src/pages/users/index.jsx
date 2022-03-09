import Head from 'next/head';

import { Box } from '@mui/material'

import { CrudListToolbar } from 'src/components/crud/crud-list-toolbar';
import { UserListResults } from 'src/components/user/user-list-results';
import { DashboardLayout } from 'src/components/dashboard-layout';
import ModalWarning  from 'src/components/crud/modalWarning';
import { ModalForm } from 'src/components/crud/modalForm';
import { TablePagination } from 'src/components/crud/table-pagination';

import { useState, useEffect } from "react";

import { useUserProvider } from 'src/providers/contexts/cruds/UserProvider';
import getDataModel from "src/utils/get-data-model";

const Users = () => {

    const { createUser, updateUser, deleteUser, getAllUsers, getUserById } = useUserProvider();

    // Estados de contole dos modais
    const [formModalStatus, setFormModalStatus] = useState({
        confirmFunction: null,
        cancelFunction: null,
        isOpen: false,
        userData: null,
        type: ""
    });

    const [warningModalStatus, setWarningModalStatus] = useState({
        confirmFunction: null,
        cancelFunction: null,
        isOpen: false,
        message: {
            body: "",
            highlight: ""
        },
        type: ""
    })

    // Estado de controle da lista de usuários
    const [usersList, setUsersList] = useState([]);

    // Estados para o controle da busca
    const [searchFor, setSearchFor] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([])

    // Estados de controle da paginação
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers?.length - page * rowsPerPage);

    // Carregamento inicial dos dados na tabela
    useEffect(async () => {
        const userValues = await getAllUsers();
        setUsersList(userValues.data.results);
        setFilteredUsers(userValues.data.results)
    }, []);

    // Filtragem do userList via dados na searchBar
    useEffect(() => {
        setPage(0)
        if (searchFor) {
            setFilteredUsers(usersList?.filter((user) => {
                let full_name = user.first_name + ' ' + user.last_name
                if (full_name.includes(searchFor) || user.email.includes(searchFor)) {
                    return user
                }
            }))
        } else {
            setFilteredUsers(usersList)
        }
    }, [searchFor])

    useEffect(() => {
        setFilteredUsers(usersList)
    }, [usersList])

    // Função de submissão: Modal Form cadastro
    async function registerFunction(userData) {
        try {
            const newUserRequest = await createUser(userData);
            const userValues = await getAllUsers();
            setUsersList(userValues.data.results);
            handleOpenWarningModal("success", null, "O USUÁRIO FOI CADASTRADO COM SUCESSO!");
        } catch (e) {
            console.log(e)
        }
    }

    // Função de submissão: Modal Form edição
    async function updateFunction(userData) {
        try {
            const newUserRequest = await updateUser(userData.id, userData);
            const userValues = await getAllUsers();
            setUsersList(userValues.data.results);
            handleOpenWarningModal("success", null, "O USUÁRIO FOI ATUALIZADO COM SUCESSO!");
        } catch (e) {
            console.log(e)
        }
    }

    // Função de deleção
    async function deleteFunction(userId) {
        if (userId != null) {
            await deleteUser(userId);

            const validyUsers = usersList.filter(user => user.id != userId);
            setUsersList(validyUsers);

            handleCloseWarningModal();
            handleOpenWarningModal("success", null, "O USUÁRIO FOI DELETADO COM SUCESSO!");
        }
    }

    // Função de abertura do modal form
    const handleOpenFormModal = async (type, selectedUserId = null) => {
        const selectedUser = getDataModel("userRegister");

        if (selectedUserId != null) {
            selectedUser = await getUserById(selectedUserId);
        }

        setFormModalStatus({
            ...formModalStatus,
            confirmFunction: type == "add" ? registerFunction : updateFunction,
            cancelFunction: handleCloseFormModal,
            isOpen: true,
            userData: selectedUser != null ? selectedUser.data : selectedUser,
            type: type
        })
    }

    // Função de fechamento do modal form
    const handleCloseFormModal = () => {
        setFormModalStatus({
            ...formModalStatus,
            isOpen: false
        })
    }

    // Função de abertura do modal warning
    function handleOpenWarningModal(type, selectedUserId = null, message) {
        setWarningModalStatus({
            ...warningModalStatus,
            confirmFunction: () => deleteFunction(selectedUserId),
            cancelFunction: handleCloseWarningModal,
            isOpen: true,
            message: {
                body: message,
                highlight: ""
            },
            type: type
        })

        if (type == "delete-user" && selectedUserId != null) {
            const selectedUser = usersList.filter(user => user.id == selectedUserId)[0];

            setWarningModalStatus(prevState => ({
                ...prevState,
                message: {
                    body: "VOCÊ DESEJA REALMENTE EXCLUIR O USUÁRIO",
                    highlight: `${selectedUser.first_name} ${selectedUser.last_name}`
                },
            }))
        }
    }

    // Função de fechamento do modal warning
    const handleCloseWarningModal = () => {
        setWarningModalStatus({
            ...warningModalStatus,
            isOpen: false
        })
    };

    // Funções de paginação
    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1)
    }

    return (
        <>
            <Head>
                <title>Usuários | Foto Detective</title>
            </Head>

            <Box
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 3,
                    pt: 4,
                    pb: 2,
                    maxHeight: "90vh",
                    height: "90vh"
                }}
            >
                {/*
                TODO         : Refatorar componentes para a estrutura Pai (container) => Filhos (Componentes individuais)

                JUSTIFICATIVA: Evita a necessidade de passar muitos parâmetros para o pai, cada filho recebe apenas seus 
                               próprios parâmetros

                PRIORIDADES  : CrudListToolbar
                ESTRUTURA    : <CrudListToolbar ownProps... >
                                  <UserSearchBar ownProps... />
                                  <UserAddButton ownProps... />
                               </CrudListToolbar>
                
                ANALISAR     : UserListResults
                               TablePagination
                */}

                <CrudListToolbar
                    // Propriedades do addButton
                    buttonLabel="ADICIONAR USUÁRIO"
                    onClick={() => handleOpenFormModal("add")}

                    // Propiedades do searchBar
                    value={searchFor}
                    onChange={(search) => setSearchFor(search)}
                />

                <Box sx={{ my: 2, maxHeight: "70vh" }}>
                    <UserListResults
                        users={filteredUsers}
                        editFunction={handleOpenFormModal}
                        deleteFunction={handleOpenWarningModal}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        searchFor={searchFor}
                    />
                </Box>

                <TablePagination
                    length={filteredUsers?.length || 0}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    emptyRows={emptyRows}
                    onChange={handleChangePage}
                />
            </Box>
            <ModalForm {...formModalStatus} />
            <ModalWarning {...warningModalStatus} />
        </>
    )
};

Users.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Users;
