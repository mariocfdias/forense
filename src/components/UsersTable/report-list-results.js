import { useState } from "react";
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
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { ActionButton } from "./report-action-button";

export const ReportListResults = ({ reports, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [report, setReport] = useState({});

  function verifyModal(event, id) {
    setReport(reports[id - 1]);
    handleOpen();
  }

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
                          onclick={verifyModal}
                        />
                        <ActionButton
                          id={report.id}
                          icon={<DeleteIcon />}
                          label="Deletar laudo"
                          onclick={verifyModal}
                        />
                        <ActionButton
                          id={report.id}
                          icon={<FactCheckIcon />}
                          label="Verificar laudo"
                          onclick={verifyModal}
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
      <Modal open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #777",
            borderRadius: "0.5rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box component="h4" sx={{ fontSize: 30 }}>
            {report.name}
          </Box>
          <hr />
          <Typography sx={{ my: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias fuga
            voluptatum cum amet repudiandae debitis numqua.
          </Typography>
          <Box component="h5" sx={{ fontSize: 20 }}>
            Equipe responsável
          </Box>
          <hr />
          <Box sx={{ mx: 4, mt: 2 }}>
            <ul>
              {report?.criminalists?.map((criminalist) => (
                <li key={criminalist?.id}>{criminalist.name}</li>
              ))}
            </ul>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

ReportListResults.propTypes = {
  reports: PropTypes.array.isRequired,
};
