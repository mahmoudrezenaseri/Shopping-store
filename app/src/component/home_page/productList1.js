import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {smart_watch_list} from '../../data/dataArray';

const windowHeigh = Dimensions.get('window').width;

const ProductList1 = () => {
  return (
    <Fragment>
      <View style={styles.head}>
        <Text style={styles.head_right}>ساعت هوشمند</Text>
        <Text style={styles.head_left}>لیست کامل</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={smart_watch_list}
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
  container: {},
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
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeigh / 1.7,
    width: windowHeigh / 2.9,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
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

export default React.memo(ProductList1);
