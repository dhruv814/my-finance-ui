/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
// mock
import AddPolicy from './Add'
import DeleteModel from '../../components/Deletemodle'
import { apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import React from 'react';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);


  const handleCloseDelete = () => {
    setOpendelete(false)
  }

  const handleOpenDelete = () => {
    setOpendelete(true)
  }

  const deleteManyContact = async (data) => {
    await deleteManyApi('policy/deletemany', data)
    fetchdata()
    handleCloseDelete();
  }

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyContact} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}


const Policy = () => {

  const [policyList, setPolicyList] = useState([]);
  const [userAction, setUserAction] = useState(null)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id')
  const userRole = localStorage.getItem("userRole")

  // open add model
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };


  const columns = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/policy/view/${params.id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "policyName",
      headerName: "Policy Name",
      flex: 1,
    },
    {
      field: "policyType",
      headerName: "Policy Type",
      flex: 1,
    },
    {
      field: "policyStartDate",
      headerName: "Policy Start Date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyStatus",
      headerName: "Policy Status",
      flex: 1,
    }
  ];

  const fetchdata = async () => {
    const result = await apiget(userRole === "ADMIN" ? `policies` : `policies?createdBy=${userid}`)
    console.log(result);
    if (result && result.status === 200) {
      setPolicyList(result?.data)
    }
  }

  useEffect(() => {
    fetchdata();
  }, [userAction])

  return (
    <>
      {/* Add Policy Model */}
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" >
            Policy
          </Typography>
          <Button variant="contained" startIcon={<Icon icon="eva:plus-fill" />} onClick={handleOpenAdd}>
            Add New Policy
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: "600px", paddingTop: "5px" }}>
              <DataGrid
                rows={policyList}
                columns={columns}
                components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchdata }) }}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                getRowId={row => row.id}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
}

export default Policy