import {
    IconButton,
    Button,
    Tooltip,
    tooltipClasses,
    Typography,
    ClickAwayListener,
    Box,
    Divider,
  } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {Edit as EditIcon, Duplicate as DuplicateIcon, Delete as DeleteIcon ,Test} from '../../icons/permission-popover';
import {TableHeaders, TableDatas, TablePermissions, TableIcons, PopoverText} from '../../styles/styles'
  

export const PermissionsPopOver = ({ userId, icon, deleteFunction }) => {
    const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };



  const handleDeleteClick = (userId) => {
    handleTooltipClose();
    deleteFunction("delete-user", userId);
  };

  const ActionTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#FFF",
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.16)",
      borderRadius: "15px 0px 15px 15px",
      color: "#6D7B8A",
      fontWeigth: 600,
      fontSize: 12,
    },
  }));

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <ActionTooltip
            PopperProps={{
              disablePortal: true,
            }}
            placement="left-start"
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ color: "#246EC8", width: 200 }}
                  startIcon={<EditIcon />}
                >
                  <Typography sx={PopoverText}>EDITAR PERMISSÃO</Typography>
                </Button>

                <Divider />

                <Button
                  sx={{ color: "#246EC8", width: 200 }}
                  startIcon={<DuplicateIcon/>}
                >
                  <Typography sx={PopoverText}>DUPLICAR PERMISSÃO</Typography>
                </Button>
                <Divider />

                <Button
                  sx={{ color: "#246EC8", width: 200 }}
                  onClick={() => handleDeleteClick(userId)}
                  startIcon={<DeleteIcon />}
                >
                  <Typography sx={PopoverText}>DELETAR PERMISSÃO</Typography>
                </Button>
              </Box>
            }
          >
            <IconButton onClick={handleClick}>{icon}</IconButton>
          </ActionTooltip>
        </div>
      </ClickAwayListener>
    </>
  );
};

