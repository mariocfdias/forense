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

// import SearchIcon from "@mui/icons-material/Search";
import {Search as SearchIcon} from '../../icons/search'
export const PermissionsSearchBar = () => {
    return (
        <Card sx={{p: 1, width: "100%", display: "flex", gap: 1}}>
            <FormControl sx={{flexGrow: 3}}>
                <OutlinedInput
                size="small"
                placeholder="BUSCAR POR PERMISSÃO"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                fullWidth/>
            </FormControl>
        </Card>
    )
}