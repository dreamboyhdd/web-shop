import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
export const Footer = () => {
    const dispatch = useDispatch();
    const [Address, setAddress] = useState('');
    const [Logo, setLogo] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [Hotline, setHotline] = useState('');
    const [Email, setEmail] = useState('');
    const [ListMenu, setListMenu] = useState('');
    const [Map, setMap] = useState('');
    const [Links, setLinks] = useState('');
    const [Title, setTitle] = useState('');
    const [MapName, setMapName] = useState('');
    const [KeyShowAccess, setKeyShowAccess] = useState('K');
    const [TotalAcces, setTotalAcces] = useState(1);
    const [TotalAccesOnline, setTotalAccesOnline] = useState(1);
    useEffect(() => {
        setTimeout(() => Shop_spWeb_Setting_List(), 1000);
        Counter_online();
        const inter = setInterval(() => {
            Counter_online();
        }, 1000 * 60 * 2);// 2 phút 1 lần
        return () => clearInterval(inter);
    }, []);

    //#region danh sách thông tin
    const Shop_spWeb_Setting_List = async () => {
        try {
            const infor = localStorage.getItem("Web_Infor_Setting_CAK_" + GROUPID)
            if (infor !== undefined && infor !== null && infor !== "") {
                const result2 = JSON.parse(infor);
                let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
                let CompanyName = (result2.find(e => e.KeySetting === "CompanyName")).DataSetting;
                let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
                let Email = (result2.find(e => e.KeySetting === "Email")).DataSetting;
                let Address = (result2.find(e => e.KeySetting === "Address")).DataSetting;
                let Map = (result2.find(e => e.KeySetting === "Map")).DataSetting;
                const keyLang = localStorage.getItem("keyLang");
                setLinks(keyLang === 'en' ? "Links" : 'Liên kết')
                setTitle(keyLang === 'en' ? 'Contacts With Us' : 'Liên hệ với chúng tôi')
                setMapName(keyLang === 'en' ? 'Map' : 'Bản đồ')
                setLogo(Logo);
                setCompanyName(CompanyName);
                setHotline(Hotline);
                setEmail(Email);
                setAddress(Address)
                setMap(Map)
                let ListMenu = JSON.parse(localStorage.getItem("Web_Infor_ListMenu_CAK_" + GROUPID))
                setListMenu(ListMenu?.map(item => {
                    return (
                        <li class="footer-menu-item"><a href={item.MenuUrl} class="footer-menu-link">{item.MenuName}</a></li>
                    )
                }))
                let KeyShowAccess = result2.find(e => e.KeySetting === "KeyShowAccess").DataSetting;
                setKeyShowAccess(KeyShowAccess);
            }
        } catch (err) {
        }
    };
    //#endregion

    //#region đếm lương truy cập
    const Counter_online = async () => {
        const pr = {
            GroupId: GROUPID
        };
        const params = {
            Json: JSON.stringify(pr),
            func: "Shop_spLog_Access_counters",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        setTotalAcces(result.TotalAccess)
        setTotalAccesOnline(result.TotalOnline)
        Shop_spWeb_Setting_List();
    };
    //#endregion


    return (
        <footer class="site-footer" id="section_31" style={{ backgroundImage: 'url(/assets/images/bg-contact-home.png)' }}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-12 mb-4">
                        <img src={Logo} class="img-fluid m-w-200" href='/' alt="" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 mb-4">
                        <h5 class="site-footer-title mb-3">{Links}</h5>
                        <ul class="footer-menu">
                            {ListMenu!='' ?ListMenu : ""}
                        </ul>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 mx-auto">
                        <h5 class="site-footer-title mb-3">{Title}</h5>
                        <p class="text-white d-flex mb-2">
                            <i class="bi-telephone me-2"></i>
                            <a href="tel: 305-240-9671" class="site-footer-link">
                                {Hotline}
                            </a>
                        </p>
                        <p class="text-white d-flex">
                            <i class="bi-envelope me-2"></i>
                            <a href="mailto:info@yourgmail.com" class="site-footer-link">
                                {Email}
                            </a>
                        </p>
                        <p class="text-white d-flex mt-3">
                            <i class="bi-geo-alt me-2"></i>
                            {Address}
                        </p>
                        <a href="/contact" class="custom-btn btn mt-3">{I18n.t('Contacts.Contact')}</a>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12 mx-auto">
                        <h5 class="site-footer-title mb-3">{MapName}</h5>
                        <iframe src={Map}
                            width="100%"
                            height="300"
                            style={{ border: 0, borderRadius: "5px" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
            <div class="site-footer-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-7 col-12">
                            <p class="copyright-text mb-0">Copyright © 2023 <a href="#" className="mr-5">{CompanyName}</a> Design : <a href="https://templatemo.com" target="_blank"></a> {CompanyName}
                            </p>
                        </div>
                        {
                            KeyShowAccess === 'C'
                                ?
                                <div class="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                                    <ul class="social-icon">
                                        <li class="social-icon-item ttaccess" >
                                            <span><span className="icononline_access"></span> Tổng truy cập : <span className="blder fz-18">{TotalAcces}</span> </span>
                                        </li>
                                        <li class="social-icon-item color-white pd-5">
                                            <span className="counter-container"><span className="icononline"></span>Đang Online :  <span class="counter">{TotalAccesOnline}</span></span>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div class="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                                    <ul class="social-icon">
                                        <li class="social-icon-item">
                                            <a class="social-icon-link bi-twitter"></a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a class="social-icon-link bi-facebook"></a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a class="social-icon-link bi-instagram"></a>
                                        </li>


                                    </ul>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </footer>
    );
};
