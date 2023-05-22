import React, { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  SvgIcon,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import numeral from "numeral";
import {
  Image as ImageIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
  Search as SearchIcon,
} from "react-feather";
import ViewIcon from "@mui/icons-material/Cameraswitch";
import { makeStyles } from "@mui/styles";

import {
  // categoryOptions,
  sortOptions,
} from "../data/InputProductOptions";
import {
  applyFilters,
  applyPagination,
  applySorting,
} from "../utils/TableGadgets";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  selectedCategory,
} from "../redux/features/products/ProductSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  // console.log(products);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    inStock: null,
  });
  const categoryOptions = useSelector(selectedCategory);

  const dispatch = useDispatch();

  const handleQueryChange = (event) => {
    event.persist();

    setQuery(event.target.value);
  };

  const handleStockChange = (event) => {
    event.persist();

    let value = false;

    if (event.target.checked) {
      value = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      inStock: value,
    }));
  };

  const handleCategoryChange = (event) => {
    event.persist();

    let value = null;

    if (event.target.value !== "all") {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  };

  const handleSortChange = (event) => {
    event.persist();

    setSortOption(event.target.value);
  };

  // construct queries
  const filteredProducts = applyFilters(products, query, filters);
  const sortedProducts = applySorting(filteredProducts, sortOption);
  const paginatedProducts = applyPagination(sortedProducts, page, limit);
  // const enableBulkOperations = selectedProducts.length > 0;
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;

  const handleSelectAllProducts = (event) => {
    setSelectedProducts(
      event.target.checked ? products.map((product) => product._id) : []
    );
  };

  const handleSelectOneProduct = (event, productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };

  // portal to confirm a delete action
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to remove this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <Card className={classes.root}>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <TextField
            className={classes.queryField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sortOption || "price|desc"}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        {/* end searching and sorting */}

        <Box mt={3} display="flex" alignItems="center">
          <TextField
            className={classes.categoryField}
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || "all"}
            variant="outlined"
          >
            <option value={"all"}>All</option>
            {categoryOptions.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </TextField>

          <Box flexGrow={1} />
          <FormControlLabel
            className={classes.stockField}
            control={
              <Checkbox
                checked={!!filters.inStock}
                onChange={handleStockChange}
                name="outOfStock"
              />
            }
            label="Out of Stock"
          />
        </Box>
        {/* end category and stock check */}
      </Box>
      {/* {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllProducts}
              indeterminate={selectedSomeProducts}
              onChange={handleSelectAllProducts}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant="outlined" className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )} */}
      {/* data table */}
      {!isLoading && products.length === 0 ? (
        <Typography variant="h6" color="subtitle2" margin="1rem">
          No Data Found!
        </Typography>
      ) : (
        <PerfectScrollbar>
          <Box minWidth={1300}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAllProducts}
                      indeterminate={selectedSomeProducts}
                      onChange={handleSelectAllProducts}
                    />
                  </TableCell>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Value</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => {
                  const isProductSelected = selectedProducts.includes(
                    product._id
                  );

                  return (
                    <TableRow
                      hover
                      key={product._id}
                      selected={isProductSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isProductSelected}
                          onChange={(event) =>
                            handleSelectOneProduct(event, product._id)
                          }
                          value={isProductSelected}
                        />
                      </TableCell>
                      <TableCell className={classes.imageCell}>
                        {product.image ? (
                          <img
                            alt="Product"
                            src={product.image.filePath}
                            className={classes.image}
                          />
                        ) : (
                          <Box p={2} bgcolor="background.dark">
                            <SvgIcon>
                              <ImageIcon />
                            </SvgIcon>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        $
                        {numeral(product.price).format(
                          `${product.currency}0,0.00`
                        )}{" "}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        $
                        {numeral(product.price * product.quantity).format(
                          `${product.currency}0,0.00`
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <SvgIcon fontSize="small">
                            <Link
                              to={`dashboard/product-detail/${product._id}`}
                            >
                              <ViewIcon />
                            </Link>
                          </SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon fontSize="small">
                            <Link to={`dashboard/edit-product/${product._id}`}>
                              <EditIcon />
                            </Link>
                          </SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon fontSize="small">
                            <DeleteIcon
                              onClick={() => confirmDelete(product._id)}
                            />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={limit}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
            />
          </Box>
        </PerfectScrollbar>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  categoryField: {
    flexBasis: 200,
  },
  stockField: {
    marginLeft: theme.spacing(2),
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkOperations: {
    position: "relative",
  },

  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0,
  },
  image: {
    height: 68,
    width: 68,
  },
}));

export default ProductList;
