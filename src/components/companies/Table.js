import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SearchFilterBar from './SearchFilterBar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'industry', headerName: 'Industry', width: 130 },
  {
    field: 'location',
    headerName: 'Location',
    // type: 'number',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 500,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.description}`,
  },
];

export default function DataTable(props) {

  const [rows, setRows] = React.useState();
  // const [columns, setColumns] = React.useState(/* your columns data */);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  React.useEffect(() => {
    setRows(props.data)
  }, []);

  if (!rows) {
    return <div>Loading...</div>; // or return null;
  }

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      {selectedRow && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedRow.name}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div>
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Industry:</strong> {selectedRow.industry}</p>
              <p><strong>Location:</strong> {selectedRow.location}</p>
              <p><strong>Description:</strong> {selectedRow.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
