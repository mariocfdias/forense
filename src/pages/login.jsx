import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { useContext } from "react";
import { AuthContext } from "src/providers/contexts/AuthContext";
import { useWarningProvider } from 'src/providers/contexts/WarningContext';
import { StyledDivider } from "src/components/styledDivider";

import { Google } from "src/icons/google";
import { Facebook } from "src/icons/facebook";
import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
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
  text,
  form,
  btnResetPwd,
  btnSignUp,
  roundedButton,
  registerLink,
  containerSidebar,
  imageSidebar,
} from "src/styles/styles";

const Login = () => {
  const { signIn } = useContext(AuthContext)
  const { emitMessage } = useWarningProvider()

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Formato de e-mail inválido")
        .max(255)
        .required("O campo e-mail é obrigatório"),
      password: Yup
        .string()
        .min(6, "O campo senha deve ter pelo menos 6 caracteres")
        .max(255, "O campo senha deve ter no máximo 255 caracteres")
        .required("O campo senha é obrigatório"),
    }),
    onSubmit: (values) => {
      signIn(values).then((res) => {
        if (res.status) {
          emitMessage('success', "Usuario autenticado com sucesso")
          router.push("/");
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
              <Typography component="p" sx={title("#162C44")}>
                BEM-VINDO(A) AO{" "}
                <Typography component="spam" sx={title("#0583C1")}>
                  FOTO DETECTIVE
                </Typography>
              </Typography>
              <Typography component="p" sx={title("#162C44")}>
                É UM PRAZER TER VOCÊ AQUI CONOSCO!
              </Typography>
            </Box>
            <Typography sx={subtitle}>Faça login com a sua conta</Typography>
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
                  aria-describedby="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onClick={() => formik.setErrors({ ...formik.errors, email: "" })}
                  onBlur={formik.handleBlur}
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
                />
                <FormHelperText id="email">
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>

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
                  aria-describedby="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onClick={() => formik.setErrors({ ...formik.errors, password: "" })}
                  onBlur={formik.handleBlur}
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
                />
                <FormHelperText id="password">
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>

              <NextLink href="/change-password">
                <Link underline="none" to="/change-password" sx={btnResetPwd}>
                  Esqueceu a senha
                </Link>
              </NextLink>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={btnSignUp}
              >
                Entrar
              </Button>

              <StyledDivider>ou entrar com conta</StyledDivider>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton sx={{
                  width: 70,
                  borderRadius: "10px",
                  border: "1px solid #CDC7C7",
                  backgroundColor: "#FFFF"
                }}>
                  <Google />
                </IconButton>

                <IconButton sx={{
                  width: 70,
                  borderRadius: "10px",
                  border: "1px solid #CDC7C7",
                  backgroundColor: "#0C5DC1",
                  "&:hover": {
                    backgroundColor: "#0583C1",
                  }
                }}>
                  <Facebook />
                </IconButton>
              </Box>

              <Typography sx={registerLink}>
                Ainda não tem conta?{" "}
                <NextLink href="/register">
                  <Link underline="none" to="/register" sx={{ "&:hover": { cursor: "pointer", color: "#0583C1" } }}>
                    Registre-se aqui
                  </Link>
                </NextLink>
              </Typography>
            </form>
          </Grid>
          <Grid item md={5} sx={gridSidebar}>
            <Box sx={containerSidebar}>
              <Box
                component="img"
                sx={imageSidebar}
                alt="Imagem de reconhecimento de faces"
                src="/static/images/screens/forense-login-frame.svg"
              ></Box>
              <Box>
                <Button variant="contained" sx={roundedButton}>
                  Saiba mais
                </Button>
                <Typography variant="body1" sx={text}>
                  Todos os recursos do foto detective podem ser controlados por meio da interface
                  web. Você pode fazer upload de imagens, navegar por relatórios e obter uma visão
                  geral rápida ou profunda da análise de imagens.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
