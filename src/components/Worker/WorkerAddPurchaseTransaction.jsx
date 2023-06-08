import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WorkerAddSalesTransaction = () => {
  const auth = useSelector((state) => state.pegawai);
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState({
    supplier_id: null,
    pegawai_id: auth.id,
    total_transaksi_penjualan: 0,
    timestamp: null,
  });

  const handleCreateTransactionBarang = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date().toLocaleTimeString(); // Mendapatkan waktu saat tombol submit diklik
      const response = await axios.post(
        'http://localhost:8000/transaksi-pembelian',
        {
          supplier_id: transaksi.supplier_id,
          pegawai_id: transaksi.pegawai_id,
          timestamp: transaksi.timestamp,
        }
      );
      console.log(response);
      // Redirect ke halaman /dashboard-sales-history setelah berhasil submit
      navigate('/dashboard-purchase-history');
    } catch (error) {
      console.log(error);
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
          Add Purchase Transaction
        </Typography>
        <form onSubmit={handleCreateTransactionBarang}>
          <TextField
            fullWidth
            margin="normal"
            label="Supplier ID"
            variant="outlined"
            placeholder="supplier ID"
            value={transaksi.supplier_id}
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                supplier_id: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employee ID"
            variant="outlined"
            placeholder="Pegawai ID"
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
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default WorkerAddSalesTransaction;
