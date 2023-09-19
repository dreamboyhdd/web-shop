import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';


export const FormAboutUs = ({
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
    const [BusinessPhilosophy, setBusinessPhilosophy] = useState('');
    const [CareerGoals, setCareerGoals] = useState('');
    const [BusinessLicense, setBusinessLicense] = useState('');
    const [ImageABoutUs, setImageABoutUs] = useState('');
    const [Data, setData] = useState([]);

    // thông tin khách hàng đăng nhập
    const [AboutCompany, setAboutCompany] = useState('');
    const keyLang = localStorage.getItem("keyLang");
    useEffect(() => {
        setTimeout(() =>  Shop_spWeb_Setting_List(), 1000);
    }, []);

    //#region thông tin công ty
    const Shop_spWeb_Setting_List = async () => {
        try {
            const infor = localStorage.getItem("Web_Infor_Setting_CAK_" + GROUPID)
            if (infor !== undefined && infor !== null && infor !== "") {
                const result2 = JSON.parse(infor);
            setData(result2)
            let ImageABoutUs = ((result2.find(e => e.KeySetting === "ImageABoutUs")).DataSetting).replace(',', '');
            let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
            let CompanyName = (result2.find(e => e.KeySetting === "CompanyName")).DataSetting;
            let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
            let Email = (result2.find(e => e.KeySetting === "Email")).DataSetting;
            let Address = (result2.find(e => e.KeySetting === "Address")).DataSetting;         
            let BusinessPhilosophy = (result2.find(e => e.KeySetting === "BusinessPhilosophy")).DataSetting;
            let CareerGoals = (result2.find(e => e.KeySetting === "CareerGoals")).DataSetting;
            let BusinessLicense = (result2.find(e => e.KeySetting === "BusinessLicense")).DataSetting;
          
            setImageABoutUs(LINK_IMAGE + ImageABoutUs)
            setLogo(Logo);
            setCompanyName(CompanyName);
            setHotline(Hotline);
            setEmail(Email);
            setAddress(Address)
            setBusinessPhilosophy(BusinessPhilosophy)
            setCareerGoals(CareerGoals)
            setBusinessLicense(BusinessLicense)
            } 
        } catch (err) {
        }
    };
    //#endregion

    return (
        <>
            <section class=" section-bg " id="section_2">
                {
                    KeyTitle === 1 ?
                        <div className="bg_head">
                            <a href="/"><span className="color-white" >{I18n.t("Header.HomePage")} </span></a>
                            <i class="bi bi-chevron-double-right"></i>
                            <span>{I18n.t("Header.CompanyIntroduction")} </span>
                        </div>
                        :
                        <></>
                }

                <div class="container">
                    <div class="row pd-b-30">
                        {
                            Data.length > 0

                            &&
                            <>
                                <div class="col-lg-6 col-12 mb-5 mb-lg-0 w3-animate-bottom mb-50 mt-50">
                                    <img src={ImageABoutUs}
                                        class="custom-text-box-image img-fluid" alt="" />
                                </div>
                                <div class="col-lg-6 col-12 w3-animate-bottom mt-50">
                                    <div class="custom-text-box">
                                        <h2 class="mb-2">{I18n.t("Header.CompanyOverview")}</h2>
                                        <h5 class="mb-3">{Data.find(e => e.KeySetting === "CompanyName").DataSetting}</h5>
                                        <p class="mb-0">{AboutCompany}
                                        </p>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-12 w3-animate-left mb-50 ">
                                            <div class="custom-text-box mb-lg-0 min-height-400">
                                                <h5 class="mb-3">{I18n.t("Header.Businessphilosophy")} </h5>

                                                <p>	{CareerGoals}
                                                </p>

                                                <ul class="custom-list mt-2">

                                                    <li class="custom-list-item d-flex">
                                                        <i class="bi-check custom-text-box-icon me-2"></i>
                                                        {BusinessPhilosophy}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-12 w3-animate-right">
                                            <div class="custom-text-box d-flex flex-wrap d-lg-block mb-lg-0 min-height-400">
                                                <h5 class="mb-3">{I18n.t("Header.Businessphilosophy")} </h5>
                                                <div class="counter-thumb">
                                                    <div class="d-flex">
                                                        <span class="counter-number" data-from="1" data-to="2009"
                                                            data-speed="1000"></span>
                                                        <span class="counter-number-text"></span>
                                                    </div>

                                                    <span class="counter-text">{I18n.t("Header.Historybegin")}</span>
                                                </div>

                                                <div class="counter-thumb mt-4">
                                                    <div class="d-flex">
                                                        <span class="counter-number" data-from="1" data-to="120"
                                                            data-speed="1000"></span>
                                                        <img src={Logo} class="img-fluid m-w-200" href='/' alt="" />

                                                    </div>

                                                    <span class="counter-text mt-20"> {BusinessLicense}</span>
                                                    <span class="counter-text mt-20">Hoạt động : 2 năm </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }


                    </div>
                </div>
            </section>
        </>
    );
};
