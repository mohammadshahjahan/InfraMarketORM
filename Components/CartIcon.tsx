import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CatalogStyles} from '../Styles/CatalogStyles';
import OverLayCart from './OverLayCart';
import {storeState} from '../store/store';
import {useSelector} from 'react-redux';

const CartIcon = () => {
  const {selectedItems} = useSelector((state: storeState) => state.CartReducer);
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
