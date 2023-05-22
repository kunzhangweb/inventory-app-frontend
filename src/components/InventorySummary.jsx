import React, { useEffect } from "react";
import { Box, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedTotalValue,
  CALCULATE_TOTAL_VALUE,
  CALCULATE_OUTOFSTOCK,
  selectedOutOfStock,
  selectedCategory,
  CALCULATE_CATEGORY,
} from "../redux/features/products/ProductSlice";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AppsOutageIcon from "@mui/icons-material/AppsOutage";
import CategoryIcon from "@mui/icons-material/Category";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CurrencyFormat from "number-currency-format";
import StatusBox from "./StatusBox";

const InventorySummary = ({ products, isMobile }) => {
  const dispatch = useDispatch();
  const totalValue = useSelector(selectedTotalValue);
  const outOfStock = useSelector(selectedOutOfStock);
  const category = useSelector(selectedCategory);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_VALUE(products));
    dispatch(CALCULATE_OUTOFSTOCK(products));
    dispatch(CALCULATE_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        // flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        marginY="10px"
      >
        <Card sx={{ minWidth: 375 }}>
          <StatusBox
            title={products.length}
            subtitle="Products In Stock"
            icon={<WarehouseIcon sx={{ color: "#43A047", fontSize: "46px" }} />}
          />
        </Card>
        <Card sx={{ minWidth: 375 }}>
          <StatusBox
            title={outOfStock}
            subtitle="Out of Stock"
            icon={
              <AppsOutageIcon sx={{ color: "#43A047", fontSize: "46px" }} />
            }
          />
        </Card>
      </Box>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-around"
        alignItems="center"
        marginY="10px"
      >
        <Card sx={{ minWidth: 375 }}>
          <StatusBox
            title={category.length}
            subtitle="All Categories"
            icon={<CategoryIcon sx={{ color: "#43A047", fontSize: "46px" }} />}
          />
        </Card>
        <Card sx={{ minWidth: 375 }}>
          <StatusBox
            title={CurrencyFormat.format(totalValue, {
              currency: "$",
              spacing: false,
              currencyPosition: "LEFT",
            })}
            subtitle="Total Value"
            icon={
              <MonetizationOnIcon sx={{ color: "#43A047", fontSize: "46px" }} />
            }
          />
        </Card>
      </Box>
    </>
  );
};

export default InventorySummary;
