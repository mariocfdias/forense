import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  IconButton,
  Popover,
  List,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import {useState, useEffect} from "react";

import {Menu as MenuIcon} from '../../icons/menu';
import {Arrow as ArrowIcon} from '../../icons/sort-arrow' 
import {TableHeaders, TableDatas, TablePermissions, TableIcons, PopoverText} from '../../styles/styles'
import {ManageDate} from './settings-notifications'
import {Edit as EditIcon, Duplicate as DuplicateIcon, Delete as DeleteIcon ,Test} from '../../icons/permission-popover';
import {DeleteModal} from './permissions-modal';
import { useUserProvider } from "src/providers/contexts/cruds/UserProvider";
import { PermissionsPopOver } from "./permissions-popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const PermissionsTable = ({users, deleteFunction, editFunction}) => {

    // const [users, setUsers] = useState(users)
    // const [order, setOrder] = useState("asc")

    // const sorting = (col) => {
    //     console.log(users)
    //     if (order === 'asc') {
    //         const sorted = [...users].sort((a,b) => 
    //         a.col.toLowerCase() > b[col].toLowerCase() ? 1: -1);
    //         setUsers(sorted)
    //         setOrder("dsc")
    //     }
    //     if (order === 'dsc') {
    //         const sorted = [...users].sort((a,b) => 
    //         a.col.toLowerCase() < b[col].toLowerCase() ? 1: -1);
    //         setUsers(sorted)
    //         setOrder("asc")
    //     }
    // }

    // useEffect(() => {
    //     sorting(users.id)
    // }, users)

    return (
        <>
            <Card sx={{ p: 1, overflow: "hidden"}}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050}}>
                        <TableContainer sx={{height: "70vh"}}>
                            <Table sx={{ p: 1, height: "max-content"}}>
                                <colgroup>
                                    <col width="25%" />
                                    <col width="25%" />
                                    <col width="25%" />
                                    <col width="5%" />
                                </colgroup>
                                <TableHead
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#C1C1C1",
                                    borderBottom: "1px solid #C1C1C1"
                                }}>
                                    <TableRow>
                                        <TableCell align="left">
                                            <Typography sx={TableIcons}>
                                                PERMISSÃO
                                                <IconButton>
                                                    <ArrowIcon/>
                                                </IconButton>
                                                
                                            </Typography>
                                                
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography sx={TableHeaders}>
                                                DATA DE CRIAÇÃO
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography sx={TableHeaders}>
                                                MODIFICAÇÃO
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user, id) => (
                                        <TableRow key={id} sx={{backgroundColor: id % 2 == 1 ? "#F5F8FF": "#FFF"}}>
                                            <TableCell  align="left">
                                                <Box sx={{ alignItems: "center", display: "flex" }}>
                                                    <Typography color="textPrimary" variant="body1" sx={TablePermissions}>
                                                        {`Permissão ${user.id}`}
                                                        
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ alignItems: "center", display: "flex" }}>
                                                    <Typography color="textPrimary" variant="body1" sx={TablePermissions}>
                                                        <ManageDate date={user.created_at}/>
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ alignItems: "center", display: "flex" }}>
                                                    <Typography color="textPrimary" variant="body1" sx={TablePermissions}>
                                                        <ManageDate date={user.updated_at}/>
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                            <PermissionsPopOver
                                            userId={user.id}
                                            icon={<MenuIcon />}
                                            deleteFunction={deleteFunction}
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
    )
}