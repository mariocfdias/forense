import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import {useFormik} from 'formik';
import {useRouter} from "next/router";
import {useWarningProvider} from "../../providers/contexts/WarningContext";
import * as Yup from 'yup';
import api from "../../providers/services/api"
import {parseCookies} from "nookies";

export const AccountProfileDetails = (props) => {

  const {emitMessage} = useWarningProvider()
  const router = useRouter();


  // const getData = () => {
  //   api.get("/auth/user").then(response => {
  //     setValues(response.data)
  //   }).catch(error => {
  //     console.log(error);
  //     const {"forense-refresh-token": refreshToken} = parseCookies();
  //     api.post("/auth/token/refresh/", {"refresh": refreshToken}).then(response => {
  //       const {"access": token} = response.data
  //       api.defaults.headers["Authorization"] = `Bearer ${token}`
  //       api.get("/auth/user").then(response => {
  //         setValues(response.data)
  //       })
  //     })
      
  //   })
  // }
  const getData = () => {
    api.get("/auth/me/").then(response => {
      setValues(response.data)
    });
  }



  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    onSubmit: (values) => {
      putData(values);
    }
  })


  useEffect(() => {
    getData();
  }, []);

  
  const putData = (values) => {
      api.put("/auth/me/", values).then(response => {
        console.log(response.data)
        emitMessage("success", "Atualizado com sucesso")
        setTimeout(() => {
          router.push("/")
        }, 1000);
      }).catch(err => {
        emitMessage("error", "Erro ao atualizar os dados")
        setTimeout(() => {
          router.reload();
        }, 1000)
        console.log(err)
      }) ;
       
  }
 
  const patchData = (values) => {
    api.patch("/auth/me/", values).then(response => {
      console.log(response.data)
    }).catch(err => {
      emitMessage("error", "Erro ao atualizar os dados")
      setTimeout(() => {
        router.reload();
      }, 1000);
      console.log(err);
    })
  }


  return (
    <form
    onSubmit={formik.handleSubmit}
  >
    <Card>
      <CardHeader
        title="Perfil"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              error={Boolean(formik.touched.first_name && formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
              label="Nome"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              error={Boolean(formik.touched.last_name && formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
              label="Sobrenome"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              disabled
              label="Email"
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Telefone"
              name="phone_number"
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phone_number}
              onBlur={formik.handleBlur}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Salvar
        </Button>
      </Box>
    </Card>
  </form>
  );
};
