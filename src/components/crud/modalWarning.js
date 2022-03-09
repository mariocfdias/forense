import { Box, Modal, Typography, Button, IconButton } from "@mui/material";

import { Warning as WarningIcon } from "../../icons/warning";
import { Success as SuccessIcon } from "../../icons/success";
import { Close as CloseIcon } from "../../icons/close";
import {
  DialogCancelButton,
  DialogConfirmButton,
} from "../../styles/styles";

const ModalWarning = ({ confirmFunction, cancelFunction, isOpen, message, type }) => {
  return  <Modal
      open={isOpen}
      onClose={cancelFunction}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 550,
          bgcolor: "background.paper",
          border: "1px solid #DDD",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 1,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <IconButton size="small" onClick={cancelFunction}>
              <CloseIcon />
            </IconButton>
          </Box>
          {type == "success" ? (
            <>
              <SuccessIcon />
              <Box
                sx={{ py: 2, pb: 3, width: "90%", fontWeight: 700, fontSize: 20 }}
                textAlign="center"
              >
                {message?.body}
              </Box>
              <Box sx={{ width: "85%", display: "flex", justifyContent: "center", pb: 1 }}>
                <Button onClick={cancelFunction} sx={{ width: 150 }} variant="contained">
                  OK
                </Button>
              </Box>
            </>
          ) : (
            <>
              <WarningIcon />
              <Typography
                sx={{ py: 2, pb: 3, width: "90%", fontWeight: 700, fontSize: 20 }}
                textAlign="center"
              >
                {message?.body}{" "}
                <Box component={"span"} sx={{ color: "#0583C1" }}>
                  {message?.highlight.toUpperCase()}
                </Box>{" "}
                ?
              </Typography>
              <Box sx={{ width: "85%", display: "flex", justifyContent: "space-between", pb: 1 }}>
                <Button onClick={confirmFunction} sx={DialogConfirmButton} variant="contained">
                  SIM, DESEJO
                </Button>
                <Button onClick={cancelFunction} sx={DialogCancelButton} variant="outlined">
                  CANCELAR
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  
};

export default ModalWarning;