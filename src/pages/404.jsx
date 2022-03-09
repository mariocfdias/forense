import Head from "next/head";
import NextLink from "next/link";
import { Box, Grid, Typography } from "@mui/material";
import {
    gridContainer,
    gridForm,
    gridSidebar,
    logo,
    titleBox,
    title,
    imageSidebar,
    containerSidebar
} from "../styles/styles"

const NotFound = () => {
    return (
        <>
            <Head>
                <title>Login | Foto Detective</title>
            </Head>
            <Box component="main">
                <Grid container sx={gridContainer}>
                    <Grid item md={7} xs={12} sx={gridForm}>
                        <Box
                            component="img"
                            src="/static/forense-logo.svg"
                            alt="Foto Detective logo"
                            sx={logo}
                        ></Box>
                        <Box sx={titleBox}>
                            <Typography component="h2" sx={{ ...title("#162C44", 135), lineHeight: "8rem" }}>
                                404
                            </Typography>
                            <Typography component="h2" sx={title("#0583C1")}>
                                Desculpa, não encontramos
                            </Typography>
                            <Typography component="h2" sx={title("#0583C1")}>
                                a página que você buscava...
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={5} sx={gridSidebar}>
                        <Box sx={containerSidebar}>
                            <Box
                                component="img"
                                sx={imageSidebar}
                                alt="Imagem de reconhecimento de faces"
                                src="/static/images/screens/forense-notfound-frame.svg"
                            ></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default NotFound;
