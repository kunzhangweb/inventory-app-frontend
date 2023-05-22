import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleFieldChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent>
          <Box
            component="form"
            onSubmit={saveProduct}
            noValidate
            sx={{ mt: 1, width: 700 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="sku"
              label="SKU"
              name="sku"
              value={product?.sku}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              value={product?.name}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={product?.category}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="brand"
              label="Brand"
              name="brand"
              value={product?.brand}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              value={product?.price}
              onChange={handleFieldChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              value={product?.quantity}
              onChange={handleFieldChange}
              autoFocus
            />
            {/* upload an image */}
            <Box sx={{ border: "1px dashed grey", padding: "9px" }}>
              <InputLabel>Product Image</InputLabel>
              <TextField
                name="upload"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1, mx: 5 }}>
                Save Product
              </Button>
              {imagePreview != null ? (
                <div>
                  <img src={imagePreview} alt="product" />
                </div>
              ) : (
                <Typography variant="h6">
                  No image selected for this poduct yet.
                </Typography>
              )}
            </Box>
            {/* product description */}
            <Box sx={{ mt: 2 }}>
              <InputLabel>Product Description</InputLabel>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={AddProductForm.modules}
                formats={AddProductForm.formats}
              />
            </Box>
            {/* end description */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

AddProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
AddProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default AddProductForm;
