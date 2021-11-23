import React, { useState,useEffect } from 'react'
import Modal from '../../shared/Modal'
import toast from 'react-hot-toast';
// import { useUpdateProductMutation } from '../../app/services/product'
import { useSelector, useDispatch } from "react-redux";
import { updateProductMutation,updateProductApiStateSelector } from './productSlice';

const UpdateProduct = ({ selectedProduct,isOpen,handleModalClick }) => {

    const dispatch = useDispatch();
    // const [updateUser,{data,isSuccess,isLoading,isError,error}] = useUpdateProductMutation()

    const apiState = useSelector(updateProductApiStateSelector);
    const [state,setState] = useState({
        name : selectedProduct?.name,
        category : selectedProduct?.category,
        price : selectedProduct?.price,
        stock : selectedProduct?.stock
    })

    useEffect(() => {
        if(selectedProduct){
            setState({...state, 
                name : selectedProduct?.name,
                category : selectedProduct?.category,
                price : selectedProduct?.price,
                stock : selectedProduct?.stock
            })
        }
       
    },[selectedProduct])


    useEffect(() => {
        if(apiState && apiState.isSuccess){
            toast.success('Product updated Successfully')

            handleModalClick()
        }
        if(apiState && apiState.isError){
            toast.error(apiState.error)
        }

    },[apiState])

    const _handleOnChange = (e) => {
        setState({ ...state, [e.target.name] : e.target.value })
    }

    const _handleUpdateProduct = async (e) => {
        try {
            e.preventDefault()
            dispatch(updateProductMutation({
                id : selectedProduct?.id,
                name : state.name,
                category : state.category,
                price : state.price,
                stock : state.stock
            }))
            // await updateUser({...state,id: selectedProduct.id})
        }
        catch(e){
            toast.error("Error while creating an user")
        }
        
    }

    return (<Modal isOpen={isOpen} setOpen={handleModalClick}>
        <form onSubmit={_handleUpdateProduct}>
        <div>
            <h4 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Update User</h4>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={state.name}
                        onChange={_handleOnChange}
                        autoComplete="name"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <div className="mt-1 w-full">
                    <select
                        id="category"
                        name="category"
                        value={state.category}
                        onChange={_handleOnChange}
                        autoComplete="category"
                        className="block focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Furniture</option>
                        <option>Footwear</option>
                        
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock
                </label>
                <div className="mt-1">
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={state.stock}
                        onChange={_handleOnChange}
                        autoComplete="stock"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <div className="mt-1">
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={state.price}
                        onChange={_handleOnChange}
                        autoComplete="price"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            
            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </div>
        </div>
        </form>
    </Modal>)
}


export default UpdateProduct