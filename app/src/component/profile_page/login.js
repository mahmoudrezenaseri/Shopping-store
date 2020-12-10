import {React, i18n, withTranslation} from '../components';
import {
  I18nManager,
  Text,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class Login extends React.Component {
  _loginHandler() {
    alert('Login Pressed!');
  }

  render() {
    const {t, i18n} = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
          <View style={styles.logo_section}>
            <HideWithKeyboard>
              <Image
                style={styles.img}
                source={require('../../assets/img/logo/Digikala.jpg')}
              />
            </HideWithKeyboard>
          </View>
          <View style={styles.input_section}>
            <HideWithKeyboard>
              <Text style={styles.input_section_text}>
                {t('login_intro_text')}
              </Text>
            </HideWithKeyboard>
            <TextInput
              style={styles.input}
              label={t('mobile')}
              fontFamily={'yekan'}
              theme={{fonts: {regular: ''}}}
              mode="outlined"
              numberOfLines={1}
            />
            <Button
              style={styles.button}
              labelStyle={styles.button_label}
              contentStyle={styles.button_content}
              mode="contained"
              onPress={this._loginHandler}>
              {t('login_button')}
            </Button>
          </View>
          <View style={styles.copy_right_section}>
            <HideWithKeyboard>
              <Text style={styles.copy_right_text}>
                {t('login_copy_right')}
              </Text>
            </HideWithKeyboard>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo_section: {
    flex: 1.6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    height: '80%',
    resizeMode: 'contain',
  },
  input_section: {
    flex: 1,
  },
  input_section_text: {
    color: '#444444',
    fontSize: 13,
  },
  input: {
    height: 50,
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    height: 45,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  button_label: {
    fontSize: 13,
    fontFamily: 'sans',
  },
  button_content: {
    height: '100%',
    paddingTop: 3,
  },
  copy_right_section: {
    flex: 0.5,
    justifyContent: 'center',
  },
  copy_right_text: {
    color: '#444444',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default withTranslation()(Login);
