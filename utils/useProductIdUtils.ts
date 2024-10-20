import { ITEMS_DATA } from "../assests/ITEMS_DATA"

const products = ITEMS_DATA;

export const getData = (id:number) => {
    const product = products.filter((prod) => prod.id === id);
    return product[0];
};
