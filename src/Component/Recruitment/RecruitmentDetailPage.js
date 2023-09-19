import ReactHtml from 'raw-html-react';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import I18n from '../../Language';
import { mainAction } from '../../Redux/Actions';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { GROUPID, LINK_IMAGE } from '../../Services';
import { DecodeString, FormatDateJson } from '../../Utils';

export const RecruitmentDetailPage = ({
}) => {
    const [ListData, setListData] = useState([]);
    const { CareerId } = useParams();

    useEffect(() => {
        Shop_spWeb_Career_List();
    }, []);
    const history = useHistory();
    const dispatch = useDispatch();
    const keyLang = localStorage.getItem("keyLang");

    useEffect(() => {
        Shop_spWeb_Career_List();
    }, [keyLang]);

    //#region List
    const Shop_spWeb_Career_List = async () => {
        try {
            const pr = {
                Domain: '',
                    GroupId: GROUPID
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "Shop_spWeb_Career_List",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            if (result?.length > 0) {
                setListData(result);
            }
        } catch (err) { }
    };
    //#endregion

    return (
        <>
            <section className="recruiment-section" id="section_10">
                <div className="bg_head">
                    <Link to="/"><span className="color-white" >{I18n.t("Header.HomePage")} </span></Link>
                    <i className="bi bi-chevron-double-right"></i>
                    <Link className="color-white" to="/tuyen-dung">{I18n.t("Other.Recruitment")} </Link>
                    {ListData.length > 0 && ListData.map((e, index) => {
                        if (e.Url === CareerId)
                            return (<>
                                <i className="bi bi-chevron-double-right"></i>
                                <span>{e.CarrerName}</span>
                            </>
                            )
                    })}
                </div>
            </section>
            <section class="recruiment-section section-padding" id="section_10">
                {ListData.length > 0 && ListData.map((e, index) => {
                    const ListImageProduct = e.ImageCareer.split(",")
                    const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                    if (e.Url === CareerId)
                        return (
                            <div className="container">

                                <div class="row  align-items-center justify-content-center ">
                                {/*     <div className="col-lg-8 col-md-8 justify-content-between row align-items-center card-detail-product" style={{ padding: '40px' }}>
                                        <div className="ctn-img-news fs-2" style={{ marginRight: '30px' }}>
                                            <img src={ImageProduct} className="news-image img-fluid " alt="" />
                                        </div>
                                    </div> */}
                                    <div className='col-lg-8 col-md-8 w3-animate-left'>
                                    <div>
                                        <h5>{e.CarrerName}</h5>
                                        <p className="m-0 pt-2">
                                            <i class="fa-solid fa-dollar-sign mr-1" style={{ width: '25px' }}></i>
                                            {I18n.t("Other.Salary")}: {e.Salary}
                                        </p>
                                        <p className="m-0 pt-2">
                                            <i class="fa-solid fa-map-location mr-1" style={{ width: '25px' }}></i>
                                            {e.Location}
                                        </p>
                                        <p className="m-0 pt-2">
                                            <i class="fa-solid fa-calendar-days mr-1" style={{ width: '25px' }}></i>
                                            {I18n.t("Other.PostedDate")}: {FormatDateJson(e.CreateOn)}
                                        </p>
                                        <p className="m-0 pt-2">
                                            <i class="fa-solid fa-calendar-days mr-1" style={{ width: '25px' }}></i>
                                            {I18n.t("Other.ApplicationDeadline")}: {FormatDateJson(e.Deadline)}
                                        </p>
                                    </div>
                                </div>
                                </div>
                               
                                <div class="row  align-items-center justify-content-center w3-animate-right">
                                    <div className="col-lg-8 col-md-8 justify-content-between row align-items-center card-detail-product" style={{ padding: '40px' }}>
                                        <div className='col-md-4'>
                                            <p className="m-0 mb-4 text-req">
                                                <i class="fa-regular fa-users-rays mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.Qualifications")}: {e.Qualifications}
                                            </p>
                                            <p className="m-0 mt-4 text-req">
                                                <i class="fa-duotone fa-calendar-week mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.ProbationPeriod")}: {e.ProbationPeriod}
                                            </p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="m-0 mb-4 text-req">
                                                <i class="fa-light fa-users-medical mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.NumberOfRecruitment")}: {e.NumberOfRecruitment}
                                            </p>
                                            <p className="m-0 mt-4 text-req">
                                                <i class="fa-duotone fa-briefcase mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.WorkingModel")}: {e.WorkingModel}
                                            </p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="m-0 mb-4 text-req">
                                                <i class="fa-duotone fa-file-certificate mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.Qualifications")}: {e.Qualifications}
                                            </p>
                                            <p className="m-0 mt-4 text-req">
                                                <i class="fa-duotone fa-ranking-star mr-1" style={{ width: '25px' }}></i>
                                                {I18n.t("Other.Rank")}: {e.Rank}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row d-flex align-items-center justify-content-center ">
                                    <button type="button" class="custom-btn btn smoothscroll btn btn-send" style={{ width: '100%' }}>
                                        <i class="fa-duotone fa-paper-plane " style={{ marginRight: '5px' }}></i>
                                        {I18n.t("Other.Apply")}
                                    </button>
                                </div>
                                <div class="row d-flex justify-content-center">
                                    <div className="col-lg-8 col-md-8 w3-animate-bottom">
                                        <div className="news-block">
                                            <div className="news-block-info">
                                                <hr />
                                                <div className='text-center'>
                                                    <h2 className='fs-0 '>{I18n.t("Other.JobDescription")}</h2>
                                                </div>
                                                <div className="news-block-body">
                                                    <ReactHtml html={e.CarrerContent} componentMap={{ RecruitmentDetailPage }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                })}
            </section>

        </>
    );
};
