import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkerAddSalesProduct = () => {
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
  const [selectedBarang, setSelectedBarang] = useState(null); // State untuk menyimpan objek produk yang dipilih
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
        const updatedJumlahBarang = parseInt(existingTransaction.jumlah_barang) + parseInt(transaksi.jumlah_barang);
        const response = await axios.put(`http://localhost:8000/barang-transaksi-penjualan/${existingTransaction.id}`, {
          jumlah_barang: updatedJumlahBarang,
        });
        console.log(response);
        navigate(`/barang-transaksi-penjualan/${url}`);
        return;
      }

      const timestamp = new Date().toLocaleTimeString();

      const selectedBarangStock = selectedBarang ? selectedBarang.stok : 0;
      const requestedBarangStock = parseInt(transaksi.jumlah_barang);

      if (requestedBarangStock > selectedBarangStock) {
        toast.error('Insufficient Stock');
        return;
      }

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
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        console.log(error);
      }
    }
  };

  const handleBarangChange = (event, newValue) => {
    setSelectedBarang(newValue); // Mengupdate state produk yang dipilih
    setTransaksi({
      ...transaksi,
      barang_id: newValue ? newValue.id : null,
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width="400px" p={3} bgcolor="white" boxShadow={3} borderRadius={8}>
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Add Products
        </Typography>
        <form onSubmit={handleCreateTransactionBarang}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Count"
            variant="outlined"
            placeholder="Product Count"
            required
            value={transaksi.jumlah_barang}
            onChange={(e) =>
              setTransaksi({
                ...transaksi,
                jumlah_barang: e.target.value,
              })
            }
          />
          <Autocomplete
            fullWidth
            margin="normal"
            options={barang}
            getOptionLabel={(option) => option.nama || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Item"
                variant="outlined"
                placeholder="Search Item"
                required
              />
            )}
            value={selectedBarang} // Menggunakan state selectedBarang untuk menampilkan nama produk
            onChange={handleBarangChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employee ID"
            variant="outlined"
            value={auth.id}
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
            sx={{
              mt: 3,
              backgroundColor: '#8B5FBF',
              '&:hover': {
                backgroundColor: '#61398F',
              },
              textTransform: 'none',
            }}
          >
            Create
          </Button>
        </form>
        <ToastContainer position="top-center"/>
      </Box>
    </Box>
  );
};

export default WorkerAddSalesProduct;
