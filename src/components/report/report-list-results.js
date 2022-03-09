import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { ActionButton } from "../crud/action-button";

export const ReportListResults = ({
  reports,
  deleteFunction,
  editFunction,
  verifyFunction,
  ...rest
}) => {
  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Peritos</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow hover key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {report.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {report.criminalists
                        .map((criminalist) => criminalist.name)
                        .toString()
                        .split(",")
                        .join(", ")}
                    </TableCell>
                    <TableCell>{format(report.createdAt, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ActionButton
                          id={report.id}
                          icon={<EditIcon />}
                          label="Editar laudo"
                          onclick={editFunction}
                        />
                        <ActionButton
                          id={report.id}
                          icon={<DeleteIcon />}
                          label="Deletar laudo"
                          onclick={deleteFunction}
                        />
                        <ActionButton
                          id={report.id}
                          icon={<FactCheckIcon />}
                          label="Verificar laudo"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

ReportListResults.propTypes = {
  reports: PropTypes.array.isRequired,
};
