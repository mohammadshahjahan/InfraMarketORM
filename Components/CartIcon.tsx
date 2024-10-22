import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useCartContext} from '../Providers/CartProvider';
import {CatalogStyles} from '../Styles/CatalogStyles';
import OverLayCart from './OverLayCart';

const CartIcon = () => {
  const {selectedItems} = useCartContext();
  const [openOverlay, setOpenOverlay] = useState(false);
  return (
    <View style={CatalogStyles.headerIcon}>
      <TouchableOpacity onPress={() => setOpenOverlay(!openOverlay)}>
        <Image source={require('../assests/IconButton.png')} />
      </TouchableOpacity>

      <Text>{selectedItems.length}</Text>
      {openOverlay && <OverLayCart setOpenOverlay={setOpenOverlay} />}
    </View>
  );
};

export default CartIcon;
