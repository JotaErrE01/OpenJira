import { Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Box, height } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { v4 as uuid } from 'uuid';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  const { isAddingEntry, openAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);

  const onTextFieldChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return null;

    openAddingEntry(false);
    setInputValue('');

    // Guardar la nueva entrada con context api
    addNewEntry({
      _id: uuid(),
      description: inputValue,
      status: 'pending',
      createdAt: Date.now()
    });
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1
      }}
    >
      <Box
        style={{
          opacity: isAddingEntry ? 1 : 0,
          visibility: isAddingEntry ? 'visible' : 'hidden',
          pointerEvents: isAddingEntry ? 'all' : 'none',
          height: isAddingEntry ? 'auto' : 1,
          transition: 'opacity 0.25s ease-in-out'
        }}
      >

        <TextField
          fullWidth
          sx={{
            marginTop: 2,
            marginBottom: 2
          }}
          placeholder='Nueva entrada'
          autoFocus
          multiline
          label='Nueva entrada'
          helperText='Ingrese un Valor'
          error={ inputValue.length <= 0 && touched }
          onChange={onTextFieldChange}
          value={ inputValue }
          onBlur={() => setTouched(true)}
        />

        <Box
          display='flex'
          justifyContent='space-between'
          paddingX={2}
          paddingBottom={1}
        >
          <Button
            variant='text'
            onClick={() => {
              openAddingEntry(false);
              setTouched(false);
              setInputValue('');
            }}
          >
            Cancelar
          </Button>

          <Button
            variant='outlined'
            color='success'
            endIcon={<SaveIcon />}
            onClick={onSave}
          >
            Guardar
          </Button>
        </Box>
      </Box>

      <Button
        startIcon={<AddCircleOutlineIcon />}
        fullWidth
        variant='outlined'
        onClick={() => openAddingEntry(true)}
        sx={{
          opacity: isAddingEntry ? 0 : 1,
          height: isAddingEntry ? 0 : 'auto',
          transition: 'opacity .3s ease-in-out',
          pointerEvents: isAddingEntry ? 'none' : 'all'
        }}
      >
        Agregar Tarea
      </Button>
    </Box>
  );
};
