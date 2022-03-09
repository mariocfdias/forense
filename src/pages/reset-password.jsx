import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
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
import { Visibility, VisibilityOff, Error } from "@mui/icons-material"
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

const ResetPwd = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup
                .string()
                .max(255)
                .required("O campo senha é obrigatório"),
            confirmPassword: Yup
                .string()
                .max(255)
                .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
        }),
        onSubmit: () => {
            router.push("/");
        },
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const [isSent, setSent] = useState(false);

    const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);

    return (
        <>
            <Head>
                <title>Mude sua senha | Foto Detective</title>
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
                        {!isSent ? (
                            <>
                                <Box sx={titleBox}>
                                    <Typography component="p" sx={title("#162C44")}>
                                        CRIA A SUA NOVA SENHA
                                    </Typography>
                                </Box>
                                <Typography sx={subtitle}>
                                    Preencha os campos abaixo
                                </Typography>
                                <form style={form} onSubmit={formik.handleSubmit}>
                                    <FormControl
                                        error={Boolean(formik.touched.password && formik.errors.password)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        <InputLabel htmlFor="password">NOVA SENHA</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            label="NOVA SENHA"
                                            type={passwordVisibility ? 'text' : 'password'}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            aria-describedby="password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {!passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        ></OutlinedInput>
                                        <FormHelperText id="password">
                                            {formik.touched.password && formik.errors.password}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        <InputLabel htmlFor="confirmPassword">CONFIRMAR NOVA SENHA</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            label="CONFIRMAR NOVA SENHA"
                                            type={passwordVisibility ? 'text' : 'password'}
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            aria-describedby="confirmPassword"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {!passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        ></OutlinedInput>
                                        <FormHelperText id="confirmPassword">
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        </FormHelperText>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        variant="contained"
                                        color="primary"
                                        sx={btnSignUp}
                                        onClick={() => setSent(!isSent)}
                                    >
                                        Criar nova senha
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Box sx={titleBox}>
                                    <Typography component="p" sx={title("#162C44")}>
                                        A SENHA FOI ATUALIZADA!
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => router.push("/login")}
                                    sx={{ ...btnSignUp, mt: 4, "&:hover": { backgroundColor: "#0583C1", } }}
                                >
                                    Ir para o login
                                </Button>
                            </>
                        )}
                    </Grid>
                    <Grid item md={5} sx={gridSidebar}>
                        <Box sx={containerSidebar}>
                            <Box
                                component="img"
                                sx={imageSidebar}
                                alt="Imagem de reconhecimento de faces"
                                src={!isSent ?
                                    "/static/images/screens/forense-redefine-frame.svg" :
                                    "/static/images/screens/forense-sucessredefine-frame.svg"
                                }
                            ></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ResetPwd;
