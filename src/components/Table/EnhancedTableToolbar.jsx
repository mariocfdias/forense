import { alpha, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { useState } from "react";
import  FilterListIcon  from '@mui/icons-material/FilterList';
import  DeleteIcon  from '@mui/icons-material/Delete';

export default function EnhancedTableToolbar (props)  {
    const { numSelected } = props;
  
    return <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selecionados
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Usuarios
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Deletar selecionados">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Listar">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    
  };
  