import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const hardcodedWalletAddress = "0xdBc96CdfAD60ee1B0B430A9f58EffC4765d0BEA3";

const initialState = {
    initialSourceTokenBalance:0,
    initialDestinationTokenBalance:0,
    loading:false,
    error:""

}


//  async thunk function.
export const fetchTokenBalance = createAsyncThunk(
    'token/fetchTokenBalance',
    async ( { payload } ) => {
      const apiEndpoint = `https://api.socket.tech/v2/balances/token-balance?tokenAddress=${payload.activeSourceToken}&chainId=${payload.sourceChainID}&userAddress=${payload.userAddress}`;
  
       try { const response = await fetch(apiEndpoint,{
          headers:{
            accept:"application/json"
          },
        })
        if(!response.ok){
          throw new Error('failed to fetch token balance')
        }
        const tokenBalanceData = await response.json();
        console.log(tokenBalanceData,"FROM THUNK")
        return tokenBalanceData 
      }catch(error){
        throw Error;
      }

      
    }
  );

  //synchronous (click,dispatch immediately) use reducers
  //async (network req, etc) use extra reducers

const tokenBalanceSlice = createSlice({
    name:"balance",
    initialState,

    extraReducers:(builder)=>{
        builder.addCase(fetchTokenBalance.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(fetchTokenBalance.fulfilled,(state, action)=>{
            state.loading = false;
            state.initialSourceTokenBalance = action.payload;
            console.log(state.initialSourceTokenBalance, "initial balance")
        })
        builder.addCase(fetchTokenBalance.rejected,(state)=>{
            state.loading = false;
            state.error = action.error.message
        })
    }
});



//test this function

export const TestThis = (word)=>{
  console.log(`testingggggggggg ${word}`)
}

export default tokenBalanceSlice.reducer
 

 



