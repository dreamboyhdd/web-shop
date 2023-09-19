import ReactHtml from 'raw-html-react';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import I18n from '../../Language';
import { mainAction } from '../../Redux/Actions';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { GROUPID, LINK_IMAGE } from '../../Services';
import { FormatDateJson } from '../../Utils';
export const NewsDetailPage = ({
}) => {
    const dispatch = useDispatch();
    const [ListData, setListData] = useState([]);
    const { NewsId } = useParams();
    const history = useHistory();
    useEffect(() => {
        Shop_spWeb_News_List();
    }, []);
    
    //#region List
    const Shop_spWeb_News_List = async () => {
        const infor = localStorage.getItem("Web_Infor_News_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            setListData(result2);
        }
        try {
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
                console.log(result);
            }
        } catch (err) { }
    };
    //#endregion
  
    return (
        <>
            <section className="contact-section" id="section_15">
                <div className="bg_head">
                    <Link to="/"> <span className="color-white" >{I18n.t("Header.HomePage")} </span></Link>
                    <i className="bi bi-chevron-double-right"></i>
                    <Link className="color-white" to="/tin-tuc">{I18n.t("News.News")} </Link>
                    {ListData.length > 0 && ListData.map((e, index) => {
                        if (e.Url === NewsId)
                            return (<>
                                <i className="bi bi-chevron-double-right"></i>
                                <span>{e.NewsTitle}</span>
                            </>
                            )
                    })}
                </div>
            </section>
            <section className="contact-section" id="section_15">
                <div className="container mt-20 mb-20">
                    <div className="row">
                        <div className="col-lg-7 col-12 w3-animate-bottom">
                            {ListData.length > 0 && ListData.map((e, index) => {
                                if (e.Url === NewsId)
                                    return (
                                        <div className="news-block">
                                            <div className="news-block-title mb-2">
                                                <h5 className='fs-2'>{e.NewsTitle}</ h5>
                                            </div>
                                            <div className="news-block-info">
                                                <div className="d-flex mt-2">
                                                    <div className="news-block-date">
                                                        <p>
                                                            <i className="bi-calendar4 custom-icon me-1" />
                                                            {FormatDateJson(e.CreateOn)}
                                                        </p>
                                                    </div>
                                                    <div className="news-block-author mx-5">
                                                        <p>
                                                            <i className="bi-person custom-icon me-1" />
                                                            CAK Solution
                                                        </p>
                                                    </div>
                                                    <div className="news-block-comment">
                                                        <p>
                                                            <i className="bi-chat-left custom-icon me-1" />
                                                            48 {I18n.t("Other.Comments")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="news-block-body">
                                                    <ReactHtml html={e.NewsContent} componentMap={{ NewsDetailPage }} />
                                                </div>
                                               
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                        <div className="col-lg-4 col-12 mx-auto mt-4 mt-lg-0 w3-animate-left">
                            <h5 className="mb-3 fs-2">{I18n.t("Other.NewPost")}</h5>
                            {ListData.length > 0 && ListData.map((e, index) => {
                                const ListImageProduct = e.ImageNews.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                if (e.Url !== NewsId && index < 8)
                                    return (
                                        <>
                                            <div key={index} className="news-block news-block-two-col d-flex">
                                                <div className="ctn-img-news">
                                                    <div
                                                        key={e.NewsId}
                                                        onClick={() => {
                                                            history.push(`/chi-tiet-tin-tuc/${e.NewsId}`);
                                                            window.scrollTo({
                                                                top: 80,
                                                                behavior: "smooth"
                                                            });
                                                        }}
                                                    >
                                                        <img src={ImageProduct} className="news-image img-fluid" alt="" />
                                                    </div>
                                                </div>
                                                <div className="news-block-two-col-info">
                                                    <div className="news-block-title mb-2">
                                                        <h6>
                                                            <a href="#" className="news-block-title-link" style={{ textTransform: 'none' }}
                                                                key={e.NewsId}
                                                                onClick={() => {
                                                                    history.push(`/chi-tiet-tin-tuc/${e.NewsId}`);
                                                                    window.scrollTo({
                                                                        top: 80,
                                                                        behavior: "smooth"
                                                                    });
                                                                }}>{e.NewsTitle}</a>
                                                        </h6>
                                                    </div>
                                                    <div className="news-block-date">
                                                        <p>
                                                            <i className="bi-calendar4 custom-icon me-1" />
                                                            {FormatDateJson(e.CreateOn)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            })}
                           
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};
