import {
  Box,
  Button,
  Card,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";

// import { UserSearchBar } from "../user/user-search-bar";

// TODO: implementar debouncer

const listItens = [{ label: "Empresa 1" }, { label: "Empresa 2" }];
const permitionsItens = [{ label: "Permissão 1" }, { label: "Permissão 2" }];

export const CrudListToolbar = ({ buttonLabel, onClick, value, onChange }) => {
  function handleClick(e) {
    onClick();
  }

  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {/* <UserSearchBar /> */}
      <Card sx={{ p: 1, width: "100%", display: "flex", gap: 1 }}>
        <FormControl sx={{ flexGrow: 3 }}>
          <OutlinedInput
            value={value}
            onChange={handleChange}
            size="small"
            placeholder="BUSCAR POR NOME OU E-MAIL"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            fullWidth
          />
        </FormControl>

        <Autocomplete
          sx={{ flexGrow: 3, maxWidth: 220 }}
          size="small"
          disablePortal
          id="combo-box-groups"
          options={listItens}
          renderInput={(params) => <TextField {...params} label="EMPRESAS" />}
        />

        <Autocomplete
          sx={{ flexGrow: 3, maxWidth: 220 }}
          size="small"
          disablePortal
          id="combo-box-permitions"
          options={permitionsItens}
          renderInput={(params) => <TextField {...params} label="PERMISSÕES" />}
        />
      </Card>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
        sx={{ width: "25%" }}
        startIcon={<AddBoxIcon fontSize="large" />}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};
