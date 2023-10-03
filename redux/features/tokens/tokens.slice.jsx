import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  sourceTokens: [],
  activeSourceToken: {},
  destinationTokens: [],
  activeDestinationToken: {},
  initialWalletAddress:"0xdBc96CdfAD60ee1B0B430A9f58EffC4765d0BEA3"
};

export const getSourceTokens = createAsyncThunk(
  "tokens/getSourceTokens",
  async (activeSourceChainId) => {
    const res = await fetch(
      `https://api.socket.tech/v2/token-lists/from-token-list?fromChainId=${activeSourceChainId}&isShortList=true`,
      {
        headers: {
          accept: "application/json",
          "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
        },
      }
    );
    return res.json();
  }
);

export const getDestinationTokens = createAsyncThunk(
  "tokens/getDestinationTokens",
  async (chainsId) => {
    const res = await fetch(
      `https://api.socket.tech/v2/token-lists/to-token-list?fromChainId=${chainsId.sourceId}&toChainId=${chainsId.destinationId}&isShortList=true`,
      {
        headers: {
          accept: "application/json",
          "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
        },
      }
    );
    return res.json();
  }
);

const TokensSlice = createSlice({
  name: "tokens",
  initialState,

  reducers: {
    setActiveSourceToken: (state, action) => {
      state.activeSourceToken = state.sourceTokens?.find(
        (token) => token.symbol.toLowerCase() === action.payload
      );
    },

    setActiveDestinationToken: (state, action) => {
      state.activeDestinationToken = state.destinationTokens?.find(
        (token) => token.symbol.toLowerCase() === action.payload
      );
    },
  },

  extraReducers: (builder) => {
    //   getSourceTokens cases
    builder.addCase(getSourceTokens.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSourceTokens.fulfilled, (state, action) => {
      state.loading = false;
      state.sourceTokens = action.payload.result;
    });

    builder.addCase(getSourceTokens.rejected, (state, action) => {
      state.loading = false;
      state.sourceTokens = [];
      state.error = action.error.message;
    });

    //   getDestinationTokens cases
    builder.addCase(getDestinationTokens.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDestinationTokens.fulfilled, (state, action) => {
      state.loading = false;
      state.destinationTokens = action.payload.result;
    });

    builder.addCase(getDestinationTokens.rejected, (state, action) => {
      state.loading = false;
      state.destinationTokens = [];
      state.sourceTokens = [];
      state.error = action.error.message;
    });
  },
});

export default TokensSlice.reducer;
export const { setActiveSourceToken, setActiveDestinationToken } =
  TokensSlice.actions;
