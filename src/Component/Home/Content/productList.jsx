import React from "react";
import useFetchAllData from "./useFetchAllData";

const ProductList = () => {
  const { data, loading, fetchError, pagination, goToPage } = useFetchAllData();

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Products</h1>

      {/* Product List */}
      <div className="product-grid">
        {data.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageCover} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price} EGP</p>
            {product.discount > 0 && <p>Discount: {product.discount}%</p>}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => goToPage(pagination.pageIndex - 1)}
          disabled={pagination.pageIndex === 1}
        >
          Previous
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              disabled={page === pagination.pageIndex}
              className={page === pagination.pageIndex ? "active" : ""}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(pagination.pageIndex + 1)}
          disabled={pagination.pageIndex === pagination.totalPages}
        >
          Next
        </button>
      </div>

      <div className="pagination-info">
        Page {pagination.pageIndex} of {pagination.totalPages} | Total Items:{" "}
        {pagination.totalCount}
      </div>
    </div>
  );
};

export default ProductList;
