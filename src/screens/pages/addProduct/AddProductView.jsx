import React, { useState } from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import AddProductForm from "../../../components/AddProductForm";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createNewProduct,
  selectIsLoading,
} from "../../../redux/features/products/ProductSlice";
import Loader from "../../../components/Loader";

const initialState = {
  sku: "",
  name: "",
  category: "",
  brand: "",
  price: "",
  quantity: 0,
  description: "",
};

const AddProductView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);
  const navigate = useHistory();

  const { sku, name, category, brand, price, quantity } = product;

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("sku", sku);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createNewProduct(formData));
    navigate.push("/dashboard");
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  return (
    <div className={classes.root}>
      <Container>
        {isLoading && <Loader />}
        <AddProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleFieldChange={handleFieldChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(1),
    paddingBottom: 100,
  },
}));

export default AddProductView;
