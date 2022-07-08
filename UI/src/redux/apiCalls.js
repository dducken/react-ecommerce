import {
    loginFailure,
    loginStart,
    loginSuccess
} from "./UserRedux"
import {
    publicRequest,
    userRequest
} from "../requestMethods"
import {
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart,
    getProductSuccess,
    getProductByIdStart,
    getProductByIdSuccess,
    getProductByIdFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux";

// Login
export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user)
        console.log(res.data);
        dispatch(loginSuccess(res.data));
      
    } catch (err) {
        dispatch(loginFailure());
        
    }
}

// Get products
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());

    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
}

// Get single product
export const getProductById = async (id, dispatch) => {
    dispatch(getProductByIdStart());

    try {
        const res = await publicRequest.get(`/products/get/${id}`)
        dispatch(getProductByIdSuccess(res.data));
    } catch (err) {
        dispatch(getProductByIdFailure());
    }
}
// Delete product 
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

// Update Product
export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      const res = await publicRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess({ id, product })); //atencion al name
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

export const createProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products/add/`,product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };

