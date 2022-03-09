import {PermissionsSearchBar} from './permissions-search-bar'
import { Box, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useState} from 'react';
import {AddModal} from './permissions-modal'

export const PermissionsToolbar = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const openSecondary = () => {
        setOpenSuccessModal(true);
        setOpenModal(false)
    }

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false)
        
    }
    
    return (
        <>
            <Box sx={{display: "flex", gap: 1}}>
                <PermissionsSearchBar/>
                <Button
                color="primary"
                variant="contained"
                sx={{width: "25%", "&:hover": {backgroundColor: "#0559C1"}}}
                onClick={() => setOpenModal(true)}
                startIcon={<AddBoxIcon fontSize="large"/>}
                >
                    ADICIONAR PERMISSÃO
                </Button>
            </Box>
            <AddModal close={handleCloseModal} open={openModal} openSecondary={openSuccessModal} closeSecondary={handleCloseSuccessModal} clickSecondary={openSecondary}/>
        </>
        
        
    )
}