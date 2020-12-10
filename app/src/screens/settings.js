import {React, i18n, withTranslation} from '../component/components';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Content from '../component/settings_page/content';
import MyHeader from '../component/header/myHeader';

let otherProps = {
  head_name: 'SettingHeader',
};

export default class Settings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MyHeader {...otherProps} navigation={this.props.navigation} />
        <Content />
      </React.Fragment>
    );
  }
}
