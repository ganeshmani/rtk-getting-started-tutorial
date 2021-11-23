import React, { Fragment, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
} from "./productsTable"; // new
import { useSelector, useDispatch } from "react-redux";
// import { useFetchAllProductsQuery } from "../../app/services/product";
import {
  fetchProducts,
  productSelector,
  apiStateSelector,
} from "./productSlice";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CreateProduct from "./createProduct";
import UpdateProduct from "./updateProduct";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Products = () => {
  const dispatch = useDispatch();
  // const { data, isError, isLoading, isSuccess } = useFetchAllProductsQuery();

  const productsData = useSelector(productSelector);
  const apiState = useSelector(apiStateSelector);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  useEffect(() => {
    console.log("coming inside useEffect");
    async function fetchData() {
      dispatch(fetchProducts());
    }

    fetchData();
  }, []);

  const _handleProductUpdate = () => {
    setShowUpdateProductModal(!showUpdateProductModal);
  };

  const handleUpdateClick = ({ e, data }) => {
    e.preventDefault();
    setSelectedProduct(data);
    setShowUpdateProductModal(!showUpdateProductModal);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: StatusPill,
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
      {
        Header: "Unit Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Action",
        Cell: ({ value, column, row }) => {
          return (
            <a
              href=""
              onClick={(e) => handleUpdateClick({ e, data: row.original })}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </a>
          );
        },
      },
    ],
    []
  );

  const _handleProductCreate = () => {
    setShowCreateProductModal(!showCreateProductModal);
  };

  return (
    <Fragment>
      {apiState.loading ? (
        <ClimbingBoxLoader
          color={"#4045B4"}
          loading={apiState.loading}
          css={override}
          size={15}
        />
      ) : productsData ? (
        <Table
          columns={columns}
          data={productsData}
          handleCreateProductClick={_handleProductCreate}
        />
      ) : null}

      <CreateProduct
        isOpen={showCreateProductModal}
        handleModalClick={_handleProductCreate}
      />
      <UpdateProduct
        isOpen={showUpdateProductModal}
        selectedProduct={selectedProduct}
        handleModalClick={_handleProductUpdate}
      />
    </Fragment>
  );
};

export default Products;
