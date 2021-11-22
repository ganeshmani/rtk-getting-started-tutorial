import React, { Fragment, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Table, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
} from "./productsTable"; // new
import { useSelector,useDispatch } from 'react-redux'
// import { useFetchAllProductsQuery } from "../../app/services/product";
import { fetchProducts,productSelector,apiStateSelector } from './productSlice'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CreateProduct from "./createProduct";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Products = () => {
  const dispatch = useDispatch()
  // const { data, isError, isLoading, isSuccess } = useFetchAllProductsQuery();

  const productsData = useSelector(productSelector)
  const apiState = useSelector(apiStateSelector)
  console.log("apiState",apiState)

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  useEffect(() => {
    console.log("coming inside useEffect")
    async function fetchData() {
      dispatch(fetchProducts())
    }

    fetchData()
  },[])

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
    ],
    []
  );

  const _handleProductCreate = () => {
    setShowCreateProductModal(!showCreateProductModal);
  };

  const _handleProductUpdate = () => {
    setShowUpdateProductModal(!showUpdateProductModal);
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

      <CreateProduct isOpen={showCreateProductModal} handleModalClick={_handleProductCreate}/>
    </Fragment>
  );
};

export default Products;
