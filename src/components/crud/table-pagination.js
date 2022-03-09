import { Pagination, Box, Typography } from "@mui/material";

export function TablePagination({ length, page, rowsPerPage, emptyRows, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: "10px",
        p: 1,
      }}
    >
      <Box>
        <Box sx={{ fontWeight: 600, color: "#878787" }}>
          <Typography sx={{ display: "inline-block", fontWeight: 600, color: "#0559C1" }}>
            {length && length > 0 ? page * rowsPerPage + rowsPerPage - emptyRows : 0}
          </Typography>{" "}
          de{" "}
          <Typography sx={{ display: "inline-block", fontWeight: 600, color: "#0559C1" }}>
            {length}
          </Typography>{" "}
          resultados encontrados
        </Box>
      </Box>
      {length > 0 && (
        <>
          <Pagination
            shape="rounded"
            count={Math.ceil(length / rowsPerPage) || 0}
            onChange={onChange}
          />
        </>
      )}
    </Box>
  );
}
