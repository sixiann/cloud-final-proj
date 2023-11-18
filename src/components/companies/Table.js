import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SearchFilterBar from './SearchFilterBar';

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

export default function DataTable() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <SearchFilterBar/>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}


const rows = [
  {
    id: 1,
    name: 'Startup One',
    industry: 'Technology',
    location: 'San Francisco, CA',
    description: 'This is a description for Startup One in the technology industry.',
  },
  {
    id: 2,
    name: 'Startup Two',
    industry: 'Healthcare',
    location: 'New York, NY',
    description: 'This is a description for Startup Two in the healthcare industry.',
  },
  {
    id: 3,
    name: 'Startup Three',
    industry: 'Finance',
    location: 'London, UK',
    description: 'This is a description for Startup Three in the finance industry.',
  },
  {
    id: 4,
    name: 'Startup Four',
    industry: 'E-commerce',
    location: 'Berlin, Germany',
    description: 'This is a description for Startup Four in the e-commerce industry.',
  },
  {
    id: 5,
    name: 'Startup Five',
    industry: 'Food & Beverage',
    location: 'Tokyo, Japan',
    description: 'This is a description for Startup Five in the food & beverage industry.',
  },
  {
    id: 6,
    name: 'Startup Six',
    industry: 'Education',
    location: 'Sydney, Australia',
    description: 'This is a description for Startup Six in the education industry.',
  },
  {
    id: 7,
    name: 'Startup Seven',
    industry: 'Automotive',
    location: 'Los Angeles, CA',
    description: 'This is a description for Startup Seven in the automotive industry.',
  },
  {
    id: 8,
    name: 'Startup Eight',
    industry: 'Entertainment',
    location: 'Paris, France',
    description: 'This is a description for Startup Eight in the entertainment industry.',
  },
  {
    id: 9,
    name: 'Startup Nine',
    industry: 'Fashion',
    location: 'Milan, Italy',
    description: 'This is a description for Startup Nine in the fashion industry.',
  },
  {
    id: 10,
    name: 'Startup Ten',
    industry: 'Travel & Tourism',
    location: 'Barcelona, Spain',
    description: 'This is a description for Startup Ten in the travel & tourism industry.',
  },
  {
    id: 11,
    name: 'Startup Eleven',
    industry: 'Real Estate',
    location: 'Toronto, Canada',
    description: 'This is a description for Startup Eleven in the real estate industry.',
  },
  {
    id: 12,
    name: 'Startup Twelve',
    industry: 'Energy',
    location: 'Oslo, Norway',
    description: 'This is a description for Startup Twelve in the energy industry.',
  },
  {
    id: 13,
    name: 'Startup Thirteen',
    industry: 'Telecommunications',
    location: 'Seoul, South Korea',
    description: 'This is a description for Startup Thirteen in the telecommunications industry.',
  },
  {
    id: 14,
    name: 'Startup Fourteen',
    industry: 'Agriculture',
    location: 'São Paulo, Brazil',
    description: 'This is a description for Startup Fourteen in the agriculture industry.',
  },
  {
    id: 15,
    name: 'Startup Fifteen',
    industry: 'Biotechnology',
    location: 'Zurich, Switzerland',
    description: 'This is a description for Startup Fifteen in the biotechnology industry.',
  },
];

