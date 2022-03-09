import {
  Card,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

// TODO: Substituir icones
import SearchIcon from "@mui/icons-material/Search";

// TODO: Substituir mock
const listItens = [{ label: "Empresa 1" }, { label: "Empresa 2" }];
const permitionsItens = [{ label: "Permissão 1" }, { label: "Permissão 2" }];

export const UserSearchBar = (props) => {
  return (
    <Card sx={{ p: 1, width: "100%", display: "flex", gap: 1 }}>
      <FormControl sx={{ flexGrow: 3 }}>
        <OutlinedInput
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
  );
};
