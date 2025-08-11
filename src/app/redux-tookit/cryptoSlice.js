"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    coin:[],
  favorites: [],
  isLoading: false,
  error: null,
};
//____________________________________________________________________________________

//Data fetching  Thunk 
export const fetchCoins=createAsyncThunk("Crypto", async()=>{
    const reponse=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data=await reponse.json();
    return data;
})


const cryptoSlice = createSlice({
  name: "crypto",
  initialState,

  reducers: {
    //Action that are sync
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },

    removeFavorite: (state, action) => {
      state.favorites
        .filter (coin=>coin.id !== action.payload.id);
        //wo sara coin alawa uske jo remove huaa
       
    },
  },
  //async actions
  extraReducers:(builder)=>{ 
    //Manage of promise state
    builder.addCase(fetchCoins.pending,    )
    builder.addCase(fetchCoins.fulfilled,    )
    builder.addCase(fetchCoins.rejected,    )
  }

});

export const {addFavorite,removeFavorite}=Slice.actions;
