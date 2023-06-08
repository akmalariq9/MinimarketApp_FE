import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const WorkerAddProduct = () => {
  const auth = useSelector((state) => state.pegawai);
  const location = useLocation();
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState({
    barang_id: null,
    jumlah_barang: null,
    total_transaksi_penjualan: 0,
    transaksi_penjualan_id: null,
    timestamp: null,
  });
  const [barang, setBarang] = useState([]);
  const [exist, setExist] = useState([]);

  const url = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/barang');
        setBarang(response.data.data);
        const response2 = await axios.get(`http://localhost:8000/barang-transaksi-penjualan/transaksi/${url}`);
        setExist(response2.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateTransactionBarang = async (e) => {
    e.preventDefault();
    try {
      const existingTransaction = exist.find((item) => item.barang_id === transaksi.barang_id);
      if (existingTransaction) {
        // Jika barang sudah ada dalam transaksi sebelumnya, tambahkan jumlah barang baru dengan jumlah yang sudah ada
        const updatedJumlahBarang = parseInt(existingTransaction.jumlah_barang) + parseInt(transaksi.jumlah_barang);
        const response = await axios.put(`http://localhost:8000/barang-transaksi-penjualan/${existingTransaction.id}`, {
          jumlah_barang: updatedJumlahBarang,
        });
        console.log(response);
        navigate(`/barang-transaksi-penjualan/${url}`);
        return;
      }

      const timestamp = new Date().toLocaleTimeString();
      const response = await axios.post('http://localhost:8000/barang-transaksi-penjualan', {
        member_id: transaksi.member_id,
        barang_id: transaksi.barang_id,
        jumlah_barang: transaksi.jumlah_barang,
        total_transaksi_penjualan: transaksi.total_transaksi_penjualan,
        transaksi_penjualan_id: url,
        timestamp: transaksi.timestamp,
      });
      console.log(response);
      navigate(`/barang-transaksi-penjualan/${url}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width="400px" p={3} bgcolor="white" boxShadow={3} borderRadius={8}>
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Add Sales Transaction
        </Typography>
        <form onSubmit={handleCreateTransactionBarang}>
          <TextField
            fullWidth
            margin="normal"
            label="Jumlah Barang"
            variant="outlined"
            placeholder="Member ID"
            value={transaksi.jumlah_barang}
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                jumlah_barang: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Barang"
            variant="outlined"
            placeholder="Pilih barang"
            select
            value={transaksi.barang_id}
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                barang_id: e.target.value,
              })
            }
          >
            {barang.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Pegawai ID"
            variant="outlined"
            // placeholder="Pegawai ID"
            value={auth.id}
            disabled
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                pegawai_id: e.target.value,
              })
            }
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, textTransform: "none",}}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default WorkerAddProduct;
