import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
import { GROUPID} from "../../Services/Api";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { DecodeString} from "../../Utils";
import ReactHtml from 'raw-html-react';
export const ServiceDetailPage = () => {

    const dispatch = useDispatch();
    const [ListData, setListData] = useState([]);
    const [ServiceById, setServiceById] = useState([]);
    const { ServiceId } = useParams();
    const [Hotline, setHotline] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const history = useHistory();

    useEffect(() => {
        Shop_spWeb_Services_List();
    }, [ServiceId]);

    //#region List
    const Shop_spWeb_Services_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Services_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            setListData(result2.filter(e => e.Url !== ServiceId))
            setServiceById(result2.filter(e => e.Url === ServiceId))
        }
        try {
            const pr = {
                Json: JSON.stringify({
                    Domain: '',
                    GroupId: GROUPID
                }),
                func: "Shop_spWeb_Services_List",
                API_key: "netcoApikey2025"
            }
            const list = await mainAction.API_spCallServer(pr, dispatch);
            if (list?.length > 0) {
                setListData(list);
            }
            setListData(list.filter(e => e.Url !== ServiceId))
            setServiceById(list.filter(e => e.Url === ServiceId))
            setHotline(localStorage.getItem("Infor_Hotline") !== "" ? DecodeString(localStorage.getItem("Infor_Hotline")) : '')
            setEmail(localStorage.getItem("Infor_Email") !== "" ? DecodeString(localStorage.getItem("Infor_Email")) : '')
            setAddress(localStorage.getItem("Infor_Address") !== "" ? DecodeString(localStorage.getItem("Infor_Address")) : '')
        } catch (err) { }


    };
    //#endregion

    return (
        <>
            <section class="news-section">
                <section class="contact-section w3-animate-left" id="section_6">
                    <div className="bg_head">
                        <a href="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></a>
                        <i class="bi bi-chevron-double-right"></i>
                        <span>{I18n.t("Service.Service")}</span>
                    </div>
                </section>
                <div class="container mb-50">
                    <div class="row w3-animate-left">
                        <div class="col-lg-7 col-12">
                            {
                                ServiceById.length>0
                                &&
                                <div class="news-block mt-50">
                                <div class="news-block-top ">
                                    <a >
                                        <img src={ServiceById.length > 0 ? ServiceById[0].ImageService : ''} class="news-image img-fluid w3-animate-left" alt="" />
                                    </a>


                                </div>

                                <div class="news-block-info">
                                    <div class="d-flex mt-2">
                                        <div class="news-block-date">
                                            <p>
                                                <i class="bi-whatsapp custom-icon me-1"></i>
                                                {Hotline}
                                            </p>
                                        </div>
                                        <div class="news-block-author mx-5">
                                            <p>
                                                <i class="bi-envelope custom-icon me-1"></i>
                                                {Email}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="news-block-title mb-2">
                                        <h4>
                                            <a class="news-block-title-link">
                                                {ServiceById.length > 0 ? ServiceById[0].ServiceName : ''}  </a></h4>

                                    </div>
                                    <div class="news-block-body">
                                        <p>   {ServiceById.length > 0 ?
                                            <ReactHtml html={ServiceById[0].ServiceDesciption} componentMap={{ ServiceDetailPage }} />

                                            : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            }
                          
                        </div>
                        <div class="col-lg-4 col-12 mx-auto">
                            <h5 class="mt-5 mb-3">{I18n.t("Service.OtherServices")}</h5>
                            {ListData.length > 0
                                &&
                                ListData.map(item => {
                                    return (
                                        <div class="news-block bor-10 cursor fixrowxs row  mt-4 bor-b-grey card-hover fixservice w3-animate-left"
                                            key={item.ServiceId}
                                            onClick={() => {
                                                history.push(`/chi-tiet-dich-vu/${item.Url}`);
                                                window.scrollTo({
                                                    top: -90,
                                                    behavior: "smooth"
                                                });
                                            }}
                                        >
                                            <div class="col-md-4 col-4">
                                                <img src={item.ImageService} class="news-image img-70" alt="" />
                                            </div>
                                            <div class="col-md-8 col-8 bor-l">
                                                <div class="news-block-title">
                                                    <h6
                                                        class="news-block-title-link fz-14 upper cl-grey mar-t-20px">{item.ServiceName}
                                                    </h6>
                                                    <span className="spanServicedt"
                                                    > {item.ServiceNote}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </section></>


    );
};
