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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ActionButton = ({ userId, icon, editFunction, deleteFunction }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleEditClick = (userId) => {
    handleTooltipClose();
    editFunction("edit", userId);
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
                  onClick={() => handleEditClick(userId)}
                  startIcon={<EditIcon />}
                >
                  <Typography sx={{ color: "#6D7B8A" }}>Editar Imagem</Typography>
                </Button>

                <Divider />

                <Button
                  sx={{ color: "#246EC8", width: 200 }}
                  onClick={() => handleDeleteClick(userId)}
                  startIcon={<DeleteIcon />}
                >
                  <Typography sx={{ color: "#6D7B8A" }}>Deletar Imagem</Typography>
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
