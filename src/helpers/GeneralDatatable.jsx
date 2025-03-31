import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { QuickSearchToolbar } from './QuickSearchToolbar'
import { SinRegistros } from './SinRegistros'

export const GeneralDataTable = ({ rows, columns, actions, columnsHide, rowsPerPage = 10}) => {
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: rowsPerPage,
  });
  
  const rowPerPage = [5, 10, 20, 50]

  if (rows.length == 0) {
    return <SinRegistros/>
  }
  return (
      // <Box id="box" sx={{ width: "100%",  overflowX: 'auto',}} display="flex" justifyContent="space-between">
        <div style={{maxWidth:'100%'}}>
         <Box
            sx={{
              height: 300,
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: 'rgba(136, 136, 136, 1)',
                color:'rgba(255, 255, 255, 1)'
              },
            }}
         >
          
        
            <DataGrid
              rows={rows}
              columns={columns.map((col) => ({ ...col, flex: 1 }))} 
              pageSizeOptions={rowPerPage}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              slots={{ toolbar: QuickSearchToolbar }}
              onCellClick={actions}
              getRowId={(row) => row.id}
              autoHeight
              columnVisibilityModel={columnsHide}
              scrollbarSize={10}
              disableColumnResize 
              style={{width: '100%', maxWidth: '100%'}}
            />
           </Box>
        </div>
      // </Box>
  )
}
