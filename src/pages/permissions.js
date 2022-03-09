import Head from 'next/head';
import { Box, Container, Typography, Pagination, PaginationItem } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { PermissionsTable } from '../components/permissions/permissionsTable';
import {PermissionsToolbar} from '../components/permissions/permissions-toolbar'
import { useUserProvider } from 'src/providers/contexts/cruds/UserProvider';
import {useState, useEffect} from 'react';
import {ArrowBack} from '../icons/arrow-back'
import {ArrowForward} from '../icons/arrow-forward'
import  ModalWarning  from 'src/components/crud/modalWarning';
import { PaginationTypography, PaginationNumber, PaginationItems } from 'src/styles/styles';
const Permissions = () => {


  const {getAllUsers} = useUserProvider();
  const [usersList, setUsersList] = useState([])

  useEffect(async () => {
    const users = await getAllUsers();
    setUsersList(users.data.results)
  }, [])


  const [formModalStatus, setFormModalStatus] = useState({
    confirmFunction: null,
    cancelFunction: null,
    isOpen: false,
    userData: null,
    type: ""
});

const [warningModalStatus, setWarningModalStatus] = useState({
    // confirmFunction: null,
    cancelFunction: null,
    isOpen: false,
    message: {
        body: "",
        highlight: ""
    },
    type: ""
})




// Função de deleção
// async function deleteFunction(userId) {
//     if (userId != null) {
//         await deleteUser(userId);
//         deleteUserById(userId);
//         handleCloseWarningModal();
//         handleOpenWarningModal("success", null, "O USUÁRIO FOI DELETADO COM SUCESSO!");
//     }

// }

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

// Função de abertura do modal warning
function handleOpenWarningModal(type, selectedUserId = null, message) {
    setWarningModalStatus({
        ...warningModalStatus,
        // confirmFunction: () => deleteFunction(selectedUserId),
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
                body: "VOCÊ DESEJA REALMENTE EXCLUIR A",
                highlight: `PERMISSÃO ${selectedUser.id}`
            },
        }))
    }
}

const handleCloseWarningModal = () => {
  setWarningModalStatus({
      ...warningModalStatus,
      isOpen: false
  })
};

  return (
    <>
      <Head>
        <title>
          Settings | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 4,
          pb: 2,
          px: 3,
          maxHeight: "90vh",
          height: "90vh"
      }}
      >
      <PermissionsToolbar/>
      <Box sx={{ my: 2, maxHeight: "70vh" }}>
        <PermissionsTable 
        users={usersList} 
        deleteFunction={handleOpenWarningModal}/>
      </Box>
        <Box 
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#FFF",
          borderRadius: "5px",
          marginTop: "15px",
          width: "100%",
          height: "49px",
          justifyContent: "space-between",
          alignItems: "center"
      
        }}>
            <Typography sx={PaginationTypography}>
              <span style={PaginationNumber}>0{usersList?.length} </span>
              DE<span style={PaginationNumber}> 0{usersList?.length} </span>
              RESULTADOS ENCONTRADOS
            </Typography>
            <Pagination sx={{marginLeft: "10px", color: "red"}} shape="rounded" count={1} renderItem={(item) => (
              <PaginationItem
              sx={PaginationItems}
              components={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
              />
            )}/>
        </Box>  
      </Box>
      <ModalWarning {...warningModalStatus} />
    </>
);
  }
Permissions.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Permissions;
