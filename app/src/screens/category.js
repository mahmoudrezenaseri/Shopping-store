import React, {Fragment} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

// components
import Category1 from '../component/category_page/category1';
import Category2 from '../component/category_page/category2';
import Category3 from '../component/category_page/category3';
import MyHeader from '../component/header/myHeader';

let otherProps = {
  head_name: 'MainHeader',
};

export default Category = (props) => {
  return (
    <Fragment>
      <MyHeader {...otherProps} navigation={props.navigation} />

      <ScrollView>
        <Category1 />
        <Category2 />
        <Category3 />
      </ScrollView>
    </Fragment>
  );
};
