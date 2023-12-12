import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'investor_types', headerName: 'Investor Type', width: 130 },
  {
    field: 'region',
    headerName: 'Location',
    width: 200,
  },
  {
    field: 'total_funding',
    headerName: 'Total Funding',
    width: 200,
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
    return row.inv;
  }

  const handleSelectionChange = (newSelection) => {
    let allSelections = []
    for (let i = 0; i < newSelection.length; i++) {
      allSelections.push(props.data[newSelection[i]-1])
    }
    props.setCheckedRows(newSelection);
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
              <p><strong>Investor Type:</strong> {selectedRow.investor_types}</p>
              <p><strong>Location:</strong> {selectedRow.region}</p>
              <p><strong>Total Funding (USD):</strong> {selectedRow.total_funding}</p>
              <p><strong>Founded On:</strong> {selectedRow.founded_on}</p>
              <p><strong>Website:</strong>{selectedRow.domain == "0" ? "Not Available" : selectedRow.domain}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

