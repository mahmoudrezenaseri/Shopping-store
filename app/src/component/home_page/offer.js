import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {offer_list} from '../../data/dataArray';

const windowHeight = Dimensions.get('window').width;

const Offer = () => {
  return (
    <View style={styles.container}>
      {offer_list.map((item, key) =>
        item.fullSize == true ? (
          <Ripple style={styles.box_full} key={key}>
            <Image style={styles.img} source={{uri: item.img}} />
          </Ripple>
        ) : (
          <Ripple style={styles.box_half} key={key}>
            <Image style={styles.img} source={{uri: item.img}} />
          </Ripple>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box_full: {
    width: '97%',
    height: windowHeight / 3,
  },
  box_half: {
    width: '47%',
    height: windowHeight / 3,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#ffffff',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
});

export default React.memo(Offer);
