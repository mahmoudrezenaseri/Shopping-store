import React, {Fragment} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import CartItem from '../component/cart_page/cartItem';
import FinalPrice from '../component/cart_page/finalPrice';

export default Cart = () => {
  return (
    <Fragment>
      <ScrollView>
        <CartItem />
      </ScrollView>
      <FinalPrice />
    </Fragment>
  );
};
