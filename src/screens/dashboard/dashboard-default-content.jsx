import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectedIsLoggedIn } from "../../redux/features/auth/AuthSlice";
import { getAllProducts } from "../../redux/features/products/ProductSlice";
import ProductList from "../../components/ProductList";
import InventorySummary from "../../components/InventorySummary";

const DashboardDefaultContent = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isLoggedIn = useSelector(selectedIsLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <Container maxWidth={"md"} style={{ marginLeft: 0 }}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="9px"
      >
        <Typography variant="h5" color="subtitle2">
          Welcome To Your Dashboard
        </Typography>
      </Box>

      {/* summaries of inventory status */}
      <InventorySummary products={products} isMobile={isMobile} />

      <Divider style={{ margin: "10px" }} />

      {/* product list */}
      <Typography variant="h5" color="subtitle2">
        Inventory Items
        {products && (
          <Box mt={3}>
            <ProductList products={products} isLoading={isLoading} />
          </Box>
        )}
      </Typography>
    </Container>
  );
};

export default DashboardDefaultContent;
