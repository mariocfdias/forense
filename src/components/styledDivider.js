import { Box } from "@mui/material";

const StyledDivider = ({ children }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ borderBottom: "2px solid #CACACA", width: "100%" }} />
      <Box
        component="span"
        sx={{
          px: 0.5,
          py: 2,
          width: "60%",
          fontWeight: 500,
          fontSize: 14,
          color: "#CACACA",
          textAlign: "center",
        }}
      >
        {children}
      </Box>
      <Box sx={{ borderBottom: "2px solid #CACACA", width: "100%" }} />
    </Box>
  );
};

export { StyledDivider };
