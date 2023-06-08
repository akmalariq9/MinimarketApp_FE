import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const ManagerAddPurchaseTransaction = () => {
  const [transaksi, setTransaksi] = useState({
    supplier_id: null,
    pegawai_id: null,
  });

  const handleCreateTransactionBarang = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/transaksi-pembelian',
        {
          supplier_id: transaksi.supplier_id,
          pegawai_id: transaksi.pegawai_id,
        }
      );
      console.log(response);
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
        <h2 className="text-2xl font-bold mb-4">Add Purchase Transaction</h2>
        <form onSubmit={handleCreateTransactionBarang}>
          <TextField
            fullWidth
            margin="normal"
            label="Supplier ID"
            variant="outlined"
            placeholder="Supplier ID"
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
            label="Pegawai ID"
            variant="outlined"
            placeholder="Pegawai ID"
            value={transaksi.pegawai_id}
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
            sx={{ mt: 3, backgroundColor: "#8B5FBF",
              "&:hover": {
                backgroundColor: "#61398F",
              },
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ManagerAddPurchaseTransaction;
