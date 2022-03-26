import { Paper, List } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces/entry';
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter(entry => entry.status === status),
    [entries, status]
  );

  return (
    <div>
      <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto', backgroundColor: 'transparent', padding: 1 }}>
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  );
};
