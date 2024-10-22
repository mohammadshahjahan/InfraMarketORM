/* eslint-disable react-native/no-inline-styles */
// I removed inline css es lint warning

import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ImageContainerStyles} from '../../Styles/ImageContainerStyles';
import {QuantityVariableStyles} from './Quantity';

const ImageContainer = () => {
  const image1 = require('../../assests/CementBag.png');
  const image2 = require('../../assests/cement.png');
  const images = [image1, image2];
  const [currImageIndex, setCurrImageIndex] = useState(0);

  const nextImage = () => {
    if (currImageIndex === images.length - 1) {
      return;
    }

    setCurrImageIndex(currImageIndex + 1);
  };
  const prvImage = () => {
    if (currImageIndex === 0) {
      return;
    }
    setCurrImageIndex(currImageIndex - 1);
  };
  return (
    <View>
      <View style={{paddingVertical: 20}}>
        <Image
          source={images[currImageIndex]}
          style={{height: 500, width: '100%'}}
        />
      </View>
      <View style={ImageContainerStyles.box}>
        <TouchableOpacity
          onPress={prvImage}
          style={[
            {
              width: '17%',
              backgroundColor: '#f6f6f6',
              paddingVertical: 10,
            },
            QuantityVariableStyles.box,
          ]}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 600}}>&lt;</Text>
          </View>
        </TouchableOpacity>

        <View style={QuantityVariableStyles.box}>
          {images.map((image, index) => (
            <TouchableOpacity
              onPress={() => setCurrImageIndex(index)}
              key={index}
              style={
                images[currImageIndex] === image
                  ? {borderWidth: 1, borderColor: '#f15927'}
                  : {}
              }>
              <Image source={image} style={{height: 50, width: 50}} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={nextImage}
          style={[
            {
              width: '17%',
              backgroundColor: '#f6f6f6',
              paddingVertical: 10,
            },
            QuantityVariableStyles.box,
          ]}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 600}}>&gt;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageContainer;
