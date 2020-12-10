import React, {Fragment} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {washing_machine_list} from '../../data/dataArray';

const windowHeigh = Dimensions.get('window').width;

const ProductList2 = () => {
  return (
    <Fragment>
      <View style={styles.head}>
        <Text style={styles.head_right}>ماشین لباسشویی</Text>
        <Text style={styles.head_left}>لیست کامل</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={washing_machine_list}
        renderItem={({item, index}) => (
          <View style={styles.flat_list} key={index}>
            <Image style={styles.img} source={{uri: item.img}} />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>{item.price} </Text>
          </View>
        )}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  head: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  head_left: {
    color: '#00bfd6',
    fontSize: 16,
  },
  head_right: {
    color: '#222222',
    fontSize: 16,
  },
  flat_list: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginRight: 5,
    marginLeft: 5,
    height: windowHeigh / 1.7,
    width: windowHeigh / 2.9,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    color: '#222222',
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
    lineHeight: 18,
  },
  price: {
    color: '#222222',
    fontSize: 13,
    //fontWeight: 'bold',
    marginTop: 15,
  },
  img: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export default React.memo(ProductList2);
