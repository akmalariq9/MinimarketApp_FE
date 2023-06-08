// import { createReducer } from "@reduxjs/toolkit";
// import axios from "axios";
// import { server } from "../../server";

// const initialState = {
//     isLoading: false,
// };

// // create product
// export const editTransaction = (newForm) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "editTransactionRequest",
//     });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.post(
//       `http://localhost:8000/transaction/edit`,
//       newForm,
//       config
//     );
//   } catch (error) {
//     dispatch({
//       type: "productCreateFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const transactionReducer = createReducer(initialState, {
//   productCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   productCreateSuccess: (state, action) => {
//     state.isLoading = false;
//     state.product = action.payload;
//     state.success = true;
//   },
//   productCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

// });