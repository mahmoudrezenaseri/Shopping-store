import {React, i18n, withTranslation} from '../components';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {cart_list} from '../../data/dataArray';

class CartItem extends React.Component {
  _onPressDeleteButton() {
    alert('Delete Button Pressed!');
  }

  render() {
    const {t, i18n} = this.props;

    return (
      <View style={styles.container}>
        {cart_list.map((item, key) => (
          <View style={styles.content} key={key}>
            <View style={styles.section_one}>
              <View style={styles.section_one_right}>
                <Image
                  style={styles.section_one_img}
                  source={{uri: item.img}}
                />
              </View>
              <View style={styles.section_one_left}>
                <Text style={[styles.text_right, styles.h3]} numberOfLines={2}>
                  {item.titleEn}
                </Text>
                <Text style={[styles.h4_lightgray]} numberOfLines={2}>
                  {item.titleFa}
                </Text>

                <View style={[styles.flex_di_row]}>
                  <Text style={styles.h4_darkgray}>رنگ : </Text>
                  <Text style={[styles.h4_lightgray]}>{item.color}</Text>
                </View>

                <View style={[styles.flex_di_row]}>
                  <Text style={styles.h4_darkgray}>گارانتی : </Text>
                  <Text style={[styles.h4_lightgray]}>{item.warranty}</Text>
                </View>

                <View style={[styles.flex_di_row]}>
                  <Text style={[styles.h4_darkgray]}>فروشنده :</Text>
                  <Text style={[styles.h4_lightgray]}>{item.seller}</Text>
                </View>
                <View style={[styles.flex_di_row]}>
                  <Text style={styles.h4_darkgray}>تعداد : </Text>
                  <Picker
                    style={[styles.color_picker, styles.h4_lightgray]}
                    mode="dropdown">
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.section_two}>
              <Text style={styles.small_font}>{t('total_price')}</Text>
              <Text style={styles.small_font}>{item.price}</Text>
            </View>
            <View style={styles.section_three}>
              <Text style={[styles.color_green, styles.small_font]}>
                {t('final_price')}
              </Text>
              <Text style={[styles.color_green, styles.small_font]}>
                {item.totalPrice}
              </Text>
            </View>
            <View style={styles.section_four}>
              <TouchableWithoutFeedback onPress={this._onPressDeleteButton}>
                <Text style={[styles.delete_button, styles.small_font]}>
                  {t('delete')}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    backgroundColor: 'white',
    height: 320,
    elevation: 2,
    marginBottom: 15,
  },
  section_one: {
    flexDirection: 'row',
    height: '64%',
  },
  section_one_left: {
    width: '80%',
    height: '100%',
    padding: 10,
  },
  section_one_right: {
    alignItems: 'center',
    width: '20%',
    height: '100%',
    marginTop: 10,
  },
  color_picker: {
    width: 50,
    height: 30,
  },
  section_one_img: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
  },
  flex_di_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  h3: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#111',
  },
  h4_lightgray: {
    fontSize: 12,
    color: '#aaa',
  },
  h4_darkgray: {
    fontSize: 12,
    color: '#444',
  },
  small_font: {
    fontSize: 12,
  },
  section_two: {
    width: '100%',
    height: '12%',
    backgroundColor: '#eee',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  section_three: {
    width: '100%',
    height: '12%',
    backgroundColor: '#eee',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  section_four: {
    color: 'red',
    height: '12%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  delete_button: {
    color: 'red',
  },
  color_green: {
    color: 'green',
  },
});

export default withTranslation()(CartItem);
