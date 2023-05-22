export const applyFilters = (products, query, filters) => {
  return products.filter((product) => {
    let matches = true;

    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (
      filters.category &&
      product.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      matches = false;
    }

    if (filters.inStock === true && product.quantity > 0) {
      matches = false;
    }

    return matches;
  });
}; // end applyFilters

export const applySorting = (products, searchOption) => {
  switch (searchOption) {
    case "price|desc":
      return Object.values(products).sort(
        (a, b) => Number(b.price) - Number(a.price)
      );

    case "price|asc":
      return Object.values(products).sort(
        (a, b) => Number(a.price) - Number(b.price)
      );

    case "quantity|desc":
      console.log(products);
      return Object.values(products).sort(
        (a, b) => Number(b.quantity) - Number(a.quantity)
      );

    case "quantity|asc":
      return Object.values(products).sort(
        (a, b) => Number(a.quantity) - Number(b.quantity)
      );

    default:
      return products;
  }
}; // end applySorting

export const applyPagination = (products, page, limit) => {
  return products.slice(page * limit, page * limit + limit);
};
