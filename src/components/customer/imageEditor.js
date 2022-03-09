import {imageEditor, imageButton} from '../../styles/styles'
import {
  Grid, 
  Button,
  Menu, 

  MenuItem, 
  Typography, 
  FormControl, 
  TextField, 
  Dialog,
  DialogTitle, 
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Autocomplete,
  Stack,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material"
import {PhotoCamera, EditIcon, } from '@mui/icons-material';
import {useState, useEffect, useRef} from "react";
// import {grey, createMask, paintMask, typesRoiMask, hslFilter, hsvFilter, resizeImage, cropImage} from './filterFunctions'
import {FilterButtons, ManageButtons} from './filterButtons'
import {ImageLoader} from './images'
import {FilterProcess} from './filterProcess'

export const EditorTools = () => {
  const [resetImage, setResetImage] = useState("")
  const [image, setImage] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  
  const [newDimensions, setNewDimensions] = useState({
    width: image.width,
    height: image.height,
    x: 0,
    y: 0
  });
  const [lastImage, setLastImage] = useState("")
  const [showLastImage, setShowLastImage] = useState(false);
  const [operations, setOperations] = useState([])

  const uploadImage = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setShowButtons(true)
    setImage(img)
    setLastImage(img)
    setResetImage(img)
    
  }

  return (
    <Grid container sx={{marginTop: "30px"}}>
      <Grid item xs={12}>
      <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Editor de imagens
        </Typography>
      </Grid>
      <ImageLoader
      show={showButtons}
      image={image}
      dimensions={newDimensions}
      />
      <ImageLoader
      show={showLastImage}
      image={lastImage}
      dimensions={newDimensions}
      />
      <FilterButtons
      setLastImage={setLastImage}
      setShowLastImage={setShowLastImage}
      setImage={setImage}
      image={image} 
      dimensions={newDimensions} 
      showButtons={showButtons}
      operations={operations}
      setOperations={setOperations}
      setDimensions={setNewDimensions}
      resetImage={resetImage}/>

      <FilterProcess 
      show={showLastImage}
      operations={operations}
      />
      <ManageButtons show={showButtons} image={image} upload={uploadImage}/>
      
    </Grid> 
    
  )

}