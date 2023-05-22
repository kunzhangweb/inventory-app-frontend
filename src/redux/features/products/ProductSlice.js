import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "../../../services/ProductService";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  outOfStock: 0,
  category: [],
  totalValue: 0,
};

// create a new product
export const createNewProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    } // end try-catch
  }
);

// retrieve all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    } // end try-catch
  }
);

// delete a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// retrieve an information of a single product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update information of a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALCULATE_TOTAL_VALUE(state, action) {
      const products = action.payload;
      const valueArray = [];
      products.map((item) => {
        const { price, quantity } = item;
        const subTotalValue = price * quantity;
        return valueArray.push(subTotalValue);
      });

      const totalValue = valueArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalValue = totalValue;
    },
    CALCULATE_OUTOFSTOCK(state, action) {
      const products = action.payload;
      const stockArray = [];
      products.map((item) => {
        const { quantity } = item;

        return stockArray.push(quantity);
      });
      let count = 0;
      stockArray.forEach((num) => {
        if (num === 0 || num === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALCULATE_CATEGORY(state, action) {
      const products = action.payload;
      const catArray = [];
      products.map((item) => {
        const { category } = item;

        return catArray.push(category);
      });
      const uniqueCategory = [...new Set(catArray)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("The product has been added successfully!");
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get products cases
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // delete a product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get a product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  CALCULATE_TOTAL_VALUE,
  CALCULATE_OUTOFSTOCK,
  CALCULATE_CATEGORY,
  SEARCH_PRODUCT,
} = ProductSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectedTotalValue = (state) => state.product.totalValue;
export const selectedOutOfStock = (state) => state.product.outOfStock;
export const selectedCategory = (state) => state.product.category;
export const selectedProduct = (state) => state.product.product;

export default ProductSlice.reducer;
