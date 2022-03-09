import {
  Popover,
  IconButton,
  Typography,
  List,
  ListItem,
  Divider,
}from '@mui/material/Popover';
import {useState} from 'react'
import {PopoverText} from '../../styles/styles'
import {Menu as MenuIcon} from '../../icons/menu';
import {Edit as EditIcon, Duplicate as DuplicateIcon, Delete as DeleteIcon} from '../../icons/permission-popover';


export const Teste = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MenuIcon/>
      </IconButton>
      <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorPosition={{ top: 300, left: 400 }}
      anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
      }}
      >
      <List component="nav" aria-label="mailbox folders">
      <ListItem button>
      <EditIcon />
      <Typography sx={PopoverText}>
          EDITAR PERMISSÃO
      </Typography>
      </ListItem>
      <Divider />
      <ListItem button divider>
      <DuplicateIcon/>
      <Typography sx={PopoverText}>
      DUPLICAR PERMISSÃO
      </Typography>
      </ListItem>
      <ListItem button>
      <DeleteIcon/>
      <Typography sx={PopoverText}>
          DELETAR PERMISSÃO
      </Typography>
      </ListItem>
      <Divider light />
      </List>
      </Popover>
    </>
  )
}