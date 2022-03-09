import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Avatar
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionButton } from "../crud/action-button";

export const ListResults = ({ images, deleteFunction, editFunction }) => {
  console.log('imagens', images)
  return (
    <>
      <Card sx={{ p: 1, overflow: "hidden" }}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <TableContainer sx={{ height: "60vh" }}>
              <Table sx={{ p: 1, height: "max-content" }}>
                <colgroup>
                  <col width="15%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="5%" />
                </colgroup>
                <TableHead
                  sx={{
                    backgroundColor: "#FFF",
                    color: "#C1C1C1",
                    borderBottom: "1px solid #C1C1C1",
                  }}
                >
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">TITULO</TableCell>
                    <TableCell align="left">DESCRIÇÃO</TableCell>
                    <TableCell align="left">IMAGEM</TableCell>
                    <TableCell align="left">CRIADO EM</TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {images?.map((image) => (
                    <TableRow
                      key={image.id}
                      sx={{ backgroundColor: image.id % 2 == 1 ? "#F5F8FF" : "#FFF" }}
                    >
                      <TableCell align="left">
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <Typography color="textPrimary" variant="body1">
                            {image.id}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <Typography color="textPrimary" variant="body1">
                            {image.title}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <Typography color="textPrimary" variant="body1">
                            {image.description}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <Typography color="textPrimary" variant="body1">
                          <TableCell><Avatar alt={image.title} src={image.base_image}/></TableCell>
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="left">
                        <Box sx={{ alignItems: "center", display: "flex" }}>
                          <Typography color="textPrimary" variant="body1">
                            {image.created_at}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <ActionButton
                          imageId={image.id}
                          icon={<MoreVertIcon />}
                          editFunction={() => {
                            console.log(image)
                            editFunction(image)}}
                          deleteFunction={() => {
                            deleteFunction(image.id)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};
