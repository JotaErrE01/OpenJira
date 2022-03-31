import { Layout } from '../components/layouts/Layout';
import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { UIContext } from '../context/ui';
import { EntryList, NewEntry } from '../components/ui';

const HomaPage: NextPage = () => {
  const { sidemenuOpen } = useContext(UIContext);

  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title="Pendientes" />

              <NewEntry />
              <EntryList status='pending'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title="En Progreso" />

            <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{
            height: 'calc(100vh - 100px)'
          }}>
            <CardHeader title="Completadas" />

            <EntryList status='finished'/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomaPage;
