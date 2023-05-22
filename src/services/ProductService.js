import Axios from "axios";

const Backend_Base_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${Backend_Base_URL}/api/products`;
const END_POINT = {
  CreateProduct: `${API_URL}/create`,
  GetProducts: `${API_URL}/getAll`,
  DeleteProduct: `${API_URL}/deleteOne/`,
  GetProduct: `${API_URL}/getOne/`,
  UpdateProduct: `${API_URL}/update/`,
};

// create a new product
const createProduct = async (formData) => {
  const response = await Axios.post(END_POINT.CreateProduct, formData);
  return response.data;
};

// retrieve all products
const getAllProducts = async () => {
  const response = await Axios.get(END_POINT.GetProducts);
  return response.data;
};

// delete a product
const deleteProduct = async (id) => {
  console.log(END_POINT.DeleteProduct + id);
  const response = await Axios.delete(END_POINT.DeleteProduct + id);
  return response.data;
};

// get information of a product
const getProduct = async (id) => {
  const response = await Axios.get(END_POINT.GetProduct + id);
  return response.data;
};

// update information of a product
const updateProduct = async (id, formData) => {
  const response = await Axios.patch(END_POINT.UpdateProduct + id, formData);

  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
