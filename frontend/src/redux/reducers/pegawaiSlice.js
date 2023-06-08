import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

// localStorage.getItem("User");

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  id: null,
  nama: null,
  role: null,
  loading: false,
  error: null,
  pegawaiLoaded: false,
};

export const loginPegawai = createAsyncThunk(
  "pegawai/LoadPegawai",
  async (data, { rejectWithValue }) => {
    try {
      //console.log(data.email, data.password)
      const response = await axios.post(
        `http://localhost:8000/pegawai/login`,
        {
          email: data.email,
          password: data.password,
        })
        localStorage.setItem("token", response.data.data.token);
        return response.data.data.token;
      }
      catch (err) {
        console.log(err.response.data);
        return rejectWithValue(err.response.data);
      }
});

export const pegawaiSlice = createSlice({
  name: "pegawai",
  initialState,
  reducers: {
    loadPegawai: (state, action) => {
      const token = state.token;
      if (token) {
        const decoded = jwt_decode(token);
        return{
          ...state,
          isAuthenticated: true,
          id: decoded.id,
          nama: decoded.nama,
          role: decoded.role,  
          pegawaiLoaded: true,
        };
      }
    },

    logoutPegawai: (state) => {
      localStorage.removeItem("token");
      // }));
      return{
        ...state,
        token: null,
        isAuthenticated: false,
        id: null,
        nama: null,
        role: null,
        pegawaiLoaded: false,
      };
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginPegawai.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(loginPegawai.fulfilled, (state, action) => {
      if(action.payload){
        const decoded = jwt_decode(action.payload);
        return{
          // ...state,
          token: action.payload,
          isAuthenticated: true,
          id: decoded.id,
          nama: decoded.nama,
          role: decoded.role,
          pegawaiLoaded: true,
        };
      } else return state;
    });
    builder.addCase(loginPegawai.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const { loadPegawai, logoutPegawai } = pegawaiSlice.actions;
export default pegawaiSlice.reducer;