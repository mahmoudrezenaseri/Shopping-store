import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {category_list} from '../../data/dataArray';

const Category = () => {
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {category_list.map((item, key) => (
        <TouchableOpacity style={styles.btn} key={key}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#009933',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    marginRight: 10,
  },
  text: {
    color: '#ffffff',
    alignContent: 'center',
    fontSize: 11,
  },
});

export default React.memo(Category);
