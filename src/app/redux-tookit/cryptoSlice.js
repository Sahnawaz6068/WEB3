"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  coin: [],
  favorites: [],
  isLoading: false,
  error: null,
};
//____________________________________________________________________________________

//Data fetching  Thunk
export const fetchCoins = createAsyncThunk("Crypto", async () => {
  const reponse = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  const data = await reponse.json();
  return data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,

  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },

    removeFavorite: (state, action) => {
      state.favorites.filter((coin) => coin.id !== action.payload.id);
    },
  },

  //async actions
  extraReducers: (builder) => {

    //Manage of promise state
    builder.addCase(fetchCoins.pending, (state) => {    //jab pending rahega to loading ko true error null
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coin = action.payload;
    });

    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

  },
});

export const { addFavorite, removeFavorite } = cryptoSlice.actions;
export default cryptoSlice.reducers;
