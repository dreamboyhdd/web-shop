import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GROUPID } from "../../Services/Api";
import I18n from '../../Language';
export const FormService = ({
    KeyTitle = 0,
    KeyIsHot = 0
}) => {
    const dispatch = useDispatch();
    const [DataService, setDataService] = useState([]);
    useEffect(() => {
        setTimeout(() => Shop_spWeb_Services_List(), 1000); 
    }, []);

    //#region 
    const Shop_spWeb_Services_List = async () => {
            const infor = localStorage.getItem("Web_Infor_Service_CAK_"+GROUPID)
            if (infor !== undefined && infor !== null && infor !== "") {
                const list = JSON.parse(infor)
            setDataService(KeyIsHot === 1?list?.filter(e => e.IsHot === true):list)
            }
    }
    //#endregion

    return (
        <>

            <section class="contact-section w3-animate-left" id="section_6">
                {
                    KeyTitle === 1 ?
                        <div className="bg_head">
                            <a href="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></a>
                            <i class="bi bi-chevron-double-right"></i>
                            <span>{I18n.t("Service.Service")}</span>
                        </div>
                        :
                        <></>
                }
             {/*    <div class="cta-section pd-30 section-bg">
                    <div class="container">
                        <div class="row justify-content-center align-items-center mt-20">
                            <div class="col-lg-5 col-12 ms-auto">
                                <h2 class="mb-0">{I18n.t("Service.ServicesWeProvide")}</h2>
                            </div>
                            <div class="col-lg-5 col-12">
                                {
                                    KeyIsHot === 1 ? <a href="/dich-vu" class="custom-btn btn smoothscroll ml-20">Xem tất cả</a> : <></>
                                }

                            </div>
                        </div>
                    </div>
                </div> */}
              
                <section className="section-bg m-h-580">
                    <div class="container mb-50">
                        <div class="row">
                            <div class="col-lg-12 col-12 text-center mb-4 mt-20">
                                <h2>{I18n.t("Service.Service")}</h2>
                            </div>
                            {DataService.length > 0 &&
                                DataService.map((itm, Key) => {
                                    return (
                                        (
                                            <>
                                                <div class={KeyIsHot === 0 ? "col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 min-h-550 mt-50 mb-50" : "col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 min-h-550 mt-50 mb-50"}>
                                                    <Link key={itm.ServiceId} to={`chi-tiet-dich-vu/${itm.Url}`} className="ctn-image">
                                                        <div class="custom-block-wrap text-center pointer card-hover w3-animate-bottom">
                                                            <img src={itm.ImageService} class="custom-block-image_2 img-fluid" alt="" />
                                                            <div class="custom-block">
                                                                <div class={KeyIsHot === 0 ? "custom-block-body min-h-300" : "custom-block-body min-h-150"}>
                                                                    <h5 class="mb-3" style={{ fontSize: '18px' }}>{itm.ServiceName}</h5>
                                                                    {KeyIsHot === 0 ? <p>
                                                                        <span className="spanService"
                                                                        > {itm.ServiceNote}</span>
                                                                    </p> : <></>}

                                                                </div>
                                                                <a class="custom-btn btn">Tìm hiểu</a>
                                                            </div>
                                                        </div>
                                                    </Link >

                                                </div>
                                            </>


                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};
