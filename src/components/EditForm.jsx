import { Box, Modal, Typography } from "@material-ui/core"
import { useFormik } from "formik";
import { FormControl, FormHelperText, Button, InputLabel, OutlinedInput } from "@material-ui/core";
import { useState, useEffect } from "react";
import {
    form
  } from "src/styles/styles";
  import * as Yup from "yup";
import { FullscreenExit } from "@mui/icons-material";
  const EditForm = (props) => {

const { initialStates } = props

useEffect(() => {
  console.log(initialStates)

}, [])

const [values, setValues] = useState({
    email: initialStates.email, 
    username: initialStates.password
})

const formik = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("Formato de e-mail inválido")
        .max(255)
        .required("O campo e-mail é obrigatório"),
      username: Yup
        .string()
        .max(255)
        .required("O campo de nome de usuario é obrigatório"),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });

return    <Modal
  open={props.open}
  onClose={() => {}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{
    

  }}
>
    <Box sx={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: 400,
         bgcolor: 'background.paper',
         border: '2px solid ',
         boxShadow: 24,
         p: 4,    
    }}>
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
                  
                    />
                <FormHelperText id="email">
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>

              <FormControl
                error={Boolean(formik.touched.username && formik.errors.username)}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="username">Nome de usuario</InputLabel>
                <OutlinedInput
                  id="username"
                  label="username"
                  type={'username'}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-describedby="username"
                  
                  
                />
                <FormHelperText id="password">
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            <Box sx={{
              width: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="contained"
                color="primary"
              >
                Editar
              </Button>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="contained"
                color="primary"
              >
                Cancelar
              </Button>
              
              </Box>
            </form>
            </Box>
</Modal>

}

export default EditForm