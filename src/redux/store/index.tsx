import {  configureStore } from "@reduxjs/toolkit";
import snackBarSlice from "./snackbar";
import pokemonInfoSlice from "./pokemon";

const store = configureStore({
  reducer: { snackBar: snackBarSlice.reducer , pokemon: pokemonInfoSlice.reducer},
});

export default store;
