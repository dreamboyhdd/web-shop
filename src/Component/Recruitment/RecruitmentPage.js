import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Paging } from "../../Common";
import I18n from '../../Language';
import { mainAction } from "../../Redux/Actions";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { FormatDateJson } from "../../Utils";

export const RecruitmentPage = ({
}) => {
    const dispatch = useDispatch();
    // thông tin web
    const [DataPaging, setDataPaging] = useState([]);
    const [ListData, setListData] = useState([]);

    useEffect(() => {
        Shop_spWeb_Career_List();
    }, []);

    //#region List
    const Shop_spWeb_Career_List = async () => {
        try {
            const pr = {
                GroupId: GROUPID,
                CareerId:0
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "Shop_spWeb_Career_List",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            if (result?.length > 0) {
                setListData(result);
                console.log(result);
            }
        } catch (err) { }
    };
    //#endregion

    return (
        <>
            <section class="recruiment-section" id="section_11">
                <div className="bg_head">
                    <Link to="/"><span className="color-white" >{I18n.t("Header.HomePage")} </span></Link>
                    <i class="bi bi-chevron-double-right"></i>
                    <span>{I18n.t("Other.Recruitment")} </span>
                </div>
            </section >
            <section class="recruiment-section " id="section_11">
                <div class="container mt-5 mb-5">
                    <div class="row d-flex justify-content-center g-4">
                        {DataPaging.length > 0 && DataPaging.map((e, index) => {
                            const ListImageProduct = e.ImageCareer.split(",")
                            const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                            return (
                                <Link className="col-md-6 w3-animate-right" to={`chi-tiet-tuyen-dung/${e.Url}`} >
                                    <div key={index} className="news-block news-block-two-col d-flex ctn-requiment ">
                                        <div className="ctn-img-news">
                                            <img src={ImageProduct} className="news-image img-fluid " alt="" />
                                        </div>
                                        <div className="news-block-two-col-info">
                                            <div className="news-block-title mb-2">
                                                <h6>
                                                    <a href="#" className="news-block-title-link" style={{ textTransform: 'none' }} >{e.CarrerName}</a>
                                                </h6>
                                            </div>
                                            <div className="news-block-date" style={{ textTransform: 'none' }}>
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
                                                    {I18n.t("Other.ApplicationDeadline")}: {FormatDateJson(e.Deadline)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="row mt-4" >
                        <Paging
                            data={ListData}
                            Columns={8}
                            DataOut={e => setDataPaging(e)}
                        />
                    </div>
                </div >
            </section >
        </>
    );
};
