import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Ripple from 'react-native-material-ripple';

const Discount = () => {
  return (
    <Ripple style={styles.container}>
      <Image style={styles.img} source={{uri: ''}} />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(Discount);
