import { configureStore } from "@reduxjs/toolkit";
import pegawaiReducer, { loadPegawai } from "./reducers/pegawaiSlice";
import { transactionReducer } from "./reducers/transactionSlice";

const Store = configureStore({
  reducer: {
    pegawai: pegawaiReducer,
    transaction: transactionReducer,
  }
});

Store.dispatch(loadPegawai(null));

export default Store;