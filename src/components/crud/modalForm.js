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
import { useState, useEffect } from "react";
import getDataModel from "src/utils/get-data-model";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";

export const ModalForm = ({ confirmFunction, cancelFunction, isOpen, userData, type }) => {
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const standartDataType = type == "add" ? getDataModel("userRegister") : getDataModel("user");
    setSelectedUser(standartDataType);

    if (userData) {
      setSelectedUser(userData);
    }
  }, [userData]);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);

  function handleFormChange(e) {
    setSelectedUser({ ...selectedUser, [e.target.id]: e.target.value });
  }

  function handleFormClose() {
    cleanFields();
    cancelFunction();
  }

  function handleFormSubmit() {
    handleFormClose();
    confirmFunction({ ...selectedUser });
  }

  const cleanFields = () => {
    setSelectedUser(getDataModel(type == "add" ? "userRegister" : "user"));
  };

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
            width: "60vw",
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
              {type == "add" ? "CADASTRAR USUÁRIO" : "EDITAR USUÁRIO"}
            </Typography>
            <IconButton sx={{ color: "#2492C9" }} onClick={handleFormClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            <FormControl fullWidth error={false} variant="outlined" size="small">
              <InputLabel htmlFor="first_name">NOME</InputLabel>
              <OutlinedInput
                id="first_name"
                label="NOME"
                type="text"
                value={selectedUser.first_name}
                onChange={handleFormChange}
                autoFocus
              />
            </FormControl>

            <FormControl fullWidth error={false} variant="outlined" size="small">
              <InputLabel htmlFor="last_name">SOBRENOME</InputLabel>
              <OutlinedInput
                id="last_name"
                label="SOBRENOME"
                type="text"
                value={selectedUser.last_name}
                onChange={handleFormChange}
              />
            </FormControl>

            <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
              <FormControl sx={{ flexGrow: 10 }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="email">EMAIL</InputLabel>
                <OutlinedInput
                  id="email"
                  label="EMAIL"
                  type="text"
                  value={selectedUser.email}
                  onChange={handleFormChange}
                />
              </FormControl>

              <FormControl error={false} variant="outlined" size="small">
                <InputLabel htmlFor="cpf">CPF</InputLabel>
                <OutlinedInput id="cpf" label="CPF" type="text" onChange={handleFormChange} />
              </FormControl>
            </Box>

            <FormControl sx={{ flexGrow: 2 }} error={false} variant="outlined" size="small">
              <InputLabel htmlFor="group">EMPRESA</InputLabel>
              <OutlinedInput id="group" label="EMPRESA" type="text" onChange={handleFormChange} />
            </FormControl>

            <FormControl sx={{ flexGrow: 2 }} error={false} variant="outlined" size="small">
              <InputLabel htmlFor="selected_perfil">SELECIONAR PERFIL ASSOCIADO</InputLabel>
              <OutlinedInput
                id="selected_perfil"
                label="SELECIONAR PERFIL ASSOCIADO"
                type="text"
                onChange={handleFormChange}
              />
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 2 }}>
              <FormControl error={false} variant="outlined" size="small">
                <InputLabel htmlFor="cep">CEP</InputLabel>
                <OutlinedInput id="cep" label="CEP" type="text" onChange={handleFormChange} />
              </FormControl>

              <FormControl sx={{ flexGrow: 10 }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="address">ENDEREÇO</InputLabel>
                <OutlinedInput
                  id="address"
                  label="ENDEREÇO"
                  type="text"
                  onChange={handleFormChange}
                />
              </FormControl>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
              <FormControl sx={{ width: "25%" }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="complement">COMPLEMENTO</InputLabel>
                <OutlinedInput
                  id="complement"
                  label="COMPLEMENTO"
                  type="text"
                  onChange={handleFormChange}
                />
              </FormControl>

              <FormControl sx={{ width: "35%" }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="district">BAIRRO</InputLabel>
                <OutlinedInput
                  id="district"
                  label="BAIRRO"
                  type="text"
                  onChange={handleFormChange}
                />
              </FormControl>

              <FormControl sx={{ width: "10%" }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="uf">UF</InputLabel>
                <OutlinedInput id="uf" label="UF" type="text" onChange={handleFormChange} />
              </FormControl>

              <FormControl sx={{ width: "30%" }} error={false} variant="outlined" size="small">
                <InputLabel htmlFor="city">CIDADE</InputLabel>
                <OutlinedInput id="city" label="CIDADE" type="text" onChange={handleFormChange} />
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <FormControl sx={{ flexGrow: 2 }} error={false} variant="outlined" size="small">
              <InputLabel htmlFor="password">SENHA</InputLabel>
              <OutlinedInput
                id="password"
                label="SENHA"
                type={passwordVisibility ? "text" : "password"}
                onChange={handleFormChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {!passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ flexGrow: 2 }} error={false} variant="outlined" size="small">
              <InputLabel htmlFor="password2">CONFIRMAR SENHA</InputLabel>
              <OutlinedInput
                id="password2"
                label="CONFIRMAR SENHA"
                type={passwordVisibility ? "text" : "password"}
                onChange={handleFormChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {!passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Button sx={{ minWidth: 250 }} variant="contained" onClick={handleFormSubmit}>
              {type == "add" ? "Enviar" : "Salvar alterações"}
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
