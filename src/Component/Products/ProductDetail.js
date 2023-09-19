import ReactHtml from 'raw-html-react';
import React, { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { GROUPID} from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import { LINK_IMAGE } from "../../Services";
import {  FormatNumber } from "../../Utils";
import I18n from 'i18n-js';
import $ from 'jquery'

export const ProductDetail = () => {
    useEffect(() => {
        Shop_spWeb_Products_List();
    }, []);
    const dispatch = useDispatch();
    const [ListData, setListData] = useState([]);
    const [NumberProduct, setNumberProduct] = useState(1);


    const { ProductId } = useParams();

    //#region List
    const Shop_spWeb_Products_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Products_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            setListData(result2.filter(e=>e.Url === ProductId));
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
            if (result?.length > 0) {
                setListData(result.filter(e=>e.Url === ProductId));
              
            }
        } catch (err) { }
    };
    //#endregion


    const AddToCart = (item) => {
         
        let cart = JSON.parse(localStorage.getItem("MyCart")) || [];
        // Tìm kiếm sản phẩm trong giỏ hàng
        const existingProductIndex = cart.findIndex(
            (cartItem) => (cartItem.ProductId === item.ProductId));
        if (existingProductIndex !== -1) {
            // Tăng NumberProduct lên 1 nếu sản phẩm đã tồn tại trong giỏ hàng
            cart[existingProductIndex].NumberProduct += 1;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng với NumberProduct ban đầu là 1
            cart.push({ ...item, NumberProduct: 1 });
        }
        localStorage.setItem("MyCart", JSON.stringify(cart));
        $("#totalCart").text(cart.length);
    };
    return (
        <>
            <section class="product-section" id="section_12">
                <div className="bg_head">
                    <Link to="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></Link>
                    <i class="bi bi-chevron-double-right"></i>
                    <Link className="color-white" to="/san-pham">{I18n.t("Other.Product")}</Link>
                    <i class="bi bi-chevron-double-right"></i>
                    <span>{ListData[0]?.ProductName}</span>
                </div>
            </section>
            <section className="section-padding" id="section_12">
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-6 w3-animate-bottom ">
                            <div className="news-block">
                                <div className="news-block-top">
                                    {ListData.length > 0 &&
                                        (ListData[0]?.ImageProduct).split(",").map((e, key) => {
                                            if (e !== "" && key === 0)
                                                return (
                                                    <img
                                                        src={LINK_IMAGE + e}
                                                        className="news-image"
                                                        style={{ width: "100%" }}
                                                        alt="Product Image"
                                                    />
                                                );
                                        })}
                                </div>
                                <div class="line-iamge">
                                    {ListData.length > 0 &&
                                        (ListData[0]?.ImageProduct).split(",").map((e, key) => {
                                            if (e !== "")
                                                return (
                                                    <div class="image">
                                                        <div class="image-item">
                                                            <ModalImage
                                                                small={LINK_IMAGE + e}
                                                                medium={LINK_IMAGE + e}
                                                                large={LINK_IMAGE + e}
                                                                hideDownload={true}
                                                                hideZoom={true}
                                                                showRotate={true}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                        })}
                                </div>
                                <div className="news-block-info">
                                    <div className="news-block-title mb-2">
                                        {ListData[0]?.Details && (
                                            <div className="card-detail-product ">
                                                <h5 className="m-0 text-center">{I18n.t("Other.DetailProduct")}</h5>
                                                <hr />
                                                {ListData[0]?.Details &&
                                                    ListData[0]?.Details.map((e) => {
                                                        return (
                                                            <div className="row">
                                                                <div className=" col-4 ">
                                                                    <p
                                                                        className="ml-2"
                                                                        style={{ marginLeft: "20px" }}
                                                                    >
                                                                        <strong>{e.DetailName} :</strong>
                                                                    </p>
                                                                </div>
                                                                <div className=" col-8 ">
                                                                    <p className="">{e.DetailDescription}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                    <div className="news-block-title mb-2">
                                        <h5>{I18n.t("Other.ProductionDescribtion")}</h5>
                                    </div>
                                    <div className="news-block-body">
                                        {ListData.length > 0 && (
                                            <ReactHtml html={ListData[0].ProductDesciption} componentMap={{ ProductDetail }} />
                                        )}
                                    </div>
                                    <hr />
                                    <form
                                        className="custom-form comment-form mt-4"
                                        action="#"
                                        method="post"
                                        role="form"
                                    >
                                        <h5 className="mb-3">{I18n.t("Other.WriteReview")}</h5>
                                        <textarea
                                            name="comment-message"
                                            rows={4}
                                            className="form-control"
                                            id="comment-message"
                                            placeholder="Hãy để lại cảm nhận mua hàng của bạn ..."
                                            defaultValue={""}
                                        />
                                        <div className="col-lg-3 col-md-4 col-6 ms-auto">
                                            <button type="submit" className="form-control">
                                                {I18n.t("Other.Comments")}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 w3-animate-left">
                            <h5 className="fs-1 ">{ListData[0]?.ProductName}</h5>
                            <hr />
                            <div className="row">
                                <div class="d-flex  ">
                                    <div class="news-block-date ">
                                        <p>
                                            <span style={{ marginRight: "5px" }}>4.5</span>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                        </p>
                                    </div>
                                    <div class="news-block-author mx-5">
                                        <p>
                                            <u style={{ marginRight: "5px" }}>1.3k</u>
                                            Đã bán
                                        </p>
                                    </div>
                                    <div class="news-block-comment">
                                        <p>
                                            <i class="bi-chat-left custom-icon me-1"></i>
                                            48 {I18n.t("Other.Comments")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <b className=" fs-2 " style={{ color: "red" }}>
                                {FormatNumber(ListData[0]?.ProductPrice)}
                            </b>
                            <div className="row mt-3 ">
                                <div className=" col-12">
                                    <p className="m-0 fs-4" style={{ display: 'contents' }}>{I18n.t("Other.Quanlity")}</p>
                                    <div
                                        class="btn-group col-3"
                                        role="group"
                                        aria-label="Basic example"
                                        style={{ marginLeft: '15px' }}
                                    >
                                        <button type="button " class="btn btn-light" onClick={e => {
                                            NumberProduct > 1 && setNumberProduct(NumberProduct - 1)
                                        }}>
                                            <i class="fa-solid fa-minus"></i>
                                        </button>
                                        <input type="text" class="form-control input-gr " value={NumberProduct} onChange={e => {
                                            setNumberProduct(e.target.value);
                                        }} />
                                        <button type="button " class="btn btn-light" onClick={e => setNumberProduct(NumberProduct + 1)}>
                                            <i class="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <button
                                        type="button "
                                        class="btn btn-outline-success w-100"
                                        onClick={() => AddToCart(ListData[0])}
                                    >
                                        <spam>{I18n.t("Other.AddToCart")} </spam>
                                        <i class="fa-duotone fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    <button type="button" class="custom-btn btn smoothscroll" style={{ width: '100%' }}>{I18n.t("Other.ShopNow")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ >
    );
};
