import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tenantService from '../services/tenantService';


const initialState = {
  loading: false,
  success: false,
  error: null,   
  plans: {
    list: [],               
    loading: false,
    error: null,
    lastFetched: null,
  },   
  fetchSubsLoading: false,
  fetchSubsError: null,
  fetchSubsId: null,  
};

export const registerTenant = createAsyncThunk(
  'ManageTenant/registerTenantByAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tenantService.registerTenant(data);
      return response.data;
    } catch (err) {
      
      return rejectWithValue(
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Failed to register tenant'
      );
    }
  }
);
export const fetchPublicSubscriptionPlans = createAsyncThunk(
  'subscriptionPlans/fetchPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tenantService.getPublicPlans();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to load plans'
      );
    }
  }
);


export const fetchMySubscription = createAsyncThunk(
  'subscription/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tenantService.getMySubscription();
      return response.data; // assuming response shape: { id, plan, status, ... }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to load your subscription'
      );
    }
  }
);


const tenantSlice = createSlice({
  name: 'ManageTenant',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(registerTenant.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(registerTenant.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      
      .addCase(registerTenant.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;  
      })

      .addCase(fetchPublicSubscriptionPlans.pending, (state) => {
        state.plans.loading = true;
        state.plans.error = null;
      })
      .addCase(fetchPublicSubscriptionPlans.fulfilled, (state, action) => {
        state.plans.loading = false;
        state.plans.list = action.payload;
        state.plans.lastFetched = new Date().toISOString();
        state.plans.error = null;
      })
      .addCase(fetchPublicSubscriptionPlans.rejected, (state, action) => {
        state.plans.loading = false;
        state.plans.error = action.payload;
        
      })


      .addCase(fetchMySubscription.pending, (state) => {
        state.fetchSubsLoading = true;
        state.fetchSubsError = null;
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        state.fetchSubsLoading = false;
        state.fetchSubsId = action.payload?.planId|| null;
      })
      .addCase(fetchMySubscription.rejected, (state, action) => {
        state.fetchSubsLoading = false;
        state.fetchSubsError = action.payload || 'Failed to load subscription';
      })
  },
});

// Exports
// export const { reset } = tenantSlice.actions;


// export const selectTenant = (state) => state.tenant;

export default tenantSlice.reducer;