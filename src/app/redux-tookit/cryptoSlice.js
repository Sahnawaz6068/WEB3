'use client'
 
const initialState={
    
    favorites:[],
    isLoading:false,
    error:null,
}

const cryptoSlice=createSlice({
    name:'crypto',
    initialState,

    reducers:{
        addFavorite:(state,action)=>{
            state.favorites.push();
        },

        removeFavorite:(state,action)=>{
            state.favorites.filter(
                //wo sara coin jo 
            )
        }
    }
})