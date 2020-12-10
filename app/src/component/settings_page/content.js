import {React, i18n, withTranslation} from '../components';
import {View, Text, I18nManager, Dimensions, StyleSheet} from 'react-native';
import {
  List,
  Divider,
  Button,
  Dialog,
  Portal,
  Provider,
  RadioButton,
} from 'react-native-paper';
import RNRestart from 'react-native-restart';

var {width, height} = Dimensions.get('window');

class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      languageValue: I18nManager.isRTL ? 'fa' : 'en',
    };
  }

  _toggleDialog = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  _changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa').then(() => {
      I18nManager.forceRTL(i18n.language === 'fa');
      RNRestart.Restart();
    });
  };

  _changeLanguageOption = (value) => {
    this.setState({
      languageValue: value,
    });
  };

  render() {
    const {t, i18n} = this.props;
    const faq = t('faq');
    const contactUs = t('contactUs');
    const languageChange = t('languageChange');

    const DialogBox = () => {
      return (
        <Provider>
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={this._toggleDialog}>
              <Dialog.Title style={styles.dialog_title}>
                {t('languageChange')}
              </Dialog.Title>
              <RadioButton.Group
                onValueChange={(value) => this._changeLanguageOption(value)}
                value={this.state.languageValue}>
                <RadioButton.Item label="فارسی  - Farsi" value="fa" />
                <RadioButton.Item label="انگلیسی - English" value="en" />
              </RadioButton.Group>
              <Dialog.Actions>
                <Button onPress={this._changeLanguage}>{t('confirm')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.list_section}>
          <List.Item
            title={faq}
            titleStyle={styles.list_title}
            left={() => <List.Icon icon="help-circle-outline" />}
            right={() =>
              I18nManager.isRTL ? (
                <List.Icon icon="chevron-left" />
              ) : (
                <List.Icon icon="chevron-right" />
              )
            }
          />
          <Divider />
          <List.Item
            title={contactUs}
            titleStyle={styles.list_title}
            left={() => <List.Icon icon="phone" />}
            right={() =>
              I18nManager.isRTL ? (
                <List.Icon icon="chevron-left" />
              ) : (
                <List.Icon icon="chevron-right" />
              )
            }
          />
          <Divider />
          <List.Item
            title={languageChange}
            titleStyle={styles.list_title}
            left={() => <List.Icon icon="earth" />}
            right={() =>
              I18nManager.isRTL ? (
                <List.Icon icon="chevron-left" />
              ) : (
                <List.Icon icon="chevron-right" />
              )
            }
            onPress={this._toggleDialog}
          />
          <Divider />
        </View>

        <View style={styles.footer_section}>
          <Text style={styles.footer_label}>App Version 2.3.3 - GP</Text>
        </View>

        <DialogBox />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list_title: {
    fontFamily: 'sans',
  },
  list_section: {
    height: height - 120,
  },
  footer_section: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 120,
  },
  dialog_title: {
    fontFamily: 'yekan',
  },
});

export default withTranslation()(Content);
