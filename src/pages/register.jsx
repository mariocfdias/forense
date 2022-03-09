import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import * as Yup from "yup";
import { AuthContext } from "src/providers/contexts/AuthContext";

import {
    Box,
    Button,
    Grid,
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
    formLine,
    btnSignUp,
    imageSidebar,
    containerSidebar,
    text,
    roundedButton
} from "../styles/styles"
import { useWarningProvider } from 'src/providers/contexts/WarningContext';

const Register = () => {
    const { emitMessage } = useWarningProvider()
    const { signOn } = useContext(AuthContext)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            password2: "",
        },
        validationSchema: Yup.object({
            firstName: Yup
                .string()
                .max(255)
                .required("O campo nome é obrigatório"),
            lastName: Yup
                .string()
                .max(255)
                .required("O campo sobrenome é obrigatório"),
            email: Yup
                .string()
                .email("Formato de e-mail inválido")
                .max(255).required("O campo e-mail é obrigatório"),
            phoneNumber: Yup
                .string()
                .max(11, "Precisa ser um número válido")
                .matches(phoneRegExp, 'Precisa ser um número válido'),
            password: Yup
                .string()
                .min(6, "Mínimo de 6 caracteres")
                .max(255, "Máximo de 255 caracteres")
                .required("O campo senha é obrigatório"),
            password2: Yup
                .string()
                .min(6, "Mínimo de 6 caracteres")
                .max(255, "Máximo de 255 caracteres")
                .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
        }),
        onSubmit: (data) => {
            console.log("Dados enviados no submit: ", data);
            let registerData = {
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                phone_number: data.phoneNumber ? `+${data.phoneNumber}` : "",
                password: data.password,
                password2: data.password
            }

            signOn(registerData).then((res) => {
                if (res.status) {
                    emitMessage('success', "Usuario registrado com sucesso")
                    formik.handleReset();
                    router.push("/login")
                }
            }).catch((err) => {
                emitMessage('error', err.message)
                formik.handleReset();
            })
        },
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleClickShowPassword = () => setPasswordVisibility(!passwordVisibility);

    return (
        <>
            <Head>
                <title>Register | Foto Detective</title>
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
                            <Typography component="p" sx={title("#162C44")}>
                                Faça aqui a sua conta e seja
                            </Typography>
                            <Typography component="p" sx={title("#162C44")}>
                                Bem-vindo(a) ao{" "}
                                <Typography component="spam" sx={title("#0583C1")}>
                                    Foto Detective
                                </Typography>
                            </Typography>
                        </Box>
                        <Typography sx={subtitle}>Registre-se aqui</Typography>
                        <form
                            style={{ ...form, flexWrap: 'wrap', flexDirection: 'row' }}
                            onSubmit={formik.handleSubmit}
                        >
                            <Box sx={formLine}>
                                <FormControl
                                    error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <InputLabel htmlFor="firstName">NOME</InputLabel>
                                    <OutlinedInput
                                        id="firstName"
                                        label="NOME"
                                        type="text"
                                        aria-describedby="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onClick={() => formik.setErrors({ ...formik.errors, firstName: "" })}
                                        onBlur={formik.handleBlur}
                                        sx={{ minWidth: 253 }}
                                        endAdornment={
                                            Boolean(formik.touched.firstName && formik.errors.firstName) ?
                                                (<>
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end">
                                                            <Error sx={{ color: 'red' }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>) :
                                                null
                                        }
                                    />
                                    <FormHelperText id="firstName">
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </FormHelperText>
                                </FormControl>

                                <FormControl
                                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <InputLabel htmlFor="lastName">SOBRENOME</InputLabel>
                                    <OutlinedInput
                                        id="lastName"
                                        label="SOBRENOME"
                                        type="text"
                                        aria-describedby="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onClick={() => formik.setErrors({ ...formik.errors, lastName: "" })}
                                        onBlur={formik.handleBlur}
                                        sx={{ minWidth: 253 }}
                                        endAdornment={
                                            Boolean(formik.touched.lastName && formik.errors.lastName) ?
                                                (<>
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end">
                                                            <Error sx={{ color: 'red' }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>) :
                                                null
                                        }
                                    ></OutlinedInput>
                                    <FormHelperText id="firstName">
                                        {formik.touched.lastName && formik.errors.lastName}
                                    </FormHelperText>
                                </FormControl>
                            </Box>

                            <Box sx={formLine}>
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
                                        aria-describedby="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onClick={() => formik.setErrors({ ...formik.errors, email: "" })}
                                        onBlur={formik.handleBlur}
                                        sx={{ minWidth: 253 }}
                                        endAdornment={
                                            Boolean(formik.touched.email && formik.errors.email) ?
                                                (<>
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end">
                                                            <Error sx={{ color: 'red' }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>) :
                                                null
                                        }
                                    ></OutlinedInput>
                                    <FormHelperText id="email">
                                        {formik.touched.email && formik.errors.email}
                                    </FormHelperText>
                                </FormControl>

                                <FormControl
                                    error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <InputLabel htmlFor="phoneNumber">TELEFONE</InputLabel>
                                    <OutlinedInput
                                        id="phoneNumber"
                                        label="TELEFONE"
                                        type="text"
                                        aria-describedby="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onClick={() => formik.setErrors({ ...formik.errors, phoneNumber: "" })}
                                        onBlur={formik.handleBlur}
                                        sx={{ minWidth: 253 }}
                                        endAdornment={
                                            Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber) ?
                                                (<>
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end">
                                                            <Error sx={{ color: 'red' }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>) :
                                                null
                                        }
                                    ></OutlinedInput>
                                    <FormHelperText id="phoneNumber">
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={formLine}>
                                <FormControl
                                    error={Boolean(formik.touched.password && formik.errors.password)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <InputLabel htmlFor="password">SENHA</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        label="SENHA"
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
                                    error={Boolean(formik.touched.password2 && formik.errors.password2)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <InputLabel htmlFor="password2">CONFIRMAR SENHA</InputLabel>
                                    <OutlinedInput
                                        id="password2"
                                        label="CONFIRMAR SENHA"
                                        type={passwordVisibility ? 'text' : 'password'}
                                        value={formik.values.password2}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        aria-describedby="password2"
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
                                    <FormHelperText id="password2">
                                        {formik.touched.password2 && formik.errors.password2}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: 564, display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    variant="contained"
                                    color="primary"
                                    sx={btnSignUp}
                                >
                                    Criar conta
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
                    </Grid>
                    <Grid item md={5} sx={gridSidebar}>
                        <Box sx={containerSidebar}>
                            <Box
                                component="img"
                                sx={imageSidebar}
                                alt="Imagem de reconhecimento de faces"
                                src="/static/images/screens/forense-register-frame.svg"
                            ></Box>
                            <Box>
                                <Button variant="contained" sx={roundedButton}>
                                    Registre-se
                                </Button>
                                <Typography variant="body1" sx={text}>
                                    Faça parte da plataforma foto detective e tenha acesso a ferramentas
                                    poderasas e exclusivas na área de análise forense de imagem automatizada.
                                    Vai ser um prazer ter você aqui conosco.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Register;
