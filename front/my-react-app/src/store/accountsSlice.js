import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all accounts
export const fetchAccounts = createAsyncThunk('accounts/fetchAll', async () => {
  const res = await axios.get('/api/accounts');
  return res.data;
});

// Create new account
export const createAccount = createAsyncThunk('accounts/create', async (accountData) => {
  const res = await axios.post('/api/accounts', accountData);
  return res.data;
});

// Get single account by ID
export const getAccountById = createAsyncThunk('accounts/getById', async (id) => {
  const res = await axios.get(`/api/accounts/${id}`);
  return res.data;
});

// Deposit to account
export const deposit = createAsyncThunk('accounts/deposit', async ({ id, amount }) => {
  const res = await axios.put(`/api/accounts/${id}/deposit`, { amount });
  return res.data;
});

// Withdraw from account
export const withdraw = createAsyncThunk('accounts/withdraw', async ({ id, amount }) => {
  const res = await axios.put(`/api/accounts/${id}/withdraw`, { amount });
  return res.data;
});

// Delete account
export const deleteAccount = createAsyncThunk('accounts/delete', async (id) => {
  await axios.delete(`/api/accounts/${id}`);
  return id;
});

// Transfer money between accounts
export const transferMoney = createAsyncThunk(
  'accounts/transfer',
  async ({ fromAccount, toAccount, amount }) => {
    const res = await axios.post('/api/accounts/transfer', { fromAccount, toAccount, amount });
    return res.data;
  }
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: { items: [], status: 'idle', error: null, selectedAccount: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load accounts';
      })
      // Create account
      .addCase(createAccount.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create account';
      })
      // Get account by ID
      .addCase(getAccountById.fulfilled, (state, action) => {
        state.selectedAccount = action.payload;
        state.error = null;
      })
      .addCase(getAccountById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to get account';
      })
      // Deposit
      .addCase(deposit.fulfilled, (state, action) => {
        const index = state.items.findIndex(acc => acc.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.selectedAccount?.id === action.payload.id) {
          state.selectedAccount = action.payload;
        }
        state.error = null;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.error = action.error.message || 'Deposit failed';
      })
      // Withdraw
      .addCase(withdraw.fulfilled, (state, action) => {
        const index = state.items.findIndex(acc => acc.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.selectedAccount?.id === action.payload.id) {
          state.selectedAccount = action.payload;
        }
        state.error = null;
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.error = action.error.message || 'Withdrawal failed';
      })
      // Delete account
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.items = state.items.filter(acc => acc.id !== action.payload);
        if (state.selectedAccount?.id === action.payload) {
          state.selectedAccount = null;
        }
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete account';
      })
      // Transfer
      .addCase(transferMoney.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        // Update both accounts involved in the transfer
        if (Array.isArray(action.payload)) {
          // If backend returns both accounts
          action.payload.forEach(updatedAccount => {
            const index = state.items.findIndex(acc => acc.id === updatedAccount.id);
            if (index !== -1) {
              state.items[index] = updatedAccount;
            }
            if (state.selectedAccount?.id === updatedAccount.id) {
              state.selectedAccount = updatedAccount;
            }
          });
        } else {
          // If backend returns only one account
          const index = state.items.findIndex(acc => acc.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          if (state.selectedAccount?.id === action.payload.id) {
            state.selectedAccount = action.payload;
          }
        }
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Transfer failed';
      });
  },
});

export const { clearError } = accountsSlice.actions;
export default accountsSlice.reducer;
