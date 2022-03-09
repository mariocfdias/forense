import Head from 'next/head';
import { Box, Container, Modal, Typography, Divider, Button } from '@mui/material';
import { CrudListToolbar } from 'src/components/crud/crud-list-toolbar';
import { ReportListResults } from "../../components/report/report-list-results"
import ModalWarning from 'src/components/crud/modalWarning';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserProvider } from 'src/providers/contexts/cruds/UserProvider';
// TODO: Substituir por dados do backend
import { reports } from "../../__mocks__/reports"

const Reports = () => {
    const { getAllUsers, updateUser } = useUserProvider()

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [userList, setUserList] = useState([])
    const [userCount, setUserCount] = useState(0)

    const handlerDeleteReport = (e, id) => {
        e.preventDefault();

        // TODO: Implementar rotina de exclusão de um laudo (Criar novo método)

        console.log(`Deletando laudo ${id}`)

        // ------------------------------------------------

        setOpen(true)
    };

    useEffect(async () => {

        const userValues = await getAllUsers();

        setUserList(userValues.data.results)
        setUserCount(userValues.data.count)


    }, [])

    useEffect(async () => {
        const editedData = [...userList][2]

        console.log(editedData)
        if(editedData) 
        {
            editedData.first_name='teste'
            await updateUser(editedData.id, editedData)
            console.log(edit)
        }

        console.log(editedData)


    }, [userList])

    const handlerEditReport = (e, id) => {
        e.preventDefault();
        router.push(`/reports/edit/${id - 1}`);
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            <Head>
                <title>Laudos | Foto Detective</title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
                <Container maxWidth="lg">
                    <CrudListToolbar
                        label="Laudos"
                        buttonLabel="Novo laudo"
                        redirectTo="/reports/new"
                    />
                    <Box sx={{ mt: 3 }}>
                        <ReportListResults
                            reports={reports}
                            deleteFunction={handlerDeleteReport}
                            editFunction={handlerEditReport}
                        />
                    </Box>
                </Container>
            </Box>

            <ModalWarning
                isOpen={open}
                confirmFunction={handlerDeleteReport} // TODO: Substituir método
                cancelFunction={handleClose}
                text="Deseja realmente deletar esse laudo?"
            />
        </>
    )
}

Reports.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)


export default Reports;