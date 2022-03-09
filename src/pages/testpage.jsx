import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import DataTable from '../components/Table/DataTable'
import { useOpenCv, OpenCvProvider } from 'opencv-react';
import { useEffect } from 'react';
import EditForm from 'src/components/EditForm';
import { useImageProvider } from 'src/providers/contexts/cruds/ImageProvider';


const TestPage = () => {
  const {getImages} = useImageProvider()
    useEffect(() => {
      const imgs = getImages()
      console.log(imgs)
  })
 return <>
 
  </>

}

TestPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TestPage;
