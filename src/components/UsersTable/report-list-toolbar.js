import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";

export const ReportListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
        mb: 4,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Laudos
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained">
          Adicionar novo laudo
        </Button>
      </Box>
    </Box>
  </Box>
);
