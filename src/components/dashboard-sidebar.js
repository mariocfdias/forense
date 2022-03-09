import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { Users as UsersIcon } from "../icons/users";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Reports as ReportsIcon } from "../icons/reports";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavItem } from "./nav-item";

const iconSize = "large";

const items = [
  {
    href: "/users",
    icon: <UsersIcon fontSize={iconSize} />,
    title: "Usuarios",
  },
  {
    href: "/permissions",
    icon: <UserAddIcon fontSize={iconSize} />,
    title: "Permissões",
  },
  {
    href: "/reports",
    icon: <ReportsIcon fontSize={iconSize} />,
    title: "Laudos",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#FFF",
          borderRadius: "0 20px 20px 0",
        }}
      >
        <div>
          <Box sx={{ py: 3.5, display: "flex", justifyContent: "center" }}>
            <NextLink href="/" passHref>
              <a>
                <Box
                  component="img"
                  src="/static/forense-logo.svg"
                  alt="Logo Foto Detective"
                  sx={{ width: 56, height: 56 }}
                ></Box>
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            border: "3px solid #EAEFFB",
            backgroundColor: "#EAEFFB",
            mb: 2,
            mt: 1,
            width: "80%",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider
          sx={{
            border: "3px solid #EAEFFB",
            backgroundColor: "#EAEFFB",
            my: 1,
            width: "80%",
          }}
        />
        <Box
          sx={{
            px: 2,
            pt: 1,
            pb: 4,
          }}
        >
          <NextLink href="/" passHref>
            <IconButton
              component="a"
              size="large"
              sx={{
                backgroundColor: "#D16343",
                borderRadius: 0.5,
                color: "#EAEFFB",
                width: 10,
                height: 40,
                fontWeight: "fontWeightBold",
                justifyContent: "center",
                px: 3,
                textAlign: "left",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#D18343",
                },
              }}
            >
              <ExitToAppIcon fontSize="large" />
            </IconButton>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#EAEFFB",
            color: "#FFFFFF",
            width: 130,
            overflow: "hidden",
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#EAEFFB",
          color: "#FFFFFF",
          width: 130,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
