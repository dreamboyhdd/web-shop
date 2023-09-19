import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LANE } from "../../Enum";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
import { setData } from '../../Utils/Storage';
import axios from 'axios'
export const Header = () => {
  const dispatch = useDispatch();
  const [Address, setAddress] = useState('');
  const [Logo, setLogo] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Hotline, setHotline] = useState('');
  const [Email, setEmail] = useState('');
  const [LangName, setLangName] = useState(I18n.t("Header.Vietnamese"));
  const [LangIcon, setLangIcon] = useState("/assets/img/vn.png");
  const [BusinessPhilosophy, setBusinessPhilosophy] = useState('');
  const [CareerGoals, setCareerGoals] = useState('');
  const [BusinessLicense, setBusinessLicense] = useState('');
  const infor = localStorage.getItem("Web_Infor_Setting_" + GROUPID)
  useEffect(() => {
    initialLanguage();
    getData();
    const inter = setInterval(() => {
      getData();
    }, 1000 * 60);// 1phut reload 1 lần
    return () => clearInterval(inter);
  }, []);


  //#region Log truy cập online
  const getData = async () => {
    const Key_Online = localStorage.getItem("Key_Access_"+GROUPID)
    if (Key_Online === undefined || Key_Online === null || Key_Online === '') {
      const res = await axios.get('https://geolocation-db.com/json/')
      const date = new Date();
      const Key = res.data.IPv4 + '.' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.' + date.getHours() + '.' + date.getMinutes() + '.' + date.getMilliseconds();
      localStorage.setItem("Key_Access_"+GROUPID, Key);
      Shop_spLog_Access_Save(0, Key)
    }
    else {
      Shop_spLog_Access_Save(1, Key_Online)
    }
  };
  const Shop_spLog_Access_Save = async (Id, Key) => {
    const params = {
      Json: JSON.stringify({
        Id: Id,
        Key_Access: Key,
        GroupId: GROUPID
      }),
      func: "Shop_spLog_Access_Save",
    };
    await mainAction.API_spCallServer(params, dispatch);
   
  };
  //#endregion

  //#region thông tin công ty
  const Shop_spWeb_Setting_List = async () => {

    const pr2 = {
      Domain: '',
      GroupId: GROUPID

    };
    const params2 = {
      Json: JSON.stringify(pr2),
      func: "Shop_spWeb_Setting_List",
    };
    if (infor !== undefined && infor !== null && infor !== "") {
      const result2 = JSON.parse(infor);
      let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
      let CompanyName = (result2.find(e => e.KeySetting === "CompanyName")).DataSetting;
      let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
      let Email = (result2.find(e => e.KeySetting === "Email")).DataSetting;
      let Address = (result2.find(e => e.KeySetting === "Address")).DataSetting;
      let BusinessPhilosophy = (result2.find(e => e.KeySetting === "BusinessPhilosophy")).DataSetting;
      let CareerGoals = (result2.find(e => e.KeySetting === "CareerGoals")).DataSetting;
      let BusinessLicense = (result2.find(e => e.KeySetting === "BusinessLicense")).DataSetting;
     
      setLogo(Logo);
      setCompanyName(CompanyName);
      setHotline(Hotline);
      setEmail(Email);
      setAddress(Address)
      setBusinessPhilosophy(BusinessPhilosophy)
      setCareerGoals(CareerGoals)
      setBusinessLicense(BusinessLicense)
    }
    try {
      const result2 = await mainAction.API_spCallServer(params2, dispatch);
      let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
      let CompanyName = (result2.find(e => e.KeySetting === "CompanyName")).DataSetting;
      let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
      let Email = (result2.find(e => e.KeySetting === "Email")).DataSetting;
      let Address = (result2.find(e => e.KeySetting === "Address")).DataSetting;
      let BusinessPhilosophy = (result2.find(e => e.KeySetting === "BusinessPhilosophy")).DataSetting;
      let CareerGoals = (result2.find(e => e.KeySetting === "CareerGoals")).DataSetting;
      let BusinessLicense = (result2.find(e => e.KeySetting === "BusinessLicense")).DataSetting;
     
      setLogo(Logo);
      setCompanyName(CompanyName);
      setHotline(Hotline);
      setEmail(Email);
      setAddress(Address)
      setBusinessPhilosophy(BusinessPhilosophy)
      setCareerGoals(CareerGoals)
      setBusinessLicense(BusinessLicense)
      localStorage.setItem("Web_Infor_Setting_CAK_"+GROUPID, JSON.stringify(result2));
    } catch (err) {
    }
  };

  //#endregion

  //#region đa ngôn ngữ hệ thống
  const changeLanguage = async (keylang) => {

    let lang = await getData(LANE);
    let params = {
      language: keylang,
      Type: 1
    }
    const language = await mainAction.changeLanguage(params, dispatch);
    await setData(LANE, JSON.stringify(language));
    localStorage.setItem("keyLang", keylang);
    window.location.reload()
  }
  const initialLanguage = () => {
    dispatch(mainAction.checkLanguage(null))
    const keyLang = localStorage.getItem("keyLang");
    if (keyLang !== 'EN' && keyLang !== 'en') {
      setLangName("Tiếng Việt");
      setLangIcon("/assets/img/vn.png");
      localStorage.setItem("keyLang", "vn");
    } else {
      setLangName("English");
      setLangIcon("/assets/img/en.png");
      localStorage.setItem("keyLang", "en");
    }
    Shop_spWeb_Setting_List();
  }
  //#endregion
 
  return (
    <>
      <header class="site-header" id="section_30">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-12 d-flex flex-wrap">
              <p class="d-flex me-4 mb-0">
                <i class="social-icon-link bi-whatsapp me-2"></i>
                {Hotline}
              </p>
              <p class="d-flex me-4 mb-0">
                <i class="bi-envelope me-2"></i>
                <a href="mailto:info@company.com">
                  {Email}
                </a>
              </p>
              <p class="d-flex me-4 mb-0">
                <i class="bi-geo-alt me-2"></i>
                {Address}
              </p>
            </div>
            <div class="col-lg-3 col-12 ms-auto d-lg-block d-none">
              <div class="dropdown">
                <button type="button" class="btn btnlag dropdown-toggle">
                  {I18n.t("Header.Vietnamese") === 'Tiếng Việt'
                    ?
                    <>
                      <img src="/assets/images/vn.png" width="30" height="20" alt="Tiếng Việt" /> {I18n.t("Header.Vietnamese")}
                    </>
                    :
                    <>
                      <img src="/assets/images/en.png" width="30" height="20" alt="NETCO POST" />   {I18n.t("Header.English")}
                    </>
                  }
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" onClick={e => changeLanguage("vn")}> <img src="/assets/images/vn.png" width="30" height="20" alt="Tiếng Việt" />  {I18n.t("Header.Vietnamese")}</a></li>
                  <li><a class="dropdown-item" onClick={e => changeLanguage("en")}> <img src="/assets/images/en.png" width="30" height="20" alt="NETCO POST" /> {I18n.t("Header.English")}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
