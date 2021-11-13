import React, { useState,useEffect } from 'react'
import Modal from '../../shared/Modal'
import toast from 'react-hot-toast';
import { useCreateProductMutation } from '../../app/services/product'
const CreateProduct = ({ isOpen,handleModalClick }) => {

    const [state,setState] = useState({
        name : "",
        category : "",
        price : "",
        stock : ""
    })

    const [createProduct,{data,isSuccess}] = useCreateProductMutation()

    useEffect(() => {
        if(isSuccess){
            toast.success('Product Created Successfully')
            handleModalClick()
        }
    },[data,isSuccess])

    const _handleOnChange = (e) => {
        setState({ ...state, [e.target.name] : e.target.value })
    }

    const _handleCreateProduct = async (e) => {
        try {
            e.preventDefault()
            await createProduct({...state})
        }
        catch(e){
            toast.error("Error while creating an user")
        }
        
    }

    return (<Modal isOpen={isOpen} setOpen={handleModalClick}>
        <form onSubmit={_handleCreateProduct}>
        <div>
            <h4 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Create Product</h4>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={_handleOnChange}
                        autoComplete="name"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-0">
                    Category
                </label>
                <div className="mt-1 w-full">
                    <select
                        id="category"
                        name="category"
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Stock
                </label>
                <div className="mt-1">
                    <input
                        id="stock"
                        name="stock"
                        type="number"
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
                    Create
                </button>
            </div>
        </div>
        </form>
    </Modal>)
}

export default CreateProduct