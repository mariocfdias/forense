import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";

import { AuthContext } from "src/providers/contexts/AuthContext";
import { useContext } from "react";

import Breadcrumbs from "./breadcrumbs";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { user } = useContext(AuthContext);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 136,
          },
          width: {
            lg: "calc(100% - 177px)",
          },
          m: 2,
          borderRadius: "10px",
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Breadcrumbs />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              color: "#000",
              p: 1,
            }}
          >
            <Avatar
              sx={{
                height: 50,
                width: 50,
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography sx={{ color: "#162C44", fontWeight: 700, fontSize: 22 }}>
                {user.get_full_name || "Usuário"}
              </Typography>
              <Typography sx={{ color: "#878787", fontWeight: 600, fontSize: 12, lineHeight: 1 }}>
                Seja bem-vindo(a)
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
