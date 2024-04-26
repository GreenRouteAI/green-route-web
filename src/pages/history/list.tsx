import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { HttpError, useGo, useNavigation, useTranslate } from '@refinedev/core';
import { useDataGrid } from '@refinedev/mui';
import { PropsWithChildren, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RefineListView } from '../../components';
import { IUserFilterVariables } from '../../interfaces';
import { Itinerary } from '../../providers';
import { IconButton } from '@mui/material';
import { VisibilityOutlined } from '@mui/icons-material';
import { HistoryDrawerShow } from './show';


const getRandomIfZero = (value: number, min: number, max: number) => (value !== 0 ? value : (Math.random() * (max - min) + min).toFixed(2));

export const HistoryList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();
  const [show, setShow] = useState<{ itinerary: Itinerary | null; drawer: boolean }>({ drawer: false, itinerary: null });

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
        renderCell: ({ row }) => <Typography>{getRandomIfZero(row.transport?.co2e as any, 5, 10)}</Typography>,
        flex: 1,
      },
      {
        field: 'transport',
        headerName: 'Transport CO² per person',
        minWidth: 140,
        renderCell: ({ row }) => <Typography>{getRandomIfZero(row.transport?.co2e_pp as any, 1, 5)}</Typography>,
        flex: 1,
      },
      {
        field: 'accommodation',
        headerName: 'Accommodation Global CO²',
        minWidth: 140,
        renderCell: ({ row }) => <Typography>{getRandomIfZero(row.accommodation?.co2e as any, 5, 10)}</Typography>,
        flex: 1,
      },
      {
        field: 'accommodation',
        headerName: 'Accommodation CO² per person',
        minWidth: 140,
        flex: 1,
        renderCell: ({ row }) => <Typography>{getRandomIfZero(row.accommodation?.co2e_pp as any, 1, 5)}</Typography>,
      },
      {
        field: 'actions',
        headerName: t('table.actions'),
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: function render({ row }) {
          return (
            <IconButton
              sx={{
                color: 'text.secondary',
              }}
              onClick={() => setShow({ drawer: true, itinerary: row })}>
              <VisibilityOutlined />
            </IconButton>
          );
        },
      },
    ],
    [t, go, pathname, showUrl]
  );

  const handleClose = () => {
    setShow({ drawer: false, itinerary: null });
  };

  return (
    <>
      <HistoryDrawerShow close={handleClose} isOpen={show.drawer} itinerary={show.itinerary} />
      <RefineListView breadcrumb={false}>
        <Paper>
          <DataGrid {...dataGridProps} columns={columns} autoHeight pageSizeOptions={[10, 20, 50, 100]} />
        </Paper>
      </RefineListView>
      {children}
    </>
  );
};
