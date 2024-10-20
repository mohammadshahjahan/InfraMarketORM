import React, {useEffect, useState} from 'react';
import {createContext, useContext} from 'react';
import {ProdutProps} from '../Components/Product';
import {ITEMS_DATA} from '../assests/ITEMS_DATA';

type selectedParamsType = {
  Brand: string[];
  Grade: string[];
  Weight: string[];
  Price: string[];
  Rating: string[];
};

interface TopDealsProducsState {
  productData: ProdutProps[];
  selectedParams: selectedParamsType;
  setSelectedParams: React.Dispatch<React.SetStateAction<selectedParamsType>>;
  searchProduct: string;
  setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
  sortByPrice: (dir: number) => void;
}

export const TopDealsContext = createContext<TopDealsProducsState | undefined>(
  undefined,
);

export const useTopDealsContext = () => {
  const context = useContext(TopDealsContext);
  if (!context) {
    throw new Error(
      'useTopDealsContext must be used within an TopDealsProvider',
    );
  }
  return context;
};

interface TopDealsProviderProps {
  children: React.ReactNode;
}

export const TopDealsProvider: React.FC<TopDealsProviderProps> = ({
  children,
}) => {
  const [selectedParams, setSelectedParams] = useState<selectedParamsType>({
    Brand: [],
    Grade: [],
    Weight: [],
    Price: [],
    Rating: [],
  });

  const [productData, setProductData] = useState(ITEMS_DATA);

  const [searchProduct, setSearchProduct] = useState('');

  const filterProductUsingSearch = () => {
    let newFilteredData = ITEMS_DATA;

    if (searchProduct) {
      newFilteredData = newFilteredData.filter(product =>
        product.label
          .toLowerCase()
          .replace(/ /g, '')
          .includes(searchProduct.toLowerCase().replace(/ /g, '')),
      );
      setProductData(newFilteredData);
    } else {
      setProductData(ITEMS_DATA);
    }
  };

  useEffect(filterProductUsingSearch, [searchProduct]);

  const filterProductsHandler = () => {
    let newFilteredData = ITEMS_DATA;

    if (selectedParams.Brand.length > 0) {
      newFilteredData = newFilteredData.filter(product =>
        selectedParams.Brand.includes(product.Brand),
      );
    }

    if (selectedParams.Grade.length > 0) {
      newFilteredData = newFilteredData.filter(product =>
        selectedParams.Grade.includes(product.Grade),
      );
    }
    if (selectedParams.Rating.length > 0) {
      newFilteredData = newFilteredData.filter(product =>
        selectedParams.Rating.includes(product.Rating),
      );
    }

    if (selectedParams.Weight.length > 0) {
      newFilteredData = newFilteredData.filter(product =>
        selectedParams.Weight.includes(product.Weight),
      );
    }

    if (selectedParams.Price.length > 0) {
      let upperBound = 0;
      for (let prices = 0; prices < selectedParams.Price.length; prices++) {
        let s: string = selectedParams.Price[prices].substring(6);
        upperBound = Math.max(upperBound, parseInt(s, 10));
      }
      if (upperBound === 0) {
        upperBound = 500;
      }
      newFilteredData = newFilteredData.filter(product => {
        const cost = product.discount ? product.discountedPrice : product.price;

        return cost <= upperBound;
      });
    }

    setProductData(newFilteredData);
  };

  useEffect(filterProductsHandler, [selectedParams]);

  const sortByPrice = (dir: number) => {
    let newProducts = productData;
    newProducts.sort((a, b) => {
      const priceA = a.discount ? a.discountedPrice : a.price;
      const priceB = b.discount ? b.discountedPrice : b.price;

      return dir === 1 ? priceA - priceB : priceB - priceA;
    });
    setProductData(newProducts);
  };

  const value = {
    productData,
    selectedParams,
    setSelectedParams,
    searchProduct,
    setSearchProduct,
    sortByPrice,
  };

  return (
    <TopDealsContext.Provider value={value}>
      {children}
    </TopDealsContext.Provider>
  );
};
