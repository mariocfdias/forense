import { theme } from "src/theme";

export const gridContainer = {
  height: "100vh",
  width: "100vw",
};

export const gridForm = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  px: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    p: theme.spacing(3),
  },
  [theme.breakpoints.between("md", "lg")]: {
    px: theme.spacing(6),
  },
};

export const gridSidebar = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  px: theme.spacing(4),
  background: "url(/static/images/screens/sidebar-background.svg) no-repeat center center",
  backgroundSize: "cover",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
};

export const logo = {
  width: "3rem",
  height: "3rem",
  mb: "4%",
  [theme.breakpoints.down("sm")]: {
    width: 47,
    height: 47,
  },
};

export const titleBox = {
  mb: theme.spacing(1),
};

export function title(color, fontsize) {
  return {
    fontWeight: 700,
    fontSize: fontsize ? fontsize : "1.9rem",
    lineHeight: "2.2rem",
    width: "100%",
    color: color ? color : "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: fontsize ? 80 : 16.2,
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: fontsize ? fontsize : 35,
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: fontsize ? fontsize : 25,
    },
  };
}

export const subtitle = {
  fontWeight: 600,
  fontSize: "1rem",
  color: "#878787",
  mt: theme.spacing(0.5),
  mb: "3%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 15,
    mb: theme.spacing(4),
  },
};

export const form = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
};

export const btnResetPwd = {
  display: "inline",
  fontWeight: 600,
  fontSize: "0.8rem",
  mt: "2%",
  width: 150,
  [theme.breakpoints.down("sm")]: {
    fontSize: 15,
    mb: theme.spacing(2),
  },
  "&:hover": {
    cursor: "pointer",
    color: "#0583C1",
  },
};

export const btnSignUp = {
  width: 200,
  mb: theme.spacing(1),
  mt: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    mb: theme.spacing(1),
    mt: theme.spacing(1),
  },
  "&:hover": {
    backgroundColor: "#0583C1",
  },
};

export const formLine = {
  display: "flex",
  width: "100%",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
};

export const registerLink = {
  fontWeight: 700,
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
};

export const imageSidebar = {
  width: "80%",
};

export const containerSidebar = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(4),
  mx: theme.spacing(2),
};

export const text = {
  fontWeight: 500,
  fontSize: "1.2rem",
  letterSpacing: 0.183239,
  lineHeight: 1.1,
  color: "#FFF",
};

export const roundedButton = {
  backgroundColor: "#FFF",
  borderRadius: 20,
  color: "#0583C1",
  mb: theme.spacing(3),
  "&:hover": {
    backgroundColor: "#0583C1",
    color: "#FFF",
  },
};

export const imageEditor = {
  mt: theme.spacing(0),
  ml: theme.spacing(2),
}

export const imageButton = {
  mb: theme.spacing(3),
  width: "50%",
  borderRadius: "8px"
}


export const TableRectangle = {
  position: "absolute",
  width: "1279px",
  height: "665.07px",
  left: "146px",
  top: "160.69px",
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
}

export const TablePermissions = {
  fontFamily: "Poppins",
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "16px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "capitalize",
  color: "#6D7B8A",
}

export const TableDatas = {
  fontFamily: "Poppins",
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "16px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "lowercase",
  color: "#6D7B8A",
}

export const TableHeaders = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "uppercase"

}

export const TableIcons = {
  display: "flex",
  alignItems: "center",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "uppercase"

}

export const PopoverText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "capitalize",
  marginLeft: "10px", 
  color: "#6D7B8A"
}


export const DialogText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "25px",
  textAlign: "center",
  letterSpacing: "0.18px",
  textTransform: "uppercase",
  color: "#878787", 
  marginTop: "30px"
}

export const DialogCancelButton = { 
  border: "2px solid #0559C1",
  "&:hover": {
    border: "2px solid #0559C1",
  },
  border: "2px solid #0559C1",
}
export const DialogCancelButtonLg = { 
  width: "256px",
  height: "49px", 
  border: "2px solid #0559C1",
  "&:hover": {
    border: "2px solid #0559C1",
  },
  border: "2px solid #0559C1",
}

export const DialogConfirmButton = {
  "&:hover": {
    backgroundColor: "#0559C1",
    color: "#fff"
  }
}

export const DialogInputArea = {
  // border: "2px solid #C1C1C1"
  borderColor: "red",
  fontFamily: "Poppins",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "500",
  fontStyle: "normal",
  textTransform: "uppercase",
  lineHeight: "15px",
  letterSpacing: "0.18px",
  color: "#878787",
}

export const DialogTitleArea = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "42px",
  textAlign: "center",
  letterSpacing: "0.183239px",
  textTransform: "uppercase",
  color: "#0583C1", 
  display: "inline",

}

export const DialogPermissionButton = {
  width: "163px",
  height: "49px",
  border: "2px solid #EAEDF0",
  borderRadius: "10px", 
  color: "#878787",
  marginRight: "10px",
  "&:hover": {
    color: "#878787",
    backgroundColor: "#fff",
    border: "2px solid #EAEDF0",
  },
  // "&:focus": {
  //   backgroundColor: "#0559C1",
  //   color: "#fff"
  // }
}

export const DialogCheckBox = {
  color: "#C1C1C1",
  borderRadius: "5px"
}

export const CheckLabel = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "15px",
  lineHeight: "15px",
  letterSpacing: "0.183239px",
  textTransform: "uppercase",
  color: "#878787"
}

export const DialogSentButton = {
  width: "256px",  
  height: "49px",
  "&:hover": {
    backgroundColor: "#0559C1",
    color: "#fff"
  }
}

export const PaginationTypography = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "uppercase",
  color: "#C1C1C1",
  marginLeft: "10px"
}

export const PaginationNumber = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  letterSpacing: "0.183239px",
  textTransform: "uppercase",
  color: "#0559C1",
}

export const PaginationItems = {
  backgroundColor:"#DCE5F0", 
  color: "#0559C1", 
  fontFamily: "Inter", 
  fontStyle: "normal", 
  fontWeight: "bold", 
  fontSize: "15px", 
  lineHeight: "18px",
  display: "flex",
  alignItems: "center", 
  textAlign: "center"
}

export const DialogPermissions = {
  fontFamily: "Poppins", 
  fontStyle: "normal", 
  fontWeight: "500", 
  fontSize: "15px", 
  lineHeight: "15px",
  display: "flex",
  alignItems: "center", 
  textAlign: "center",
  letterSpacing: "0.183239px",
  textTransform: "uppercase",
  color: "#878787"
}