import { configureStore } from "@reduxjs/toolkit";
import chainsSlice from "./features/chains/chains.slice";
import tokensSlice from "./features/tokens/tokens.slice";
import quoteSlice from "./features/quote/quote.slice";
import TokenBalance from "./features/tokenBalances/TokenBalanceSlice";

export const store = configureStore({
  reducer: {
    chains: chainsSlice,
    tokens: tokensSlice,
    quote: quoteSlice,
    balances:TokenBalance
  },
});
