import {React, i18n, withTranslation} from '../component/components';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Content from '../component/product_list_page/content';

export default class ProductList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Content />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({});
