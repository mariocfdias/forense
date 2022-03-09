import {
    Modal,
    Box,
    Divider,
    Typography,
    IconButton,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
  } from "@mui/material";
  import { useState, useEffect, useRef } from "react";
  import getDataModel from "src/utils/get-data-model";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  
  import CloseIcon from "@mui/icons-material/Close";
  import api from "src/providers/services/api";

  export const ImageModal = ({ confirmFunction, cancelFunction, isOpen, imageData, type }) => {
    const [title, setTitle] = useState(imageData.title || '')
    const [description, setDescription] = useState(imageData.description || '')
    const [image, setImage] = useState('')
    const [displayImage, setDisplayImage] = useState('' || imageData.imageUrl)
    
    const hasData = imageData.title != '' && imageData.description != ''
    useEffect(() => {
            setTitle(imageData.title)
            setDescription(imageData.description)
            setDisplayImage(imageData.imageUrl)
            console.log(imageData.imageUrl)
        
    }, [imageData])
 
    function handleCreateImage(){
      let fd = new FormData()
      fd.append('title', title);
      fd.append('description', description)
      fd.append('base_image', image)
      console.log(fd)
      api.post('/auth/me/images/', fd)
      console.log("Enviado");
    }

    function handleEditImage(){
      let fd = new FormData()
      fd.append('title', title);
      fd.append('description', description)
      fd.append('base_image', image)
      console.log(fd)
      api.patch('/auth/me/images/', fd)
      console.log("Enviado");
    }


    const cleanFields = () => {
      setTitle('')
      setDescription('')
      setImage(null)

    };

    function handleFormClose() {
      cleanFields();
      cancelFunction();
    }
  
    function handleFormSubmit(e) {




      handleCreateImage()
      handleFormClose();
      e.preventDefault();
    }
  
  
    return (
      <form>
        <Modal
          open={isOpen}
          onClose={cancelFunction}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30vw",
              bgcolor: "background.paper",
              border: "1px solid #DDD",
              borderRadius: "0.25rem",
              boxShadow: 24,
              p: 3,
              px: 4,
              pb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#0583C1", fontWeight: 700, fontSize: "1.2rem" }}>
                {!hasData ? "CADASTRAR IMAGEM" : "EDITAR IMAGEM"}
              </Typography>
              <IconButton sx={{ color: "#2492C9" }} onClick={handleFormClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              <FormControl fullWidth error={false} variant="outlined" size="small">
                <InputLabel htmlFor="first_name">TITULO</InputLabel>
                <OutlinedInput
                  id="title"
                  label="Titulo"
                  type="text"
                  value={title}
                  onChange={(e) => {setTitle(e.target.value)}}
                  autoFocus
                />
              </FormControl>
              <Box/>

              <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                <FormControl sx={{ flexGrow: 10 }} error={false} variant="outlined" size="small">
                  <InputLabel htmlFor="email">DESCRIÇÃO</InputLabel>
                  <OutlinedInput
                    minRows={4}
                    multiline
                    id="description"
                    label="Descrição"
                    type="text"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    />
                </FormControl>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                <FormControl sx={{ flexGrow: 10 }} error={false} variant="outlined" size="small">
                  <InputLabel htmlFor="email">IMAGEM</InputLabel>
                  <OutlinedInput
                    id="image"
                    label="Imagem"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      setImage(event.target.files[0])
                      setDisplayImage(URL.createObjectURL(event.target.files[0]))
                    }}
                    InputLabelProps={{ shrink: true }}  

                    />
                </FormControl>
            </Box>


            <Box sx={{ width: "100%", display: "flex",justifyContent:'center', gap: 2 }}>
            {displayImage ? <img src={displayImage}/> : <div/>}
            </Box>

                    </Box>

  
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
              <Button sx={{ minWidth: 250 }} variant="contained" onClick={handleFormSubmit}>
                {!hasData ? "Enviar" : "Salvar alterações"}
              </Button>
              <Button sx={{ minWidth: 250 }} variant="outlined" onClick={handleFormClose}>
                Cancelar
              </Button>
            </Box>
            
            </Box>
            
        </Modal>
      </form>
    );
  };
  