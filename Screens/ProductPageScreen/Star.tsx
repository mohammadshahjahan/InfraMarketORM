import {Image, View} from 'react-native';

import React from 'react';

const Star = ({star}: {star: number}) => {
  let stars = [];
  let notstars = [];

  for (let i = 1; i <= star; i++) {
    stars.push(1);
  }
  for (let i = 1; i <= 5 - star; i++) {
    notstars.push(1);
  }

  return (
    <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
      {stars.map((_, ind) => (
        <FilledStar key={ind} />
      ))}
      {notstars.map((_, ind) => (
        <NotFilledStar key={ind} />
      ))}
    </View>
  );
};

export default Star;

const FilledStar = () => {
  return <Image source={require('../../assests/Star.png')} />;
};

const NotFilledStar = () => {
  return <Image source={require('../../assests/emptystar.png')} />;
};
