import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  apiState: {
    loading: false,
    error: null,
    isSuccess: false,
  },
  createProductApiState: {
    loading: false,
    error: null,
    isSuccess: false,
  },
  updateProductApiState: {
    loading: false,
    error: null,
    isSuccess: false,
  }
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (thunkAPI) => {
    console.log("coming here");
    try {
      const response = await fetch(
        "https://rtk-gettingstarted-backend.herokuapp.com/products"
      );
      const products = await response.json();
      return products;
    } catch (e) {
      console.log("e", e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const createProductMutation = createAsyncThunk("product/createProduct", async (product,thunkAPI) => {
  try {
    const response = await fetch(
      "https://rtk-gettingstarted-backend.herokuapp.com/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const newProduct = await response.json();
    return newProduct;
  }
  catch(e) {
    return thunkAPI.rejectWithValue(e);
  }
})

export const updateProductMutation = createAsyncThunk("product/updateProduct", async (product,thunkAPI) => {
  try {
    const response = await fetch(
      `https://rtk-gettingstarted-backend.herokuapp.com/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const updatedProduct = await response.json();
    return updatedProduct;

  }catch(e) {
    return thunkAPI.rejectWithValue(e);
  }
})

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.products = payload;
      state.apiState.loading = false;
      state.apiState.isSuccess = true;
    },
    [fetchProducts.rejected]: (state, action) => {},
    [fetchProducts.pending]: (state, action) => {
      state.apiState.loading = true;
      state.apiState.isSuccess = false;
    },
    [createProductMutation.fulfilled]: (state, { payload }) => {
      console.log("state",state)
      state.products.push(payload);
      state.createProductApiState.loading = false;
      state.createProductApiState.isSuccess = true;
    },
    [createProductMutation.rejected]: (state, action) => {
      state.createProductApiState.loading = false; 
      state.createProductApiState.isSuccess = false;
      state.createProductApiState.error = "Something went wrong"
    },
    [createProductMutation.pending]: (state, action) => {
      state.createProductApiState.loading = true;
      state.createProductApiState.isSuccess = false;
    },
    [updateProductMutation.fulfilled]: (state,action) => {
      const updatedProduct = action.payload;
      const productIndex = state.products.findIndex(product => product.id === updatedProduct.id);
      state.products[productIndex] = updatedProduct;
      state.updateProductApiState.loading = false;
      state.updateProductApiState.isSuccess = true;
    },
    [updateProductMutation.pending] : (state,action) => {
      state.updateProductApiState.loading = true;
      state.updateProductApiState.isSuccess = false;
    },
    [updateProductMutation.rejected] : (state,action) => {
      state.updateProductApiState.loading = false;
      state.updateProductApiState.error = "Something went wrong"
      state.updateProductApiState.isSuccess = false;
    }
  },
});

export const productSelector = (state) => state.products.products;

export const apiStateSelector = (state) => {
    return state.products.apiState
};

export const createProductApiStateSelector = (state) => {
  console.log("state",state)
  return state.products.createProductApiState
}

export const updateProductApiStateSelector = (state) => {
  return state.products.updateProductApiState
}

export default productsSlice;
