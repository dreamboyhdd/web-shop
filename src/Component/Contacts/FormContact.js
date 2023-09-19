import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {  GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
import { DecodeString, Alertsuccess, Alertwarning } from "../../Utils";

export const FormContact = ({
    KeyMap = 0,
    KeyTitle = 0
}) => {
    const dispatch = useDispatch();
    // thông tin web
    const [Address, setAddress] = useState('');
    const [Logo, setLogo] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [Hotline, setHotline] = useState('');
    const [Email, setEmail] = useState('');

    // thông tin khách hàng đăng nhập
    const [Names, setNames] = useState('');
    const [Phones, setPhones] = useState('');
    const [Emails, setEmails] = useState('');
    const [Contents, setContents] = useState('');
    const [Map, setMap] = useState('');
    const location = useLocation();
    const Check = useState(localStorage.getItem("KeyLG"));
    const keyLang = localStorage.getItem("keyLang");
    useEffect(() => {
        setTimeout(() => Shop_spWeb_Setting_List(), 1000);
        Customer_List();
    }, []);
 

    //#region load thông tin khách hàng đăng nhập
    const Customer_List = async () => {
        if (DecodeString(localStorage.getItem("Customer_Id")) !== null) {
            setNames(DecodeString(localStorage.getItem("Customer_Name")))
            setPhones(DecodeString(localStorage.getItem("Customer_Phone")))
            setEmails(DecodeString(localStorage.getItem("Customer_Email")))
        }
    };
    //#endregion

    //#region tạo liên hệ
    const Shop_spContact_Save = async () => {
        if (Names.trim() === '') {
            Alertwarning('Vui lòng nhập tên!');
            return;
        }
        if (Phones.trim() === '') {
            Alertwarning('Vui lòng nhập số điện thoại!');
            return;
        }
        try {
            const pr = {
                Json: JSON.stringify({
                    Names: Names,
                    Phone: Phones,
                    Email: Emails,
                    Content: Contents,
                    GroupId: GROUPID,
                }),
                func: "Shop_spContact_Save",
                API_key: "netcoApikey2025"
            }
            const list = await mainAction.API_spCallServer(pr, dispatch);
            Alertsuccess(list?.Result);
            setContents('')
        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region load thông tin web
    const Shop_spWeb_Setting_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Setting_CAK_"+GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
            let CompanyName = (result2.find(e => e.KeySetting === "CompanyName")).DataSetting;
            let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
            let Email = (result2.find(e => e.KeySetting === "Email")).DataSetting;
            let Address = (result2.find(e => e.KeySetting === "Address")).DataSetting;
            setLogo(Logo);
            setCompanyName(CompanyName);
            setHotline(Hotline);
            setEmail(Email);
            setAddress(Address)
            setMap((result2.find(e => e.KeySetting === "Map")).DataSetting)
        }
       
    };
    //#endregion


    return (
        <>
            <section class="contact-section" id="section_6">
                {
                    KeyTitle === 1 ?
                        <div className="bg_head">
                            <a href="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></a>
                            <i class="bi bi-chevron-double-right"></i>
                            <span>{I18n.t("TopMenu.ContactUs")}</span>
                        </div>
                        :
                        <></>
                }

                <div class="container-fluid mt-20">
                    <div class="row">
                        <div class="col-lg-4 col-12 ms-auto mb-5 mb-lg-0 w3-animate-left">
                            <div class="contact-info-wrap">
                                <h2>{I18n.t("Contacts.Contact")}</h2>
                                <div class="contact-image-wrap d-flex flex-wrap">
                                    <img src={Logo}
                                        class="img-fluid avatar-image" alt="" />
                                    <div class="d-flex flex-column justify-content-center ms-3">
                                        <p class="mb-0">{CompanyName}</p>
                                        {/*  <p class="mb-0"><strong>HR & Office Manager</strong></p> */}
                                    </div>
                                </div>
                                <div class="contact-info">
                                    <h5 class="mb-3">{I18n.t("ContactPage.ContactInfo")}</h5>
                                    <p class="d-flex mb-2">
                                        <i class="bi-geo-alt me-2"></i>
                                        {Address}
                                    </p>
                                    <p class="d-flex mb-2">
                                        <i class="bi-telephone me-2"></i>
                                        {Hotline}
                                    </p>
                                    <p class="d-flex">
                                        <i class="bi-envelope me-2"></i>
                                        {Email}
                                    </p>
                                    <a href="#" class="custom-btn btn mt-3">{I18n.t("Contacts.Contact")}</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-5 col-12 mx-auto w3-animate-right">
                            <div class="custom-form contact-form" action="#" method="post" role="form">
                                <h2>{I18n.t("ContactPage.ContactForm")}</h2>
                                <p class="mb-4">Hoặc, bạn chỉ có thể gửi email:
                                    <a href="#">{Emails}</a>
                                </p>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text"
                                            name="first-name"
                                            id="first-name"
                                            class="form-control"
                                            placeholder="Họ và tên" required
                                            value={Names}
                                            onChange={(e) => setNames(e.target.value)}
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text" name="last-name"
                                            id="last-name" class="form-control"
                                            placeholder="Số điện thoại" required
                                            value={Phones}
                                            onChange={(e) => setPhones(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <input type="email"
                                    name="email"
                                    id="email" pattern="[^ @]*@[^ @]*" class="form-control"
                                    placeholder="Email@gmail.com" required
                                    value={Emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                />
                                <textarea
                                    name="message"
                                    rows="5"
                                    class="form-control"
                                    id="message"
                                    value={Contents}
                                    onChange={(e) => setContents(e.target.value)}
                                    placeholder="
                                    Chúng tôi có thể giúp gì cho bạn?"></textarea>

                                <a onClick={e => Shop_spContact_Save()} class="custom-btn btn mt-3 width-100"> {I18n.t("ContactPage.ButtonSend")}</a>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="container-fluid hiddenxs">
                    <div class="row">
                        <div class="contact-info-wrap w3-animate-bottom">
                            {
                                KeyMap === 1
                                    ?
                                    <iframe src={Map}
                                        width="100%"
                                        height="500"
                                        style={{ border: 0, borderRadius: "5px" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                    :
                                    ''
                            }
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};
