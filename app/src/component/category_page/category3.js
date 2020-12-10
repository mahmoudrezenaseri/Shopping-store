import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {dress_category_list} from '../../data/dataArray';

const windowHeigh = Dimensions.get('window').width;

const Category3 = () => {
  return (
    <Fragment>
      <View style={styles.head}>
        <Text style={styles.head_right}>مد و پوشاک </Text>
        <Text style={styles.head_left}>لیست کامل</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={dress_category_list}
        renderItem={({item, index}) => (
          <View style={styles.flat_list} key={index}>
            <Image style={styles.img} source={{uri: item.img}} />

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.count}>{item.count} </Text>
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
    fontSize: 13,
  },
  head_right: {
    color: '#222222',
    fontSize: 15,
  },
  flat_list: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeigh / 2.5,
    width: windowHeigh / 3.5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    color: '#222222',
    fontSize: 12,
    marginTop: 10,
  },
  count: {
    color: '#222222',
    fontSize: 11,
    marginTop: 10,
  },
  img: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
});

export default React.memo(Category3);
