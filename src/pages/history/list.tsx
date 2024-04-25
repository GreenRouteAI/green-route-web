import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { HttpError, useGo, useNavigation, useTranslate } from '@refinedev/core';
import { useDataGrid } from '@refinedev/mui';
import { PropsWithChildren, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RefineListView } from '../../components';
import { IUserFilterVariables } from '../../interfaces';
import { Itinerary } from '../../providers';

export const HistoryList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<Itinerary, HttpError, IUserFilterVariables>({
    initialPageSize: 10,
    resource: 'activities',
    pagination: { mode: 'client' },
  });

  const columns = useMemo<GridColDef<Itinerary>[]>(
    () => [
      {
        field: 'title',
        headerName: 'Title',
        minWidth: 300,
        flex: 1,
      },
      {
        field: 'transport',
        headerName: 'Transport Global CO²',
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'transport',
        headerName: 'Transport Global CO²',
        minWidth: 140,
        renderCell: ({ row }) => <Typography>{row.transport?.co2e}</Typography>,
        flex: 1,
      },
      {
        field: 'transport',
        headerName: 'Transport CO² per person',
        minWidth: 140,
        renderCell: ({ row }) => <Typography>{row.transport?.co2e_pp}</Typography>,
        flex: 1,
      },
      {
        field: 'accommodation',
        headerName: 'Accommodation Global CO²',
        minWidth: 140,
        renderCell: ({ row }) => <Typography>{row.accommodation?.co2e}</Typography>,
        flex: 1,
      },
      {
        field: 'accommodation',
        headerName: 'Accommodation CO² per person',
        minWidth: 140,
        flex: 1,
        renderCell: ({ row }) => <Typography>{row.accommodation?.co2e_pp}</Typography>,
      },
    ],
    [t, go, pathname, showUrl]
  );

  return (
    <>
      <RefineListView breadcrumb={false}>
        <Paper>
          <DataGrid {...dataGridProps} columns={columns} autoHeight pageSizeOptions={[10, 20, 50, 100]} />
        </Paper>
      </RefineListView>
      {children}
    </>
  );
};
