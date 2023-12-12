// import * as React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import SearchFilterBar from './SearchFilterBar';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// const columns: GridColDef[] = [
//   { field: 'name', headerName: 'Name', width: 130 },
//   { field: 'industryInterest', headerName: 'Industry', width: 200 },
//   {
//     field: 'location',
//     headerName: 'Location',
//     // type: 'number',
//     width: 200,
//   },
//   {
//     field: 'description',
//     headerName: 'Description',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 500,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.description}`,
//   },
// ];

// export default function DataTable() {
//   const [openDialog, setOpenDialog] = React.useState(false);
//   const [selectedRow, setSelectedRow] = React.useState(null);

//   const handleRowClick = (params) => {
//     setSelectedRow(params.row);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//        <DataGrid
//         rows={rows}
//         columns={columns}
//         onRowClick={handleRowClick}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//        <Dialog open={openDialog} onClose={handleCloseDialog}>
//         {/* <DialogTitle>Row Details</DialogTitle> */}
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseDialog}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent>
//           {/* Display selected row details here */}
//           {selectedRow && JSON.stringify(selectedRow)}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// const rows = [
//   {
//     id: 1,
//     name: 'Investor One',
//     industryInterest: ['Technology', 'Healthcare'],
//     location: 'San Francisco, CA',
//     description: 'This is a description for Investor One who is interested in technology and healthcare sectors.',
//   },
//   {
//     id: 2,
//     name: 'Investor Two',
//     industryInterest: ['Finance', 'Real Estate'],
//     location: 'New York, NY',
//     description: 'This is a description for Investor Two who is interested in finance and real estate sectors.',
//   },
//   {
//     id: 3,
//     name: 'Investor Three',
//     industryInterest: ['Entertainment', 'Fashion'],
//     location: 'Los Angeles, CA',
//     description: 'This is a description for Investor Three who is interested in entertainment and fashion sectors.',
//   },
//   {
//     id: 4,
//     name: 'Investor Four',
//     industryInterest: ['Automotive', 'Telecommunications'],
//     location: 'Detroit, MI',
//     description: 'This is a description for Investor Four who is interested in automotive and telecommunications sectors.',
//   },
//   {
//     id: 5,
//     name: 'Investor Five',
//     industryInterest: ['Food & Beverage', 'Agriculture'],
//     location: 'Chicago, IL',
//     description: 'This is a description for Investor Five who is interested in food & beverage and agriculture sectors.',
//   },
//   {
//     id: 6,
//     name: 'Investor Six',
//     industryInterest: ['Education', 'Travel & Tourism'],
//     location: 'Boston, MA',
//     description: 'This is a description for Investor Six who is interested in education and travel & tourism sectors.',
//   },
//   {
//     id: 7,
//     name: 'Investor Seven',
//     industryInterest: ['Biotechnology', 'Energy'],
//     location: 'San Diego, CA',
//     description: 'This is a description for Investor Seven who is interested in biotechnology and energy sectors.',
//   },
//   {
//     id: 8,
//     name: 'Investor Eight',
//     industryInterest: ['Retail', 'E-commerce'],
//     location: 'Seattle, WA',
//     description: 'This is a description for Investor Eight who is interested in retail and e-commerce sectors.',
//   },
//   {
//     id: 9,
//     name: 'Investor Nine',
//     industryInterest: ['Artificial Intelligence', 'Robotics'],
//     location: 'Austin, TX',
//     description: 'This is a description for Investor Nine who is interested in AI and robotics sectors.',
//   },
//   {
//     id: 10,
//     name: 'Investor Ten',
//     industryInterest: ['Healthtech', 'Blockchain'],
//     location: 'Miami, FL',
//     description: 'This is a description for Investor Ten who is interested in healthtech and blockchain sectors.',
//   },
//   {
//     id: 11,
//     name: 'Investor Eleven',
//     industryInterest: ['CleanTech', 'Sustainability'],
//     location: 'Portland, OR',
//     description: 'This is a description for Investor Eleven who is interested in cleantech and sustainability sectors.',
//   },
//   {
//     id: 12,
//     name: 'Investor Twelve',
//     industryInterest: ['Space Exploration', 'Aerospace'],
//     location: 'Houston, TX',
//     description: 'This is a description for Investor Twelve who is interested in space exploration and aerospace sectors.',
//   },
//   {
//     id: 13,
//     name: 'Investor Thirteen',
//     industryInterest: ['Gaming', 'VR/AR'],
//     location: 'Las Vegas, NV',
//     description: 'This is a description for Investor Thirteen who is interested in gaming and VR/AR sectors.',
//   },
//   {
//     id: 14,
//     name: 'Investor Fourteen',
//     industryInterest: ['Logistics', 'Supply Chain'],
//     location: 'Dallas, TX',
//     description: 'This is a description for Investor Fourteen who is interested in logistics and supply chain sectors.',
//   },
//   {
//     id: 15,
//     name: 'Investor Fifteen',
//     industryInterest: ['Renewable Energy', 'GreenTech'],
//     location: 'Denver, CO',
//     description: 'This is a description for Investor Fifteen who is interested in renewable energy and greentech sectors.',
//   },
// ];


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
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

