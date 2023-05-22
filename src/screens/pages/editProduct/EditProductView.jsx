import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsLoading,
  selectedProduct,
  updateProduct,
  getProduct,
  getAllProducts,
} from "../../../redux/features/products/ProductSlice";
import Loader from "../../../components/Loader";
import AddProductForm from "../../../components/AddProductForm";

const EditProductView = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectedProduct);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  // save all the modifications
  const saveProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("sku", product?.sku);
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("brand", product?.brand);
    formData.append("price", product?.price);
    formData.append("quantity", product?.quantity);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    dispatch(updateProduct({ id, formData }));
    dispatch(getAllProducts());
    navigate.push("/dashboard");
  };

  // retrieve the product again
  // when its value changes
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // modify the information of the product
  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

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

export default EditProductView;
