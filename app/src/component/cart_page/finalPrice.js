import {React, i18n, withTranslation} from '../components';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';

class FinalPrice extends React.Component {
  _onPressOrderButton() {
    alert('You tapped the button!');
  }

  render() {
    const {t, i18n} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.right_section}>
          <TouchableWithoutFeedback onPress={this._onPressOrderButton}>
            <View style={styles.button}>
              <Text style={styles.button_text}>{t('continue_buy_button')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.left_section}>
          <Text style={styles.left_section_title}>{t('total_amount')}</Text>
          <Text style={styles.left_section_price}>
            4.000.000
            <Text style={styles.left_section_currency}>{t('toman')}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  right_section: {
    width: '38%',
    justifyContent: 'center',
  },
  left_section: {
    justifyContent: 'center',
  },
  button: {
    height: '70%',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  button_text: {
    textAlign: 'center',
    color: 'white',
  },
  left_section_title: {
    fontSize: 11,
    color: 'grey',
  },
  left_section_currency: {
    fontSize: 11,
  },
});

export default withTranslation()(FinalPrice);
