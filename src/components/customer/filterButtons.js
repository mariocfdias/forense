import {
  Button,
  Menu,
  MenuItem,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box,
  FormControl,
  TextField,
  ImageList,
  ImageListItem,
}from '@mui/material';
import {imageEditor, imageButton} from '../../styles/styles';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DownloadIcon from '@mui/icons-material/Download';
import {useState, useEffect} from 'react';
import HistoryIcon from "@mui/icons-material/History"
import { saveAs } from 'file-saver'


const Input = styled('input')({
  display: 'none',
});

export const FilterButtons = (props) => {

  const {Image} = require("image-js")
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [imagesArray, setImagesArray] = useState([])
  
  const open = Boolean(anchorEl);
  const image = props.image

  const handleClose = (e) => {
    typesRoiMask(image, e.target.innerText);
    setAnchorEl(null);
  };

  const handleClickOpen = () => setOpenModal(true);

  const closeModal = () => {
    setOpenModal(false)
    props.setDimensions(props.resetImage)
  }
  const handleCropModal = () => setOpenCropModal(true);
  
  
  const closeCropModal = () => {
    setOpenCropModal(false)
  }

  const revertImage = () => {
    const resetImage = props.resetImage
    props.setImage(resetImage)
    props.setLastImage(resetImage)
    props.setShowLastImage(false)
    props.setOperations([])
    
  }

  const buttons = [
    
    <Button   sx={imageButton}  color="primary" variant="contained" onClick={() => grey(image)}>Tons de Cinza</Button>,
    <Button   sx={imageButton}  color="primary" variant="contained" onClick={() => createMask(image)}>Preto e branco</Button>,
    // <Button   sx={imageButton}  color="primary" variant="contained" onClick={() => paintMask(image)}>Pintar mask</Button>,
    <div >
    <Button
        sx={imageButton}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="primary"
        variant="contained"
        disableElevation
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Masks com Roi
    </Button>
    <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>

          contour
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          box
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          filled
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          center
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          hull
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          normal
        </MenuItem>
      </Menu>
    </div>,
    <Button sx={imageButton} color="primary" variant="contained"  onClick={() => hslFilter(image)}>Filtro hsl</Button>, 
    <Button sx={imageButton} color="primary" variant="contained"  onClick={() => hsvFilter(image)}>Filtro hsv</Button>, 
    <div>
    <Button sx={imageButton} color="primary" variant="contained" onClick={handleClickOpen}>Redimensionar</Button>
    <Dialog disableEscapeKeyDown open={openModal} onClose={closeModal}>
      <DialogTitle>Preencha com as novas dimensões</DialogTitle>
      <DialogContent>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1}}>
            <TextField type="number" label="Largura" value={props.dimensions.width} onChange={(e) => props.setDimensions({width: e.target.value})}/>
        </FormControl>
        <FormControl sx={{ m: 1}}>
          <TextField type="number" label="Altura" value={props.dimensions.height} onChange={(e) => props.setDimensions({height: e.target.value})}/>
        </FormControl>
      </Box> 
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeModal}>Cancelar</Button>
        <Button variant="contained" onClick={() => resizeImage(image, props.dimensions.width, props.dimensions.height)}>Salvar</Button>
      </DialogActions>
    </Dialog>
    </div>,
    <div>
    <Button sx={imageButton} color="primary" variant="contained" onClick={handleCropModal}>Recortar</Button>
    <Dialog disableEscapeKeyDown open={openCropModal} onClose={closeCropModal}>
      {/* <DialogTitle>Preencha com as novas dimensões</DialogTitle> */}
      <DialogContent>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1}}>
            <TextField type="number" label="X" value={props.dimensions.x} onChange={(e) => props.setDimensions({x: e.target.value})}/>
        </FormControl>
        <FormControl sx={{ m: 1}}>
          <TextField type="number" label="Y" value={props.dimensions.y} onChange={(e) => props.setDimensions({y: e.target.value})}/>
        </FormControl>
      </Box> 
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeCropModal}>Cancelar</Button>
        <Button variant="contained" onClick={() => cropImage(image, props.dimensions.x, props.dimensions.y)}>Salvar</Button>
      </DialogActions>
    </Dialog>
    </div>,
    <Button sx={imageButton} color="primary" variant="contained" onClick={() => revertImage()} endIcon={<HistoryIcon/>}>Reverter</Button>
  ]

  async function grey(image) {
    props.setOperations([...props.operations, "Tons de cinza"])
    const img = await Image.load(image)
    const grey = img.grey()
    props.setLastImage(image)
    props.setShowLastImage(true)
    props.setImage(grey.toDataURL())
    setImagesArray(grey.toDataURL())
  }
  
  async function createMask(image) {
    props.setOperations([...props.operations, "Preto e branco"])
    const img = await Image.load(image)
    const yellow = img.grey({algorithm: "yellow"})
    const result = yellow.mask()
    props.setLastImage(image)
    props.setShowLastImage(true)
    props.setImage(result.toDataURL())
    setImagesArray(result)
  }
  
  
  async function typesRoiMask(image, type) {
    props.setOperations([...props.operations, `Mascara(${type})`])
    const img = await Image.load(image)
    const grey = img.grey()
    const yellow = img.grey({algorithm: "yellow"})
    const mask = yellow.mask()
    const roiManager = img.getRoiManager()
    roiManager.fromMask(mask)
    const rois = roiManager.getRois({negative: false, minSurface: 100})
    const roisMasks = rois.map((roi) => roi.getMask({kind: type}))
    const result = grey.rgba8().paintMasks(roisMasks, {color: 'orange'})
    props.setImage(result.toDataURL());
    props.setLastImage(image)
    props.setShowLastImage(true)
    setImagesArray(result)
  }
  
  
  async function hslFilter(image) {
    try{
      props.setOperations([...props.operations, "Filtro hsl"])
      const img = await Image.load(image)
      const hslImage = img.hsl()
      props.setImage(hslImage.toDataURL())
      setImagesArray(hslImage)
      props.setLastImage(image)
      props.setShowLastImage(true)
    }catch(err) {
      console.log(err)
    }
    
  }
  
  async function hsvFilter(image) {
    try{
      props.setOperations([...props.operations, "Filtro hsv"])
      const img = await Image.load(image)
      const hsvImage = img.hsv()
      props.setImage(hsvImage.toDataURL())
      setImagesArray(hsvImage)
      props.setLastImage(image)
      props.setShowLastImage(true)
    }catch(err){
      console.log(err)
    }
  }
  
  async function resizeImage(image, width, height) {
    try {
      setOperations([...operations, "Redimensionar"])
      const img = await Image.load(image)
      const resizedImage = img.resize({width: width, height: height})
      props.setLastImage(image)
      props.setShowLastImage(true)
      setOpenModal(false)
      props.setImage(resizedImage.toDataURL())
      setImagesArray(resizedImage)
      props.setDimensions({
        width: image.width,
        height: image.height,
    })
      closeModal()
    }catch(err) {
      console.log(err)
      closeModal()
    }
    
  }
  
  async function cropImage(image, x, y) {
    props.setOperations([...props.operations, "Recortar"])
    const img = await Image.load(image)
    const resizedImage = img.crop({x: x, y: y})
    props.setImage(resizedImage.toDataURL())
    setImagesArray(resizedImage )
    props.setLastImage(image)
    props.setShowLastImage(true)
    closeCropModal()
  }

  const filterDuplicates = () => {
  
    const unique = props.operations.filter((operation, idx, arr) => arr.indexOf(operation) === idx)
    props.setOperations(unique)
  }

  useEffect(() => {
    filterDuplicates()
    console.log(imagesArray)
  }, [image])

  return (
    <>
      {props.showButtons ? 
        (
          
          <Grid  container sx={{marginTop: "30px"}}>
          {
            buttons.map((button, idx) => {
              return (
                <Grid key={idx} item xs={3}>
                  {button}
                </Grid>
              )
            })
          }
          </Grid>
        ): ""
        }
    </>
  )
  
}

export const ManageButtons = (props) => {

  const image = props.image
  const download = (image) => {
    saveAs(image, 'download_img.png')
  }

  return (
    <Grid item xs={12} sx={{marginTop: "30px"}}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={props.upload}/>
        <Button  color="inherit" variant="contained" component="span">
          Adicionar imagem
        </Button>
      </label>
      {props.show ?  <Button  color="inherit" sx={{marginLeft: "60px"}} variant="contained" component="span" onClick={() => download(image)} endIcon={<DownloadIcon/>}>Baixar imagem</Button> : ""}
     
    </Grid>
  )
}