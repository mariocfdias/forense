import {
    FormControl,
    Grid,
    InputLabel,
    Select,
    Box,
    Chip,
    OutlinedInput,
    MenuItem,
} from "@mui/material"
import {imageEditor, imageButton} from '../../styles/styles'


export const FilterProcess = (props) => {
    return (
        <Grid  item xs={6}>
            {props.show?
            (
              <div>
               <FormControl sx={{minWidth: 120, maxWidth: 300 }}>
                 <InputLabel  htmlFor="select-multiple-native">
                   Filtros 
                 </InputLabel>
                 <Select
                  
                //   multiple
                //   value={operations}
                //   label="Native"
                //    inputProps={{
                //      id: 'select-multiple-native',
                //    }}
                //  >
                //    {operations.map((operation, idx) => (
                //      <option key={idx} value={operation}>
                //        {operation}
                //      </option>
                //    ))}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={props.operations}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                
              >
                {props.operations.map((operation) => (
                  <MenuItem
                    key={operation}
                    value={operation}  
                  >
                    {operation}
                  </MenuItem>
                ))}
                 </Select>
               </FormControl>
               </div>
             ): ""
          }
        </Grid>
        
    )
}