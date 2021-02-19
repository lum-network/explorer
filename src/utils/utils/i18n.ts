import I18n from 'i18n-js';
import moment from 'moment';
import { en, fr } from 'locales';
import 'locales/moment/fr';

//const userLang = navigator.language;

const userLang = 'en';

I18n.locale = userLang;
moment.locale(userLang);
moment.relativeTimeThreshold('ss', 3);

I18n.fallbacks = true;
I18n.translations = {
    en,
    fr,
};

export default I18n;
