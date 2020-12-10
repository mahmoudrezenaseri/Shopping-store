import {React, withTranslation} from '../components';
import {Appbar} from 'react-native-paper';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  I18nManager,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MyHeader extends React.Component {
  render() {
    const {t, i18n} = this.props;
    const settingLabel = t('setting');

    const MainHeader = () => {
      return (
        <React.Fragment>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Appbar.Header
            style={main_header_styles.container}
            statusBarColor="white">
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('Search');
              }}>
              <View style={main_header_styles.header}>
                <Icon
                  style={[main_header_styles.icon, styles.textAlignVertical]}
                  name="search"
                  size={25}
                  color="#444444"
                />
                <Text
                  style={[
                    main_header_styles.first_elem,
                    styles.textAlignVertical,
                  ]}>
                  {t('search_in')}
                </Text>
                <Text
                  style={[
                    main_header_styles.seconed_elem,
                    styles.textAlignVertical,
                  ]}>
                  {t('digikala')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </Appbar.Header>
        </React.Fragment>
      );
    };

    const SearchHeader = () => {
      return (
        <React.Fragment>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Appbar.Header style={search_header_styles.container}>
            <View style={search_header_styles.header}>
              <Appbar.BackAction
                style={[search_header_styles.back_icon]}
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              />
              <TextInput
                style={search_header_styles.input}
                placeholder={t('search')}
              />
            </View>
          </Appbar.Header>
        </React.Fragment>
      );
    };

    const LoginHeader = () => {
      return (
        <React.Fragment>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Appbar.Header style={login_header_styles.container}>
            <Appbar.Action
              style={login_header_styles.cog}
              icon="cog"
              size={25}
              color="#555555"
              onPress={() => {
                this.props.navigation.navigate('Settings');
              }}
            />
            <Appbar.Action
              style={login_header_styles.close}
              icon="close"
              size={25}
              color="#555555"
              onPress={() => {
                alert('dismiss');
              }}
            />
          </Appbar.Header>
        </React.Fragment>
      );
    };

    const SettingHeader = () => {
      return (
        <React.Fragment>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Appbar.Header style={setting_header_styles.container}>
            <Appbar.Content
              title={settingLabel}
              titleStyle={setting_header_styles.content}
            />
            <Appbar.Action
              icon="close"
              size={25}
              color="#555555"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            />
          </Appbar.Header>
        </React.Fragment>
      );
    };

    switch (this.props.head_name) {
      case 'MainHeader':
        return MainHeader();
        break;
      case 'SearchHeader':
        return SearchHeader();
        break;
      case 'LoginHeader':
        return LoginHeader();
        break;
      case 'SettingHeader':
        return SettingHeader();
        break;
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
  },
  search_bar: {
    fontSize: 10,
  },
  textAlignVertical: {
    textAlignVertical: 'center',
  },
});

const main_header_styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    //elevation:1
  },
  header: {
    backgroundColor: '#e6e6e6',
    height: '75%',
    width: '98%',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10,
    // elevation: 0,
  },
  first_elem: {
    color: 'grey',
    fontFamily: 'IRANSansMobile_Medium',
    fontSize: 12,
  },
  seconed_elem: {
    color: 'red',
    fontFamily: 'IRANSansMobile_Bold',
    fontSize: 17,
    paddingLeft: 2,
    paddingRight: 2,
  },
  icon: {
    paddingLeft: I18nManager.isRTL ? 15 : 0,
    paddingRight: I18nManager.isRTL ? 0 : 15,
  },
});

const search_header_styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 0,
  },
  header: {
    backgroundColor: '#e6e6e6',
    width: '99%',
    height: '80%',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  back_icon: {
    //  backgroundColor: 'red',
    height: '100%',
    marginTop: 0,
    borderRadius: 0,
  },
  input: {
    // backgroundColor: 'blue',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    width: '85%',
    fontFamily: 'IRANSansMobile_Medium',
    fontSize: 14,
  },
});

const login_header_styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const setting_header_styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    fontFamily: 'yekan',
  },
});

export default withTranslation()(MyHeader);
