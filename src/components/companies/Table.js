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
  { field: 'category_groups_list', headerName: 'Industry', width: 130 },
  {
    field: 'city',
    headerName: 'Location',
    width: 200,
  },
  {
    field: 'short_description',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 500,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.short_description}`,
  },
];

export default function DataTable(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getRowId = (row) => {
    return row.su;
  }

  const handleSelectionChange = (newSelection) => {
    let allSelections = []
    console.log(newSelection)
    for (let i = 0; i < newSelection.length; i++) {
      allSelections.push(props.data[newSelection[i]-1])
    }
    props.setCheckedRows(allSelections);
  };


  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={props.data}
        columns={columns}
        onRowClick={handleRowClick}
        onRowSelectionModelChange={handleSelectionChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={getRowId}
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
              <p><strong>Industry:</strong> {selectedRow.category_groups_list}</p>
              <p><strong>Location:</strong> {selectedRow.city}</p>
              <p><strong>Total Funding (USD):</strong> {selectedRow.total_funding_usd}</p>
              <p><strong>Description:</strong> {selectedRow.short_description}</p>
              <p><strong>Website:</strong> {selectedRow.homepage_url}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
