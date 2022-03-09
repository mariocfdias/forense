import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { EditorTools } from '../components/customer/imageEditor';
// import { Editor } from '../components/customer/filterButtons';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => (
  <>
    <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 4,
        pb: 2,
        px: 3,
        maxHeight: "90vh",
        height: "90vh",
      }}
    >
      <Container 
      maxWidth={false} 
      sx={{
        backgroundColor: "#fff",
        }}>
        <EditorTools />
        <Box sx={{ mt: 3 }}>
          {/* <CustomerListResults customers={customers} /> */}
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
