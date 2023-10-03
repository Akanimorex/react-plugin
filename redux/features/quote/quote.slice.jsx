import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  //   quote: {},
  routes: [],
  activeRoute: {},
};

export const fetchQuote = createAsyncThunk(
  "quote/fetchQuote",
  async (payload) => {
    const response = await fetch(
      `https://api.socket.tech/v2/quote?fromChainId=${payload.sourceChainId}&fromTokenAddress=${payload.sourceTokenAddress}&toChainId=${payload.destinationChainId}&toTokenAddress=${payload.destinationTokenAddress}&fromAmount=${payload.sourceAmount}&userAddress=${payload.userAddress}&uniqueRoutesPerBridge=true&sort=output&singleTxOnly=true&isContractCall=false&bridgeWithGas=false&bridgeWithInsurance=true&defaultSwapSlippage=1`,
      {
        headers: {
          accept: "application/json",
          "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
        },
      }
    );

    return response.json();
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState,

  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = state.routes?.find(
        (route) => route.routeId === action.payload
      );
    },

    resetQuote: (state) => {
      state.loading = false;
      state.routes = [];
      state.activeRoute = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchQuote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.loading = false;
      //   state.quote = action.payload.result;
      state.routes = action.payload.result.routes;
      state.activeRoute = action.payload.result.routes[0];
    });

    builder.addCase(fetchQuote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default quoteSlice.reducer;
export const { setActiveRoute, resetQuote } = quoteSlice.actions;
