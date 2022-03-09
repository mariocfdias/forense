import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormHelperText
} from "@mui/material";
import { Error } from "@mui/icons-material"
import { useState } from "react";
import {
    gridContainer,
    gridForm,
    gridSidebar,
    logo,
    titleBox,
    title,
    subtitle,
    form,
    btnSignUp,
    imageSidebar,
    containerSidebar
} from "../styles/styles"

const ChangePwd = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email("Formato de e-mail inválido")
                .max(255)
                .required("O campo e-mail é obrigatório")
        }),
        onSubmit: () => {
            router.push("/");
        },
    });

    const [isSent, setSent] = useState(false);

    const sendEmail = (event) => {
        event.preventDefault()
        setSent(!isSent)
    }

    return (
        <>
            <Head>
                <title>Esqueceu a senha? | Foto Detective</title>
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
                        {
                            !isSent ?
                                (
                                    <>
                                        <Box sx={titleBox}>
                                            <Typography component="p" sx={title("#162C44")}>
                                                Esqueceu sua senha?
                                            </Typography>
                                            <Typography component="p" sx={title("#162C44")}>
                                                Não se preocupe, Vamos te ajudar!
                                            </Typography>
                                        </Box>
                                        <Typography sx={subtitle}>
                                            Preencha seu e-mail abaixo
                                        </Typography>
                                        <form style={form} onSubmit={formik.handleSubmit}>
                                            <FormControl
                                                error={Boolean(formik.touched.email && formik.errors.email)}
                                                variant="outlined"
                                                size="small"
                                            >
                                                <InputLabel htmlFor="email">E-MAIL</InputLabel>
                                                <OutlinedInput
                                                    id="email"
                                                    label="E-MAIL"
                                                    type="text"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    aria-describedby="email"
                                                    sx={{ width: 564 }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton edge="end">
                                                                {
                                                                    Boolean(formik.touched.email && formik.errors.email) ?
                                                                        <Error sx={{ color: 'red' }} /> :
                                                                        null
                                                                }
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText id="email">
                                                    {formik.touched.email && formik.errors.email}
                                                </FormHelperText>
                                            </FormControl>
                                            <Box sx={{ width: 564, display: "flex", justifyContent: "space-between" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={btnSignUp}
                                                    onClick={e => sendEmail(e)}
                                                    type="submit"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    Enviar
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => router.back()}
                                                    sx={{ ...btnSignUp, "&:hover": { color: "#0583C1", } }}
                                                >
                                                    Voltar
                                                </Button>
                                            </Box>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <Box sx={titleBox}>
                                            <Typography component="p" sx={title("#162C44")}>
                                                UM EMAIL COM O LINK DE REDEFINIÇÃO DE SENHA FOI ENVIADO PARA VOCÊ.
                                            </Typography>
                                        </Box>
                                        <Typography sx={subtitle}>
                                            Verifique sua caixa de entrada ou de spam.
                                        </Typography>
                                    </>
                                )
                        }
                    </Grid>
                    <Grid item md={5} sx={gridSidebar}>
                        <Box sx={containerSidebar}>
                            <Box
                                component="img"
                                sx={imageSidebar}
                                alt="Imagem de reconhecimento de faces"
                                src={
                                    !isSent ?
                                        "/static/images/screens/forense-changepwd-frame.svg" :
                                        "/static/images/screens/forense-recovery-frame.svg"
                                }
                            ></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ChangePwd;
