import { Card, CardHeader, CardContent, Divider, Box, Button } from "@mui/material";

const FormContainer = (props) => (
  <>
    <form>
      <Card>
        <CardHeader title={props.title} subheader={props.subtitle || ""} />
        <Divider />
        <CardContent>{props.children}</CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            p: 2,
          }}
        >
          <Button color="error" onClick={props.cancelButtonFunction}>
            {props.cancelButtonText || "Cancelar"}
          </Button>
          <Button color="success" variant="contained" onClick={props.submitButtonFunction}>
            {props.submitButtonText || "Salvar"}
          </Button>
        </Box>
      </Card>
    </form>
  </>
);

export default FormContainer;
