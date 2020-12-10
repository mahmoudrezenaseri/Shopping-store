import {React, withTranslation} from '../components';
import {
  View,
  I18nManager,
  Text,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import {smart_watch_list, sort_options} from '../../data/dataArray';
import MyHeader from '../header/myHeader';

const sortLabel = I18nManager.isRTL
  ? sort_options[0].fa_name
  : sort_options[0].en_name;

let props = {
  head_name: 'SearchHeader',
};
class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      changeSortOptions: 1,
      sortLabel: sortLabel,
    };
  }

  _handleToggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  _handleSortOption = (id) => {
    const sortLabel = I18nManager.isRTL
      ? sort_options[id].fa_name
      : sort_options[id].en_name;

    this.setState({
      changeSortOptions: id,
      showModal: false,
      sortLabel: sortLabel,
    });
  };

  render() {
    const {t, i18n} = this.props;

    const FilterModal = () => {
      return (
        <Modal visible={this.state.showModal} animationType={'slide'}>
          <View style={styles.modal}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_header_label}>مرتب سازی</Text>
              <Icon.Button
                name="close"
                backgroundColor="#3b5998"
                size={15}
                style={styles.icon_header}
                onPress={this._handleToggleModal}>
                بستن
              </Icon.Button>
            </View>
            {sort_options.map((item, key) => (
              <Ripple
                style={styles.modal_list}
                key={key}
                onPress={() => this._handleSortOption(item.id)}>
                <Text style={styles.modal_list_label}>{item.fa_name} </Text>
                {this.state.changeSortOptions == item.id ? (
                  <Icon name="check" size={20} color="green" />
                ) : null}
              </Ripple>
            ))}
          </View>
        </Modal>
      );
    };

    const FilterSection = () => {
      return (
        <View style={filter_styles.filter_section}>
          <View style={filter_styles.right_side}>
            <Ripple>
              <Icon.Button
                name="tune"
                borderRadius={0}
                color="black"
                backgroundColor="white">
                <Text style={filter_styles.icon_text}>{t('filter')}</Text>
              </Icon.Button>
            </Ripple>
            <Ripple onPress={this._handleToggleModal}>
              <Icon.Button
                name="sort"
                borderRadius={0}
                color="black"
                backgroundColor="white">
                <Text style={filter_styles.icon_text}>
                  {this.state.sortLabel}
                </Text>
              </Icon.Button>
            </Ripple>
          </View>
          <View style={filter_styles.left_side}>
            <Ripple>
              <Icon.Button
                name="share"
                borderRadius={0}
                color="black"
                backgroundColor="white"></Icon.Button>
            </Ripple>
          </View>
        </View>
      );
    };

    const ListSection = () => {
      return (
        <ScrollView>
          <View style={list_styles.list_section}>
            {smart_watch_list.map((item, key) => (
              <Ripple style={list_styles.product} key={key}>
                <View style={list_styles.right_side}>
                  <Image
                    style={list_styles.img}
                    source={{
                      uri: item.img,
                    }}
                  />
                </View>
                <View style={list_styles.left_side}>
                  <Text style={[list_styles.title]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Icon.Button
                    name="save"
                    style={list_styles.icon}
                    borderRadius={0}
                    color="#2ccccc"
                    backgroundColor="white">
                    <Text style={list_styles.icon_text}>
                      {t('product_available')}
                    </Text>
                  </Icon.Button>
                  <Text style={[list_styles.price]}> {item.price}</Text>
                </View>
              </Ripple>
            ))}
          </View>
        </ScrollView>
      );
    };

    return (
      <View style={styles.container}>
        <MyHeader {...props} />
        <FilterSection />
        <ListSection />
        <FilterModal />
      </View>
    );
  }
}

const filter_styles = StyleSheet.create({
  filter_section: {
    height: 60,
    backgroundColor: 'white',
    //elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  right_side: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  left_side: {
    justifyContent: 'center',
  },
  icon_text: {fontFamily: 'yekan', fontSize: 14},
});

const list_styles = StyleSheet.create({
  list_section: {
    paddingTop: 5,
    paddingBottom: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  product: {
    backgroundColor: 'white',
    height: 150,
    elevation: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 5,
  },
  right_side: {
    width: '30%',
  },
  left_side: {
    width: '70%',
    padding: 10,
  },
  img: {
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 12,
  },
  icon: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  icon_text: {
    fontSize: 11,
  },
  price: {
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  modal: {
    margin: 10,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  icon_header: {
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 3,
    paddingBottom: 3,
  },
  modal_list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  modal_list_label: {
    fontSize: 15,
  },
  modal_header_label: {
    textAlignVertical: 'center',
    fontSize: 17,
  },
});

export default withTranslation()(Content);
