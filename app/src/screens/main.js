import {React, i18n, withTranslation} from '../component/components';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// pages
import Home from './home';
import Cart from './cart';
import Category from './category';
import Profile from './profile';

class Main extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const {t, i18n} = this.props;

    const tabBarLabelHome = t('home_tab');
    const tabBarLabelCategory = t('category_tab');
    const tabBarLabelCart = t('cart_tab');
    const tabBarLabelProfile = t('profile_tab');

    return (
      <Tab.Navigator
        initialRouteName="Home"
        size="15"
        tabBarOptions={{
          activeTintColor: '#444444',
          inactiveTintColor: '#aaaaaa',
          labelStyle: {
            fontSize: 10,
            marginBottom: 2,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: tabBarLabelHome,
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Icon name={'home'} color={color} style={styles.icon} />
              ) : (
                <Icon name={'home-outline'} color={color} style={styles.icon} />
              ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarLabel: tabBarLabelCategory,
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Icon name={'grid'} color={color} style={styles.icon} />
              ) : (
                <Icon name={'grid-outline'} color={color} style={styles.icon} />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: tabBarLabelCart,
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Icon name={'cart'} color={color} style={styles.icon} />
              ) : (
                <Icon name={'cart-outline'} color={color} style={styles.icon} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: tabBarLabelProfile,
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Icon name={'person'} color={color} style={styles.icon} />
              ) : (
                <Icon
                  name={'person-outline'}
                  color={color}
                  style={styles.icon}
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
  },
});

export default withTranslation()(Main);
