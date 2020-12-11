import {React, withTranslation} from '../components';
import {View, Text, I18nManager, ScrollView, StyleSheet} from 'react-native';

class Content extends React.Component {
  render() {
    const {t, i18n} = this.props;

    return (
      <View style={styles.container}>
        {/* <Text>hello</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default withTranslation()(Content);
