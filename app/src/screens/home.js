import React, {Fragment} from 'react';
import {Text, View, ScrollView} from 'react-native';

// components
import Slider from '../component/home_page/slider';
import Category from '../component/home_page/category';
import Offer from '../component/home_page/offer';
import ProductList1 from '../component/home_page/productList1';
import ProductList2 from '../component/home_page/productList2';
import MyHeader from '../component/header/myHeader';

let otherProps = {
  head_name: 'MainHeader',
};

const Home = (props) => {
  return (
    <Fragment>
      <MyHeader {...otherProps} navigation={props.navigation} />
      <ScrollView style={{backgroundColor:"white"}}>
        <Slider />
        <Category />
        <Offer />
        <ProductList1 />
        <ProductList2 />
      </ScrollView>
    </Fragment>
  );
};

export default React.memo(Home);
