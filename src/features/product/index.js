import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Table, {
  SelectColumnFilter,
  StatusPill,
} from "./productsTable"; // new
import { useFetchAllProductsQuery } from "../../app/services/product";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CreateProduct from "./createProduct";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Product = () => {
  const { data, isLoading } = useFetchAllProductsQuery();

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

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
      {isLoading ? (
        <ClimbingBoxLoader
          color={"#4045B4"}
          loading={isLoading}
          css={override}
          size={15}
        />
      ) : data ? (
        <Table
          columns={columns}
          data={data}
          handleCreateProductClick={_handleProductCreate}
        />
      ) : null}

      <CreateProduct isOpen={showCreateProductModal} handleModalClick={_handleProductCreate}/>
    </Fragment>
  );
};

export default Product;
