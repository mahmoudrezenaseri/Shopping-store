import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import {swiper_list} from '../../data/dataArray';

const windowWidth = Dimensions.get('window').width;

class Slider extends React.Component {
  _renderItem = ({item, key}) => {
    return (
      <View style={styles.slide} key={key}>
        <TouchableWithoutFeedback>
          <Image style={styles.img} source={{uri: item.img}} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          style={styles.carousel}
          layout={'default'}
          data={swiper_list}
          renderItem={this._renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth / 1.15}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowWidth / 2.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 7.5,
  },
  btn: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default React.memo(Slider);
