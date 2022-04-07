import { GetServerSideProps } from 'next';
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { Layout } from '../../components/layouts/Layout';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Grid, Card, CardHeader, CardContent, TextField, Button, CardActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { getEntryById } from '../../database/dbEntries';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const { updateEntry } = useContext(EntriesContext);
  const [touched, setTouched] = useState(false);

  const validationResult = useMemo(() => inputValue.length <= 1 && touched, [inputValue, touched]);

  const onInputChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setStatus(target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length <= 1) return;

    const updatedEntry: Entry = { ...entry, description: inputValue, status };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'} >
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entrada:'
              subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onInputChanged}
                helperText={validationResult ? 'Campo obligatorio' : ''}
                error={validationResult}
                onBlur={() => setTouched(true)}
              />

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 1}
              >Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }} >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      entry
    }
  };
};

export default EntryPage;
