import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const ListToolbar = (props) => {
  const router = useRouter();

  function handleClick(e) {
    e.preventDefault();
    props.handleCreateModal()
  }

  return (
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
          Imagens
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleClick}>
            Nova imagem
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
