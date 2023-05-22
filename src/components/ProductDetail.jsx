import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/features/products/ProductSlice.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import Loader from "./Loader.jsx";

import DOMPurify from "dompurify";

const ProductDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 5) {
      return <span className={classes.inStock}>In Stock</span>;
    }
    if (quantity < 5 && quantity > 0) {
      return <span className={classes.lowerStock}>Lower Stock</span>;
    }
    return <span className={classes.outOfStock}>In Stock</span>;
  };

  useEffect(() => {
    dispatch(getProduct(id));

    if (isError) {
      console.log(message);
    }
  }, [id, isError, message, dispatch]);

  return (
    <div className={classes.root}>
      <Container>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLoading && <Loader />}
          <Card sx={{ maxWidth: 545 }}>
            {product?.image ? (
              <>
                <CardMedia
                  component="img"
                  height="630"
                  image={product.image.filePath}
                  alt={product.image.fileName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Availability: {stockStatus(product.quantity)}
                  </Typography>
                  <Divider />
                  <Typography gutterBottom variant="h6" component="div">
                    <Button size="big" color="primary">
                      Name:
                    </Button>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button size="medium">SKU Number: </Button>
                    {product.sku}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button size="medium">Category:</Button>
                    {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button size="medium">Price:</Button>
                    {"$"}
                    {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button size="medium">Quantity:</Button>
                    {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button size="medium">Total Value:</Button>
                    {"$"}
                    {product.price * product.quantity}
                  </Typography>
                  <Button size="medium">Description:</Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description),
                    }}
                  ></Typography>
                  <Divider />
                  <Typography variant="subtitle2" color="text.secondary">
                    Created on: {product.createdAt.toLocaleString("en-US")}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Last Updated: {product.updatedAt.toLocaleString("en-US")}
                  </Typography>
                </CardContent>
              </>
            ) : (
              <Typography gutterBottom variant="h5" component="div">
                No image found for this product
              </Typography>
            )}
          </Card>
        </Box>
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
    paddingTop: theme.spacing(2),
    paddingBottom: 100,
  },
  inStock: {
    color: theme.palette.success.main,
  },
  lowerStock: {
    color: theme.palette.warning.main,
  },
  outOfStock: {
    color: theme.palette.error.main,
  },
}));

export default ProductDetail;
