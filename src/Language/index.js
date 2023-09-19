import I18n from 'i18n-js';
import en from './en.json';
import vn from './vn.json';
import { currentLang } from "../Constants";
let keyLang = localStorage.getItem("keyLang")
if(keyLang === "EN"){
    I18n.defaultLocale = 'vn';
    I18n.locale = 'en';
    I18n.fallbacks = true;
}else{
    I18n.defaultLocale = 'en';
    I18n.locale = 'vn';
    I18n.fallbacks = true;
}
I18n.translations = { en, vn };
export default I18n;
