import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkerAddSalesTransaction = () => {
  const auth = useSelector((state) => state.pegawai);
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState({
    member_id: null,
    pegawai_id: auth.id,
    total_transaksi_penjualan: 0,
    timestamp: null,
  });

  const handleCreateTransactionBarang = async (e) => {
    e.preventDefault();
    try {
      // const timestamp = new Date().toLocaleTimeString(); // Mendapatkan waktu saat tombol submit diklik
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/transaksi-penjualan',
        {
          member_id: transaksi.member_id,
          pegawai_id: transaksi.pegawai_id,
          timestamp: transaksi.timestamp,
        }
      );
      console.log(response);
      // Redirect ke halaman /dashboard-sales-history setelah berhasil submit
      navigate('/sales-history');
    } catch (error) {
      if(error.response && error.response.data && error.response.data.status === 500){
        const errormsg = "Member ID Can't be Found";
        toast.error(errormsg)
      }
    }
  };

  console.log(transaksi, 'data transaksi');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        width="400px"
        p={3}
        bgcolor="white"
        boxShadow={3}
        borderRadius={8}
      >
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Add Sales Transaction
        </Typography>
        <form onSubmit={handleCreateTransactionBarang}>
          <TextField
            fullWidth
            margin="normal"
            label="Member ID"
            variant="outlined"
            placeholder="Member ID"
            required
            value={transaksi.member_id}
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                member_id: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employee ID"
            variant="outlined"
            placeholder="Employee ID"
            value={transaksi.pegawai_id}
            disabled
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                pegawai_id: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, 
              backgroundColor: "#8B5FBF",
              "&:hover": {
                backgroundColor: "#61398F",
              },
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </form>
        <ToastContainer position="top-center" />
      </Box>
    </Box>
  );
};

export default WorkerAddSalesTransaction;
