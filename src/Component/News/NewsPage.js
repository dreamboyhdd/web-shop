import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Paging } from "../../Common";
import I18n from '../../Language';
import { mainAction } from "../../Redux/Actions";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { FormatDateJson } from "../../Utils";

export const NewsPage = ({
    KeyIsHome = 0,
    KeyTitle = 0
}) => {
    const dispatch = useDispatch();
    // thông tin web
    const [DataPaging, setDataPaging] = useState([]);
    const [ListData, setListData] = useState([]);
    useEffect(() => {
        Shop_spWeb_News_List();
    }, []);

    //#region List
    const Shop_spWeb_News_List = async () => {
        try {
            const infor = localStorage.getItem("Web_Infor_News_CAK_" + GROUPID)
            if (infor !== undefined && infor !== null && infor !== "") {
                const result2 = JSON.parse(infor);
                setListData(result2);
            }
            const pr = {
                Domain: '',
                GroupId: GROUPID

            };
            const params = {
                Json: JSON.stringify(pr),
                func: "Shop_spWeb_News_List",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            if (result?.length > 0) {
                setListData(result);
                localStorage.setItem("Web_Infor_News_CAK_" + GROUPID, JSON.stringify(result));
            }
        } catch (err) { }
    };
    //#endregion

    return (
        <>
            <section class="product-section w3-animate-left" id="section_14">
                {KeyIsHome === 0 &&
                    <div className="bg_head">
                        <Link to="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></Link>
                        <i class="bi bi-chevron-double-right"></i>
                        <span>{I18n.t("News.News")} </span>
                    </div>}
            </section>
            <section className="news-padding News" id="section_14" >
                <div className="container  mt-5 mb-5">
                    <div class="row d-flex justify-content-center">
                        {
                            KeyIsHome === 1 ?
                                <div className="col-md-4 h-100per">
                                    <section class="testimonial-section section-padding ">
                                        <div class="container min-h-460">
                                            <div class="row">
                                                <div class="col-lg-8 col-12 mx-auto pt-50">
                                                    <h2 class="mb-lg-3 mt-50 mt-20">TIN TỨC</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                :
                                <></>
                        }
                        <div className={KeyIsHome === 1 ? 'col-md-8' : "col-md-10"}>
                            {DataPaging.length > 0 && DataPaging.map((e, index) => {
                                const ListImageProduct = e.ImageNews.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                const isLastElement = index === DataPaging.length - 1;
                                return (
                                    <>
                                        <div class="news-block row mt-4 w3-animate-bottom">
                                            <div className=" col-md-4">
                                                <div className="ctn-img-new">
                                                    <Link key={e.NewsId} to={`chi-tiet-tin-tuc/${e.Url}`} >
                                                        <img src={ImageProduct} class="news-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="col-md-8 mt-20sx">
                                                <div class="news-block-title mb-2">
                                                    <Link key={e.NewsId} to={`chi-tiet-tin-tuc/${e.Url}`} >
                                                        <h6 class="news-block-title-link" style={{ textTransform: 'none' }}>
                                                            {e.NewsTitle}
                                                        </h6>
                                                    </Link>
                                                </div>
                                                <div class="news-block-date">
                                                    <p>
                                                        <i class="bi-calendar4 custom-icon me-1"></i>
                                                        {FormatDateJson(e.CreateOn)}
                                                    </p>
                                                </div>
                                                <p>{e.NewsDescription}</p>
                                            </div>
                                        </div>
                                        {!isLastElement && <hr className="mt-3" style={{ color: '#a5a5a5' }} />}

                                    </>
                                )
                            })}
                        </div>

                    </div>

                    <div className={KeyIsHome === 0 ? "row mt-4 mb-20" : 'row mt-4 display-none'}>
                        <Paging
                            data={ListData}
                            Columns={KeyIsHome === 0 ? 10 : 3}
                            DataOut={e => setDataPaging(e)}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
