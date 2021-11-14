import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Table, {
  SelectColumnFilter,
  StatusPill,
} from "./productsTable"; // new
import { useFetchAllProductsQuery } from "../../app/services/product";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CreateProduct from "./createProduct";
import UpdateProduct from "./updateProduct";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Product = () => {
  const { data, isLoading } = useFetchAllProductsQuery();

  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

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
        Header : 'Action',
        Cell:  ({ value, column, row }) => {
            return (
            <a href="" onClick={(e) => handleUpdateClick({e,data : row.original})} className="text-indigo-600 hover:text-indigo-900">
              Edit
            </a>
          )
        }
    }
    ],
    []
  );

  const _handleProductCreate = () => {
    setShowCreateProductModal(!showCreateProductModal);
  };

  const _handleProductUpdate = () => {
    setShowUpdateProductModal(!showUpdateProductModal);
  }

  const handleUpdateClick = ({e,data}) => {
    e.preventDefault();
    setSelectedProduct(data)
    setShowUpdateProductModal(!showUpdateProductModal)
}



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
      <UpdateProduct  isOpen={showUpdateProductModal} selectedProduct={selectedProduct} handleModalClick={_handleProductUpdate}/>
    </Fragment>
  );
};

export default Product;
