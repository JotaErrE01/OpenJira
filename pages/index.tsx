import { Layout } from '../components/layouts/Layout';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { UIContext } from '../context/ui';

const HomaPage: NextPage = () => {
  const { sidemenuOpen } = useContext(UIContext);

  return (
    <Layout title=''>
      <Typography variant='h1' color='primary'>Hola Mundo</Typography>
    </Layout>
  );
};

export default HomaPage;
