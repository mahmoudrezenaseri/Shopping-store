import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      digikala: 'Digikala',
      search_in: 'Search In',
      search: 'Search',
      login_intro_text:
        'Enter your mobile number or e-mail to login or register in DigiKala',
      login_copy_right:
        'By entering or registering at Digitala you agree to the Terms and Conditions of Use the Service You accept the Digitala and its privacy policy.',
      mobile: 'Mobile Number',
      login_button: 'Login To Digkala',
      home_tab: 'Home',
      profile_tab: 'My Digikala',
      category_tab: 'Categories',
      cart_tab: 'Cart',
      filter: 'Filters',
      product_available: 'Available in Digikala warehouse',
      continue_buy_button: 'Continue To Buy',
      total_amount: 'Total Amount',
      total_price: 'Total Price',
      final_price: 'Final Price',
      toman: 'Toman',
      delete: 'Delete',
      setting: 'Settings',
      languageChange: 'Change App Language',
      confirm: 'Confirm',
      faq: 'FAQ',
      contactUs: 'Contant Us',
    },
  },
  fa: {
    translation: {
      digikala: 'دیجیکالا',
      search_in: 'جستجو در ',
      search: 'جستجو',
      login_intro_text:
        'برای ورود و یا ثبت نام در دیجیکالا شماره موبایل یا پست الکترونیک خود را وارد نمایید',
      login_copy_right:
        '  با ورود و یا ثبت نام در دیجیکالا شما شرایط و قوانین استفاده از سرویس های سایت دیجیکالا و قوانین حریم شخصی آن را می پذیرید.',
      mobile: 'شماره موبایل',
      login_button: 'ورود به دیجی کالا',
      home_tab: 'خانه',
      profile_tab: 'دیجی کالای من',
      category_tab: 'دسته بندی ها',
      cart_tab: 'سبد خرید',
      filter: 'فیلتر ها',
      product_available: 'موجود در انبار دیجی کالا',
      continue_buy_button: 'ادامه فرآیند خرید',
      total_amount: 'مجموع',
      total_price: 'قیمت کل',
      final_price: 'قیمت نهایی',
      toman: 'تومان',
      delete: 'حذف',
      setting: 'تنظیمات',
      languageChange: 'تغییر زبان برنامه',
      confirm: 'تایید',
      faq: 'پرسش های متداول',
      contactUs: 'تماس با ما',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'fa' : 'en',
    // lng: 'fa',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
