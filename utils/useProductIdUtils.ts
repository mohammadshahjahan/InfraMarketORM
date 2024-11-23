import { useSelector } from "react-redux";
import { storeState } from "../store/store";



export const useGetData  = (id:number) => {
    const products = useSelector((state: storeState) => state.topDealsReducer.fetchProducts);
    const product = products.filter((prod) => prod.id === id);
    return product[0];
};

export const GetData = (id:number) => {
    return useGetData(id);
};
