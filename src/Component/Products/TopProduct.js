import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LANE } from "../../Enum";
import {GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
import { FormatNumber } from "../../Utils";
import MainLayout from "../../Layout/MainLayout";

export const TopProduct = ({
}) => {
    const dispatch = useDispatch();

    const [ListData, setListData] = useState([]);

    useEffect(() => {
        Shop_spWeb_Products_List();
    }, []);

    //#region List
    const Shop_spWeb_Products_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Products_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            setListData(result2.slice(0, 8));
        }
        try {
            const pr = {
                Domain: '',
                GroupId: GROUPID
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "Shop_spWeb_Products_List",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            if (result.length > 0) {
                setListData(result.slice(0, 8));
                localStorage.setItem("Web_Infor_Products_CAK_" + GROUPID, JSON.stringify(result));
            }
        } catch (err) {
        }
    };
    //#endregion

    
    return (
        <MainLayout>
            <section className="section-padding" id="section_3" style={{ paddingTop: '50px' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-12 col-12 text-center mb-4">
                            <h2>{I18n.t("Product.Productselling")}</h2>
                        </div>

                    </div>
                    <div className="row container">
                        {
                            ListData.map(e => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <>
                                        <div class="col-md-3 ">
                                            <Link to={`chi-tiet-san-pham/${e.Url}`}>
                                                <div class="product-container card-hover">
                                                    <div class="tag-sale">

                                                    </div>
                                                    <div class="product-image">
                                                        <span class="hover-link"></span>
                                                        <a class="product-link">Chi tiết</a>
                                                        <img class="img-responsive" src={ImageProduct} alt="" />
                                                    </div>
                                                    <div class="product-description">
                                                        <div class="product-label">
                                                            <div class="product-name">
                                                                <div className="text-product">{e.ProductName}</div>
                                                                <div class="price">
                                                                    <div className=" row">
                                                                        <div className="col-md-7">
                                                                            {FormatNumber(e.ProductPrice)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="productCa">{e.ListCategoriesName}</div>
                                                            </div>
                                                        </div>
                                                        <div class="product-option">

                                                            {e.ProductName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </section>
        </MainLayout>

    );
};
