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
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActionButton } from "../crud/action-button";

export const UserListResults = ({
  users,
  deleteFunction,
  editFunction,
  page,
  rowsPerPage,
  searchFor,
}) => {
  const tableHeight = 52;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users?.length - page * rowsPerPage);

  return (
    <>
      <Card sx={{ p: 1, overflow: "hidden" }}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <TableContainer sx={{ height: "58vh" }}>
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
                    <TableCell align="left">NOME</TableCell>
                    <TableCell align="left">E-MAIL</TableCell>
                    <TableCell align="left">EMPRESA</TableCell>
                    <TableCell align="left">PERMISSÕES</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                {users && users.length > 0 ? (
                  <TableBody>
                    {users
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user, id) => (
                        <TableRow
                          key={user.id}
                          sx={{ backgroundColor: id % 2 == 1 ? "#F5F8FF" : "#FFF" }}
                          style={{ height: tableHeight }}
                        >
                          <TableCell align="left" sx={{ py: 0, minWidth: 230 }}>
                            <Box sx={{ alignItems: "center", display: "flex" }}>
                              <Typography color="textPrimary" variant="body1">
                                {`${user.first_name} ${user.last_name}`}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="left" sx={{ py: 0 }}>
                            <Box sx={{ alignItems: "center", display: "flex" }}>
                              <Typography color="textPrimary" variant="body1">
                                {user.email}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="left" sx={{ py: 0 }}>
                            <Box sx={{ alignItems: "center", display: "flex" }}>
                              <Typography color="textPrimary" variant="body1">
                                {user.groups}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="left" sx={{ py: 0 }}>
                            <Box sx={{ alignItems: "center", display: "flex" }}>
                              <Typography color="textPrimary" variant="body1">
                                {user.user_permissions}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="right" sx={{ py: 0 }}>
                            <ActionButton
                              userId={user.id}
                              icon={<MoreVertIcon />}
                              editFunction={editFunction}
                              deleteFunction={deleteFunction}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: tableHeight * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow style={{ height: tableHeight * emptyRows }}>
                      <TableCell colSpan={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box
                            component="img"
                            sx={{ width: 100, height: 130 }}
                            alt="Imagem de reconhecimento de faces"
                            src="/static/images/not-found.svg"
                          />
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontWeight: 700,
                              color: "#878787",
                              maxWidth: "35%",
                            }}
                          >
                            DESCULPA, NÃO ENCONTRAMOS RESULTADOS PARA A BUSCA{" "}
                            <Box
                              component="span"
                              sx={{ display: "inline-block", fontWeight: 700, color: "#0559C1" }}
                            >
                              {searchFor.toUpperCase()}
                            </Box>
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};
