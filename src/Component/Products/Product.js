import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Select from 'react-select';
import { Paging, SelectCategory } from "../../Common";
import { GROUPID} from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import { LINK_IMAGE } from "../../Services";
import {  FormatNumber } from "../../Utils";
import I18n from "i18n-js";
import $ from 'jquery'
export const Product = ({
}) => {
    useEffect(() => {
        Shop_spWeb_Products_List();
    }, []);

    const dispatch = useDispatch();
    const [ListData, setListData] = useState([]);
    const [ListData2, setListData2] = useState([]);
    const [ListData3, setListData3] = useState([]);
    const [ListData4, setListData4] = useState([]);
    const [ListData5, setListData5] = useState([]);
    const [DataPaging, setDataPaging] = useState([]);

    const [CategoryName2, setCategoryName2] = useState();
    const [CategoryName3, setCategoryName3] = useState();
    const [CategoryName4, setCategoryName4] = useState();
    const [CategoryName5, setCategoryName5] = useState();



    const countCategories = (listData) => {
        const categoryNames = {};

        listData.forEach(item => {
            const categoryIds = item.ListCategoriesId.split(',');
            categoryIds.forEach(categoryId => {
                if (!categoryNames[categoryId]) {
                    categoryNames[categoryId] = item.ListCategoriesName.split(',')[0];
                }
            });
        });

        return categoryNames;
    };

    const Shop_spWeb_Products_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Products_CAK_" + GROUPID)
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
                func: "Shop_spWeb_Products_List",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);

            if (result.length > 0) {
                setListData(result);
                const categoryNames = countCategories(result);
                const sortedCategories = Object.keys(categoryNames).sort((a, b) =>
                    categoryNames[b].localeCompare(categoryNames[a])
                );

                const filteredData = {};
                sortedCategories.forEach(categoryId => {
                    filteredData[categoryId] = result.filter(item => item.ListCategoriesId.includes(categoryId));
                });

                const category2 = sortedCategories[0];
                const category3 = sortedCategories[1];
                const category4 = sortedCategories[2];
                const category5 = sortedCategories[3];

                setCategoryName2(categoryNames[category2]);
                setCategoryName3(categoryNames[category3]);
                setCategoryName4(categoryNames[category4]);
                setCategoryName5(categoryNames[category5]);

                setListData2(filteredData[category2]);
                setListData3(filteredData[category3]);
                setListData4(filteredData[category4]);
                setListData5(filteredData[category5]);

                setOriginalListData(result);
                return;
            }
        } catch (err) {
            // Xử lý lỗi
        }
    };

    const OptionPrice = [
        { value: 0, label: `${I18n.t("Other.Price")}` },
        { value: 1, label: `${I18n.t("Other.LowToHigh")}` },
        { value: 2, label: `${I18n.t("Other.HighToLow")}` },
    ]
    const [TypePrice, setTypePrice] = useState({ value: 0, label: `${I18n.t("Other.Price")}` });
    const [CategoryProduct, setCategoryProduct] = useState({ value: 0, label: `${I18n.t("Other.AllCategory")}` });

    const [originalListData, setOriginalListData] = useState([]);

    const handleFilteredCategoryProducts = (e) => {
        // Nếu là 0 thì lấy tất cả
        if (e.value === 0) {
            setListData(originalListData);
        } else {
            const categoryId = e.value.toString(); // Chuyển e.value sang kiểu chuỗi
            const filteredProducts = originalListData.filter((item) => item.ListCategoriesId.includes(categoryId));
            setListData(filteredProducts);
        }
    };



    const handleFilteredPriceProducts = (e) => {
        const _ListData = [...ListData]
        setTypePrice(e);
        if (e.value === 0) {
            setListData(originalListData);
        } else if (e.value === 1) {
            // Sắp xếp từ thấp đến cao
            const sortedProducts = _ListData.sort((a, b) => a.ProductPrice - b.ProductPrice);
            setListData(sortedProducts);
        } else if (e.value === 2) {
            // Sắp xếp từ cao đến thấp
            const sortedProducts = _ListData.sort((a, b) => b.ProductPrice - a.ProductPrice);
            setListData(sortedProducts);
        }
    };


    const [searchNameProduct, setSearchNameProduct] = useState('');

    const handleSearchNameProducts = () => {
        const searchTerm = searchNameProduct.trim(); // Loại bỏ khoảng trắng đầu và cuối chuỗi

        if (searchTerm === '') {
            // Nếu chuỗi tìm kiếm rỗng, trả lại mảng ban đầu
            setListData(originalListData);
        } else {
            // Ngược lại, thực hiện tìm kiếm theo tên sản phẩm
            const filteredProducts = originalListData.filter(
                (product) =>
                    product.ProductName.includes(searchTerm) ||
                    product.ProductCode.includes(searchTerm) ||
                    product.ProductNote.includes(searchTerm)
            );
            setListData(filteredProducts);
        }
    };

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
            <section class="product-section" id="section_11">
                <div className="bg_head">
                    <Link to="/"><span className="color-white"> {I18n.t("Header.HomePage")}</span></Link>
                    <i class="bi bi-chevron-double-right"></i>
                    <span>{I18n.t("Other.Product")}</span>
                </div>
            </section >
            <section className="product-section" id="section_13" >
                <div className="container mt-5 mb-5">
                    <div className="row g-2 justify-content-between mb-5 card-filter">
                        <div className="col-md-4 col-12">
                            <SelectCategory
                                onSelected={(e) => {
                                    setCategoryProduct(e)
                                    handleFilteredCategoryProducts(e)
                                }}
                                Data={CategoryProduct}
                            />
                        </div>
                        <div className="col-md-4 col-12">
                            <Select className="SelectMeno"
                                options={OptionPrice}
                                value={TypePrice}
                                onChange={e => {
                                    setTypePrice(e)
                                    handleFilteredPriceProducts(e)
                                }}
                            />
                        </div>
                        <div className="col-md-4 col-12">
                            <div class="input-group ">
                                <span class="input-group-text" id="basic-addon1">
                                    <i class="fa-light fa-magnifying-glass"></i>
                                </span>
                                <input
                                    className="form-control search-input"
                                    value={searchNameProduct}
                                    type="search"
                                    placeholder={`${I18n.t("Other.SearchProduct")}`}
                                    aria-label="Search"
                                    onChange={(e) => {
                                        setSearchNameProduct(e.target.value);
                                    }}
                                    onKeyUp={() => handleSearchNameProducts()}
                                />
                            </div>
                        </div>
                    </div>
                    {CategoryProduct.value === 0 && TypePrice.value === 0 && searchNameProduct === '' && <>
                        <div className="row g-4 mt-3">
                            <div className="col-lg-12 col-12 text-center mb-4 w3-animate-bottom">
                                <h2>{CategoryName2}</h2>
                            </div>
                            {ListData2.length > 0 && ListData2.slice(0, 4).map((e, k) => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 w3-animate-bottom"
                                        key={e.ProductId}
                                    >
                                        <div className="custom-block-wrap pointer card-hover">
                                            <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`} className="ctn-image">
                                                <img src={ImageProduct} className="custom-block-image img-fluid" alt />
                                            </Link >
                                            <div className="custom-block">

                                                <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`}>
                                                    <div className="custom-block-body p-3" >
                                                        <h5 className="mb-3 text-product fs-5">{e.ProductName}</h5>
                                                        <div className="d-flex align-items-center my-2">
                                                            <p className="mb-0">
                                                                <strong>{I18n.t("Other.Price")}: </strong>
                                                                <span style={{ color: 'red' }}>{FormatNumber(e.ProductPrice)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="col-9">
                                                        <a href="#" className="custom-btn btn  ">{I18n.t("Other.ShopNow")}</a>
                                                    </div>
                                                    <div className="col-3">
                                                        <a id={k} className="custom-btn btn custom-add-cart" onClick={() => {
                                                            AddToCart(e)
                                                        }}>
                                                            <i class="fa-duotone fa-cart-plus"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row g-4 mt-3">
                            <div className="col-lg-12 col-12 text-center mb-4 w3-animate-bottom">
                                <h2>{CategoryName3}</h2>
                            </div>
                            {ListData3.length > 0 && ListData3.slice(0, 4).map((e, k) => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 w3-animate-bottom"
                                        key={e.ProductId}
                                    >
                                        <div className="custom-block-wrap pointer card-hover">
                                            <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`} className="ctn-image">
                                                <img src={ImageProduct} className="custom-block-image img-fluid" alt />
                                            </Link >
                                            <div className="custom-block">

                                                <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`}>
                                                    <div className="custom-block-body p-3" >
                                                        <h5 className="mb-3 text-product fs-5">{e.ProductName}</h5>
                                                        <div className="d-flex align-items-center my-2">
                                                            <p className="mb-0">
                                                                <strong>{I18n.t("Other.Price")}: </strong>
                                                                <span style={{ color: 'red' }}>{FormatNumber(e.ProductPrice)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="col-9">
                                                        <a href="#" className="custom-btn btn  ">{I18n.t("Other.ShopNow")}</a>
                                                    </div>
                                                    <div className="col-3">
                                                        <a id={k} className="custom-btn btn custom-add-cart" onClick={() => {
                                                            AddToCart(e)
                                                        }}>
                                                            <i class="fa-duotone fa-cart-plus"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row g-4 mt-3">
                            <div className="col-lg-12 col-12 text-center mb-4 w3-animate-bottom">
                                <h2>{CategoryName4}</h2>
                            </div>
                            {ListData4.length > 0 && ListData4.slice(0, 4).map((e, k) => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 w3-animate-bottom"
                                        key={e.ProductId}
                                    >
                                        <div className="custom-block-wrap pointer card-hover">
                                            <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`} className="ctn-image">
                                                <img src={ImageProduct} className="custom-block-image img-fluid" alt />
                                            </Link >
                                            <div className="custom-block">

                                                <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`}>
                                                    <div className="custom-block-body p-3" >
                                                        <h5 className="mb-3 text-product fs-5">{e.ProductName}</h5>
                                                        <div className="d-flex align-items-center my-2">
                                                            <p className="mb-0">
                                                                <strong>{I18n.t("Other.Price")}: </strong>
                                                                <span style={{ color: 'red' }}>{FormatNumber(e.ProductPrice)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="col-9">
                                                        <a href="#" className="custom-btn btn  ">{I18n.t("Other.ShopNow")}</a>
                                                    </div>
                                                    <div className="col-3">
                                                        <a id={k} className="custom-btn btn custom-add-cart" onClick={() => {
                                                            AddToCart(e)
                                                        }}>
                                                            <i class="fa-duotone fa-cart-plus"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row g-4 mt-3">
                            <div className="col-lg-12 col-12 text-center mb-4 w3-animate-bottom">
                                <h2>{CategoryName5}</h2>
                            </div>
                            {ListData5.length > 0 && ListData5.slice(0, 4).map((e, k) => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 w3-animate-bottom"
                                        key={e.ProductId}
                                    >
                                        <div className="custom-block-wrap pointer card-hover">
                                            <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`} className="ctn-image">
                                                <img src={ImageProduct} className="custom-block-image img-fluid" alt />
                                            </Link >
                                            <div className="custom-block">

                                                <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`}>
                                                    <div className="custom-block-body p-3" >
                                                        <h5 className="mb-3 text-product fs-5">{e.ProductName}</h5>
                                                        <div className="d-flex align-items-center my-2">
                                                            <p className="mb-0">
                                                                <strong>{I18n.t("Other.Price")}: </strong>
                                                                <span style={{ color: 'red' }}>{FormatNumber(e.ProductPrice)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="col-9">
                                                        <a  className="custom-btn btn  ">{I18n.t("Other.ShopNow")}</a>
                                                    </div>
                                                    <div className="col-3">
                                                        <a id={k} className="custom-btn btn custom-add-cart" onClick={() => {
                                                            AddToCart(e)
                                                        }}>
                                                            <i class="fa-duotone fa-cart-plus"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>}


                    <div className="row g-4 mt-5">
                        <div className="col-lg-12 col-12 text-center mb-4 w3-animate-bottom">
                            <h2>{I18n.t("Other.AllProduct")}</h2>
                        </div>
                        {DataPaging.length > 0 && DataPaging.map((e, k) => {
                            const ListImageProduct = e.ImageProduct.split(",")
                            const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 w3-animate-bottom"
                                    key={e.ProductId}
                                >
                                    <div className="custom-block-wrap pointer card-hover">
                                        <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`} className="ctn-image">
                                            <img src={ImageProduct} className="custom-block-image img-fluid" alt />
                                        </Link >
                                        <div className="custom-block">

                                            <Link key={e.ProductId} to={`chi-tiet-san-pham/${e.Url}`}>
                                                <div className="custom-block-body p-3" >
                                                    <h5 className="mb-3 text-product fs-5">{e.ProductName}</h5>
                                                    <div className="d-flex align-items-center my-2">
                                                        <p className="mb-0">
                                                            <strong>{I18n.t("Other.Price")}: </strong>
                                                            <span style={{ color: 'red' }}>{FormatNumber(e.ProductPrice)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="col-9">
                                                    <a className="custom-btn btn  ">{I18n.t("Other.ShopNow")}</a>
                                                </div>
                                                <div className="col-3">
                                                    <a id={k} className="custom-btn btn custom-add-cart" onClick={() => {
                                                        AddToCart(e)
                                                    }}>
                                                        <i class="fa-duotone fa-cart-plus"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="row mt-5" >
                        <Paging
                            data={ListData}
                            Columns={12}
                            DataOut={e => setDataPaging(e)}
                        />
                    </div>

                </div>
            </section>
        </>
    );
};

