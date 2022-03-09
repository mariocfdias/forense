import { Breadcrumbs as MUIBreadcrumbs, Typography, Box, Link } from "@mui/material";
import { withRouter } from "next/router";

const Breadcrumbs = (props) => {
  const {
    router: { pathname },
  } = props;

  const pathnames = pathname.split("/").filter((x) => x && !x.includes("["));

  function translatePathname(pathname) {
    switch (pathname) {
      case "users":
        return "Usuários";
      case "customers": // TODO: atualizar para o link de imagens
        return "Imagens";
      case "reports":
        return "Laudos";
      case "account":
        return "Conta";
      case "permissions":
        return "Permissões";
    }
  }

  return (
    <Box component="div">
      <MUIBreadcrumbs aria-label="breadcrumb" separator="|">
        <Link underline="hover" color="inherit" href="/">
          Página inicial
        </Link>
        {pathnames.map((pageName, idx) => {
          const routeTo = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathnames.length - 1;

          return isLast ? (
            <Typography sx={{ color: "#0583C1", fontWeight: 800 }} key={idx}>
              {translatePathname(pageName)}
            </Typography>
          ) : (
            <Link key={idx} underline="hover" color="inherit" href={routeTo}>
              {translatePathname(pageName)}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
};

export default withRouter(Breadcrumbs);
