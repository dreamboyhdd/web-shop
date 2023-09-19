import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import { mainAction } from "../../Redux/Actions";
import { GROUPID } from "../../Services/Api";
import { CustomerTalkAboutUs, FormAboutUs } from "../AboutUs";
import { FormContact } from "../Contacts";
import { NewsPage } from "../News";
import { TopProduct } from "../Products";
import { FormService } from "../Services";
import { Banner } from "../Template/Banner";
import { Sub_Footer } from "../Template/Sub_Footer";

export const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [DataMenu, setDataMenu] = useState([]);
    const keyLang = localStorage.getItem("keyLang");
    useEffect(() => {
        setTimeout(() => Shop_spWeb_Menu_List(), 1000);
    }, []);
    //#region danh sch menu động
    const Shop_spWeb_Menu_List = async () => {
        const infor = localStorage.getItem("Web_Infor_ListMenu_CAK_"+GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            setDataMenu(result2)
        }
    };

    //#endregion

    return (
        <MainLayout>
            <main>
                <Banner></Banner>
                {
                    DataMenu.length > 0 &&
                        DataMenu.filter(e => e.MenuUrl === "/dich-vu").length > 0 ?
                        <FormService
                            KeyIsHot={1}
                            KeyTitle={0}
                        /> : <></>
                }
                {
                    DataMenu.length > 0 &&
                        DataMenu.filter(e => e.MenuUrl === "/san-pham").length > 0 ?
                        <TopProduct /> : <></>

                }
                {
                    DataMenu.length > 0 &&
                        DataMenu.filter(e => e.MenuUrl === "/tin-tuc").length > 0 ?
                        <NewsPage
                            KeyIsHome={1}
                        /> : <></>

                }
                {
                    DataMenu.length > 0 &&
                        DataMenu.filter(e => e.MenuUrl === "/gioi-thieu-cong-ty").length > 0 ?
                        <FormAboutUs
                            KeyTitle={0}
                            KeyMap={0}
                        /> : <></>

                }
                  {GROUPID === 1 ? <CustomerTalkAboutUs /> : <></>}
                {
                    DataMenu.length > 0 &&
                        DataMenu.filter(e => e.MenuUrl === "/lien-he").length > 0 ?
                        <FormContact
                            KeyTitle={0}
                            KeyMap={0}
                        /> : <></>

                }
                {GROUPID === 1 ? <Sub_Footer /> : <></>}
            </main>
        </MainLayout>
    )
}
