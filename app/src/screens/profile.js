import React, {Fragment} from 'react';
import {Text, View, ScrollView} from 'react-native';

import Login from '../component/profile_page/login';
import MyHeader from '../component/header/myHeader';

let otherProps = {
  head_name: 'LoginHeader',
};

const Profile = (props) => {
  return (
    <Fragment>
      <MyHeader {...otherProps} navigation={props.navigation} />
      <Login />
    </Fragment>
  );
};

export default React.memo(Profile);
