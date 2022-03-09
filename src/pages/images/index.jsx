import Head from 'next/head';
import { Box, Container, Modal, Typography, Divider, Button } from '@mui/material';
import { ListToolbar } from "../../components/images/list-toolbar"
import { ListResults } from "../../components/images/list-results"
import { DashboardLayout } from '../../components/dashboard-layout';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useImageProvider } from 'src/providers/contexts/cruds/ImageProvider';
// TODO: Substituir por dados do backend
import { reports } from "../../__mocks__/reports"
import {ImageModal} from 'src/components/images/createModal';
import api from "src/providers/services/api";


const Images = () => {
    const [imageList, setImageList] = useState()
    const { getImages } = useImageProvider() 

    useEffect(async () => {

        const imageResponse = await getImages()
        setImageList(imageResponse.results)
        console.log(imageResponse.results)



    }, [])

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [isCreateOpen, setCreateOpen] = useState(false)

    const [modal, setModal] = useState(false)

    const [imageData, setImageData] = useState({
        title: '',
        description: '',
        image: '',
        type: 'new'
    })


    const handleSubmitModal = () => {setCreateOpen(false)}

    const handleNewImage = () => {
        setModal(true)
        setImageData({
            title: '',
            description: '',
            image: '',
            type: 'new'
        })
    }
    
    const handleCloseModal = () => {
        setModal(false)
    }

    const handleEditImage = (imageData) => {
        setModal(true)
        console.log(imageData)
        setImageData({
            title: imageData.title,
            description: imageData.description,
            image: imageData.base_image,
            id: imageData.id,
            type: 'edit'
        })

    }
    const handlerDeleteReport = (id) => {

        api.delete(`/auth/me/image/${id}`)

        console.log(`Deletando laudo ${id}`)

        // ------------------------------------------------

        setOpen(true)
    };

    const handlerEditReport = (e, id) => {
        e.preventDefault();
        router.push(`/reports/edit/${id - 1}`);
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            <Head>
                <title>Imagens | Foto Detective</title>
            </Head>
      
            <ImageModal
            confirmFunction={handleCloseModal} cancelFunction={handleCloseModal} isOpen={modal}  imageData={{title: imageData.title, description: imageData.description, imageUrl: imageData.image}} type={imageData.type}
            />
            <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
                <Container maxWidth="lg">
                    <ListToolbar 
                    handleCreateModal={handleNewImage}/>
                    <Box sx={{ mt: 3 }}>
                        <ListResults
                            images={imageList}
                            deleteFunction={handlerDeleteReport}
                            editFunction={handleEditImage}
                        />
                    </Box>
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '1px solid #DDD',
                    borderRadius: "0.25rem",
                    boxShadow: 24,
                    p: 4,
                    pb: 2
                }}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            color: '#0583C1',
                            fontWeight: 700
                        }}
                    >
                        ATENÇÃO!
                    </Typography>
                    <Typography sx={{ my: 2, textAlign: 'center' }}>
                        Deseja realmente deletar essa imagem?
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button color="error">Deletar</Button>
                        <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

Images.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)

export default Images;