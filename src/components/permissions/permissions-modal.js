import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  OutlinedInput,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Warning as WarningIcon } from "../../icons/warning";
import { Success as SuccessIcon } from "../../icons/success";
import { Close as CloseIcon } from "../../icons/close";
import { Check as CheckIcon } from "../../icons/check";
import {ArrowDown, ArrowUp} from '../../icons/arrow-down';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  DialogText,
  DialogPermissions,
  DialogCancelButton,
  DialogCancelButtonLg,
  DialogConfirmButton,
  DialogInputArea,
  DialogTitleArea,
  DialogPermissionButton,
  DialogCheckBox,
  DialogSentButton,
  CheckLabel,
} from "../../styles/styles";
import { useState } from "react";

export const DeleteModal = (props) => {
  return (
    <>
      <Dialog
        sx={{ borderRadius: "20px" }}
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "right" }}>
          <IconButton onClick={props.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", padding: "16px 24px" }}>
          <WarningIcon />
          <Typography sx={DialogText}>
            VOCÊ REALMENTE DESEJA EXCLUIR A<br></br>
            <span style={{ color: "#0583C1" }}>
              {/* {props.permission} */}
              PERMISSÃO
            </span>
            ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around", padding: "16px 24px" }}>
          <Button sx={DialogConfirmButton} variant="contained" onClick={props.close}>
            SIM, DESEJO
          </Button>
          <Button sx={DialogCancelButton} variant="outlined" onClick={props.close} autoFocus>
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AddModal = (props) => {

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState([])


  const handleClick = (idx) => {
    // console.log(idx)
    setIndex(idx)
    console.log(index)
    setOpen(!open)
    
  };
  
  
  const permissions = ["ADMINISTRADOR", "USUÁRIO", "LAUDO", "IMAGENS"]

  return (
    <>
      <Dialog
        PaperProps={{sx: {width: "600px", height: open ? "700px": "450px", maxHeight: "700px",}}}
        fullWidth
        maxWidth="md"
        sx={{borderRadius: "20px"}}
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" 
        sx={{
          textAlign: "right", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          paddingBottom: "0"}}
        >
          <Typography sx={DialogTitleArea}>
            CADASTRAR PERMISSÃO
          </Typography>
          <IconButton onClick={props.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent sx={{textAlign: 'center', padding: "16px 24px", overflow: "hidden"}}>
        <OutlinedInput
        size="small"
        placeholder="NOME DA PERMISSÃO"
        sx={DialogInputArea}
        fullWidth/>
        <Grid container sx={{textAlign: "start", marginTop: "30px",   display: "block"}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: "0", margin: "0", border: "2px solid #EAEDF0", borderRadius: "10px" }}>

        {permissions.map((permission, idx) => {
          const labelId = `checkbox-list-label-${permission}`;
          return (
            <div key={idx} sx={{height: open ? "121px": "43px"}}>
              <ListItemButton onClick={() => handleClick(idx)} sx={{padding: "0 16px"}}>
              <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                 </ListItemIcon>
              <ListItemText primary={permission} sx={DialogPermissions}/>
              {index === idx ? <ArrowUp /> : <ArrowDown />}
            </ListItemButton>
            <Collapse in={index === idx ? open : ""} timeout="auto" unmountOnExit>
              <Divider/>
              <List component="div" disablePadding sx={{height: "121px", backgroundColor: "#F9F9F9"}}>
                 <ListItemButton sx={{ pl: 4 }} sx={{padding: "0 16px 0 32px", height: "33px"}}>
                    <ListItemIcon>
                      <Checkbox icon={<CheckIcon/>}/>
                    </ListItemIcon>
                    <ListItemText primary="OPÇÃO 1" sx={DialogPermissions}/>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} sx={{padding: "0 16px 0 32px", height: "33px"}}>
                    <ListItemIcon>
                      <Checkbox icon={<CheckIcon/>}/>
                    </ListItemIcon>
                  <ListItemText primary="OPÇÃO 2" sx={DialogPermissions}/>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }} sx={{padding: "0 16px 0 32px", height: "33px"}}>
                      <ListItemIcon>
                        <Checkbox icon={<CheckIcon/>}/>
                  </ListItemIcon>
                  <ListItemText primary="OPÇÃO 3" sx={DialogPermissions}/>
                  </ListItemButton>
                </List>
            </Collapse>
            <Divider/>
          </div>
          )
        
          })}
        </List>
      
        </Grid>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between", padding: "16px 24px"}}>
          <Button sx={DialogSentButton} variant="contained" onClick={props.clickSecondary}>ADICIONAR</Button>
          <Button  variant="outlined" onClick={props.close} autoFocus>
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessModal open={props.openSecondary} close={props.closeSecondary}/>
    </>
  );
}


export const SuccessModal = (props) => {
  return (
    <>
      <Dialog
        sx={{ borderRadius: "20px" }}
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "right" }}>
          <IconButton onClick={props.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", padding: "16px 24px" }}>
          <SuccessIcon />
          <Typography sx={DialogText}>PERMISSÃO CADASTRADA COM SUCESSO</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around", padding: "16px 24px" }}>
          <Button
            sx={{ width: "140px", "&:hover": { backgroundColor: "#0559C1" } }}
            variant="contained"
            onClick={props.close}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
