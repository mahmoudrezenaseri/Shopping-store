import {React, i18n, withTranslation} from '../component/components';
import {Text, View, StyleSheet} from 'react-native';
import Content from '../component/confirmation_code_page/content';

let otherProps = {
  head_name: 'confirmationCodeHeader',
};

const ConfirmationCode = (props) => {
  return <Content/>;
};

export default React.memo(ConfirmationCode);
