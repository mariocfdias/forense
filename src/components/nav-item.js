import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem, IconButton } from "@mui/material";

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      sx={{
        display: "flex",
        mb: 1,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <IconButton
          component="a"
          size="large"
          sx={{
            backgroundColor: active && "#EFF4FF",
            borderRadius: 0.5,
            color: active ? "#0583C1" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "center",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "#0583C1" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "#EFF4FF",
            },
          }}
        >
          {icon}
        </IconButton>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
