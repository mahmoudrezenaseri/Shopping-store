import {React, i18n, withTranslation} from '../component/components';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Content from '../component/search_page/content';
import MyHeader from '../component/header/myHeader';

let otherProps = {
  head_name: 'SearchHeader',
};

export default class Search extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MyHeader {...otherProps} navigation={this.props.navigation} />
        <Content />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({});
