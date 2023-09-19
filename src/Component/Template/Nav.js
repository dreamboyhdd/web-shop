import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Alertsuccess, Alertwarning, FormatNumber } from "../../Utils";
import { GROUPID, LINK_IMAGE } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import I18n from '../../Language';
import { DecodeString } from "../../Utils";
import { EncodeString } from "../../Utils";
export const Nav = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [DataMenu, setDataMenu] = useState([]);
    const [DataMenuList, setDataMenuList] = useState([]);
    const [Logo, setLogo] = useState('');
    const [Slogan, setSlogan] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [User, setUser] = useState();
    const [PassHide, setPassHide] = useState("password");
    const [UserName, setUserName] = useState('');
    const UserNameRef = useRef(null);
    const [Password, setPassword] = useState('');
    const PassWordRef = useRef(null);
    const [PassHideRegister, setPassHideRegister] = useState("password");
    const [PassHideEnterRegister, setPassHideEnterRegister] = useState("password");
    const [UserNameRegister, setUserNameRegister] = useState('');
    const UserNameRegisterRef = useRef(null);
    const [EmailRegister, setEmailRegister] = useState('');
    const EmailRegisterRef = useRef(null);
    const [AddressRegister, setAddressRegister] = useState('');
    const AddressRegisterRef = useRef(null);
    const [PhoneRegister, setPhoneRegister] = useState('');
    const PhoneRegisterRef = useRef(null);
    const [PasswordRegister, setPasswordRegister] = useState('');
    const PassWordRegisterRef = useRef(null);
    const [totalCart, setTotalCart] = useState(0)

    const [PasswordEnterRegister, setPasswordEnterRegister] = useState('');
    const PassWordEnterRegisterRef = useRef(null);
    const Phone = ['032', '033', '034', '035', '036', '037', '038', '039', '096', '097', '098', '086',
        '083', '084', '085', '081', '082', '088', '091', '094',
        '070', '079', '077', '076', '078', '090', '093', '089',
        '056', '058', '092', '059', '099'
    ];
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const regexp = /[A-Z]/g;
    const [CustomerId, setCustomerId] = useState(0);

    const [ChangeCart, setChangeCart] = useState(0);
    const [DataCart, setDataCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        Shop_spWeb_Services_List();
        let cart = localStorage.getItem("MyCart");
        if (cart !== undefined && cart !== '' && cart !== null)
            setTotalCart(JSON.parse(cart).length)

    }, [location.pathname])

    useEffect(() => {
        if (localStorage.getItem("MyCart") !== null && localStorage.getItem("MyCart") !== '') {
            const _DataCart = JSON.parse((localStorage.getItem("MyCart")));
            setDataCart(_DataCart)

            // Tính tổng tiền từ danh sách sản phẩm trong giỏ hàng
            const newTotalPrice = _DataCart.reduce((total, product) => {
                return total + product.ProductPrice * product.NumberProduct;
            }, 0);
            setTotalPrice(newTotalPrice);
        }
    }, [ChangeCart]);


    //#region thay đổi số lượng sản phẩm
    const handleChangeQuantity = (newQuantity, index) => {
        const updatedDataCart = [...DataCart];

        updatedDataCart[index].NumberProduct = +newQuantity;
        setDataCart(updatedDataCart);

        // Cập nhật lại localStorage
        localStorage.setItem("MyCart", JSON.stringify(updatedDataCart));

        // Tính tổng tiền
        const newTotalPrice = updatedDataCart.reduce((total, product) => {
            return total + product.ProductPrice * product.NumberProduct;
        }, 0);
        setTotalPrice(newTotalPrice);
    };
    //#endregion

    //#region  XÓA SẢN PHẨM KHỎI GIỎ HÀNG
    const removeFromCart = (productId) => {
        const updatedDataCart = DataCart.filter(product => product.ProductId !== productId);
        setDataCart(updatedDataCart);
        localStorage.setItem("MyCart", JSON.stringify(updatedDataCart));

        // Tính lại tổng tiền sau khi xóa sản phẩm
        const newTotalPrice = updatedDataCart.reduce((total, product) => {
            return total + product.ProductPrice * product.NumberProduct;
        }, 0);
        setTotalPrice(newTotalPrice);

        setTotalCart(updatedDataCart.length)
    };
    //#endregion

    //#region thông tin công ty
    const Shop_spWeb_Setting_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Setting_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {
            const result2 = JSON.parse(infor);
            let Logo = LINK_IMAGE + ((result2.find(e => e.KeySetting === "Logo")).DataSetting.replace(',', ''));
            setLogo(Logo);
            setCompanyName((result2.find(e => e.KeySetting === "CompanyName")).DataSetting);
            setSlogan((result2.find(e => e.KeySetting === "Slogan")).DataSetting);
        }
    };

    //#endregion

    //#region danh sách menu động
    const Shop_spWeb_Menu_List = async (Data) => {
        const pr = {
            Domain: '',
            GroupId: GROUPID
        };
        const params = {
            Json: JSON.stringify(pr),
            func: "Shop_spWeb_Menu_List",
        };
        try {
            const result = await mainAction.API_spCallServer(params, dispatch);
            localStorage.setItem("Web_Infor_ListMenu_CAK_"+GROUPID, result.length > 0 ? JSON.stringify(result) : '');
            const newDatadt = result?.map(item => {
                return (
                    item.sLevel === 1 && item.MenuUrl !== '/dang-nhap'
                        ?
                        item.MenuUrl !== '/dich-vu' ?

                            <li tabIndex={item.Id} className={(location.pathname === item.MenuUrl ? "active_Menu nav-item" : "nav-item")}>
                                <Link class="nav-link "
                                    key={item.Id}
                                    to={item.MenuUrl}
                                    onClick={() => {
                                        window.scrollTo({
                                            top: -90,
                                        });
                                    }}>{item.MenuName}</Link>
                            </li>

                            :

                            <li tabIndex={item.Id} className={(location.pathname !== null && location.pathname !== undefined && location.pathname.includes('/dich-vu') === true ? "active_Menu nav-item dropdown" : "nav-item dropdown")}
                            >
                                <div class="nav-link upper dropdown-toggle inactive servicemenu">
                                    <Link
                                        to={`/dich-vu`}
                                        key={item.Id}
                                        onClick={() => {
                                            window.scrollTo({
                                                top: -90,
                                            });
                                        }}
                                    >{item.MenuName}</Link>
                                </div>

                                <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink" data-bs-popper="static">

                                    {
                                        Data.map((itm, Key) => {
                                            return (
                                                (
                                                    <li tabIndex={itm.Id} className="padding_border">
                                                        <Link class="dropdown-item pd-t-10"
                                                            key={itm.ServiceId}
                                                            to={`/chi-tiet-dich-vu/${itm.Url}`}
                                                        >
                                                            {itm.ServiceName}
                                                        </Link>
                                                    </li>

                                                )
                                            )
                                        })
                                    }
                                    <li className="padding_border">
                                        <Link tabIndex={0} class="dropdown-item pd-t-10"
                                            key={0}
                                            to={`/dich-vu`}
                                        >
                                            Tất cả dịch vụ
                                        </Link>
                                    </li>
                                </ul>
                            </li>


                        :
                        GeneralMenu(item.Id, item.MenuName, result)
                )
            })
            setDataMenu(newDatadt);
            setDataMenuList(result.filter(e => e.IsHide === false))
            Shop_spWeb_Setting_List();
            setUser(DecodeString(localStorage.getItem("Customer_Phone")))
        } catch (err) {
        }
    };
    const GeneralMenu = (Id, MenuName, List) => {
        let child = List.filter(p => p.ParentId === Id);
        return (child.length > 0 ?
            (
                <li class="nav-item dropdown" >
                    <a class="nav-link  dropdown-toggle" href="#section_5"
                        id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">{MenuName}</a>
                    <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                        {
                            child.map((itm, Key) => {
                                return (
                                    (
                                        <li >
                                            <Link key={Key} class="dropdown-item"
                                                to={itm.MenuUrl}
                                                title={itm.MenuName} onClick={() => {
                                                    window.scrollTo({
                                                        top: 80,
                                                    });
                                                }}>
                                                {itm.MenuName}
                                            </Link>
                                            {/*  <a  href={itm.MenuUrl}>{itm.MenuName}</a> */}
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                </li>
            )
            : (<></>)
        );
    }
    //#endregion

    //#region Animation change form sign in and sign up
    const signUpButtonClick = () => {
        const container = document.getElementById('containerlogin');
        container.classList.add("right-panel-active");
    }

    const signInButtonClick = () => {
        const container = document.getElementById('containerlogin');
        container.classList.remove("right-panel-active");
    }
    //#endregion  

    //#region  xử lý đăng nhập  
    const Shop_spCustomer_Login = async () => {
        if (UserName.trim() === '') {
            document.getElementById('UserName').focus()
            Alertwarning('Vui lòng nhập tên đăng nhập');
            return;
        }
        if (Password.trim() === '') {
            document.getElementById('Password').focus()
            Alertwarning('Vui lòng nhập Mật khẩu');
            return;
        }
        try {
            const pr = {
                Json: JSON.stringify({
                    UserName: UserName,
                    Password: Password,
                    GroupId: GROUPID
                }),
                func: "Shop_spCustomer_Login",
                API_key: "netcoApikey2025"
            }
            const list = await mainAction.API_spCallServer(pr, dispatch);
            if (list?.Status === 'NOTOK') {
                Alertwarning(list?.Result);
                return;
            }
            else {
                localStorage.setItem("Customer_Id", EncodeString(list?.Result[0].CustomerId + ''));
                localStorage.setItem("Customer_Name", EncodeString(list?.Result[0].CustomerName));
                localStorage.setItem("Customer_Phone", EncodeString(list?.Result[0].CustomerPhone));
                localStorage.setItem("Customer_Email", EncodeString(list?.Result[0].CustomerEmail));
                localStorage.setItem("Customer_Address", EncodeString(list?.Result[0].CustomerAddress));
                localStorage.setItem("KeyLG", 1);
                setUserName('');
                setPassword('');
                Hidden_formLogin()
                setUser(list?.Result[0].CustomerPhone);
                /*  navigator(location.pathname) */

                setCustomerId(list?.Result[0].CustomerId)
                const params = {
                    Json: JSON.stringify({
                        CustomerId: list?.Result[0].CustomerId,
                    }),
                    func: "Shop_spCart_List",
                };
                const result = await mainAction.API_spCallServer(params, dispatch);
                result.length > 0 && setDataCart(result)
            }

        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region mở form đăng nhập + đăng ký
    const Show_formLogin = async () => {
        document.getElementById('myModalLogin').classList.remove('display-none')
        document.getElementById('myModalLogin').classList.add('w3-animate-top')

    }
    //#endregion

    //#region đóng form form đăng nhập + đăng ký
    const Hidden_formLogin = async () => {
        document.getElementById('myModalLogin').classList.add('display-none')
        document.getElementById('myModalLogin').classList.remove('w3-animate-top')
    }
    //#endregion

    //#region  xử lý đăng ký
    const Shop_spCustomer_Save = async () => {
        if (UserNameRegister.trim() === '') {
            document.getElementById('UserNameRegister').focus()
            Alertwarning('Vui lòng nhập tên');
            return;
        }
        if (PhoneRegister.trim() === '') {
            Alertwarning('Vui lòng nhập số ĐT');
            document.getElementById('PhoneRegister').focus()
            return;
        }
        if (AddressRegister.trim() === '') {
            Alertwarning('Vui lòng nhập địa chỉ');
            document.getElementById('PhoneRegister').focus()
            return;
        }

        if (PhoneRegister.trim().length !== 10) {
            Alertwarning('Vui lòng nhập đúng định dạng số ĐT');
            document.getElementById('PhoneRegister').focus()
            return;
        }
        if (!Phone.includes(PhoneRegister.substring(0, 3))) {
            Alertwarning('Vui lòng nhập đúng định dạng số ĐT');
            document.getElementById('PhoneRegister').focus()
            return;
        }
        if (EmailRegister.trim() === '') {
            Alertwarning('Vui lòng nhập Email');
            document.getElementById('EmailRegister').focus()
            return;
        }
        if (EmailRegister.trim().includes('@') === false) {
            Alertwarning('Vui lòng nhập đúng định dạng Email');
            document.getElementById('EmailRegister').focus()
            return;
        }
        if (EmailRegister.trim().includes('.com') === false) {
            Alertwarning('Vui lòng nhập đúng định dạng Email');
            document.getElementById('EmailRegister').focus()
            return;
        }

        if (PasswordRegister.trim() === '') {
            Alertwarning('Vui lòng nhập Mật khẩu');
            document.getElementById('PasswordRegister').focus()
            return;
        }
        if (PasswordRegister.trim().match(format) === null) {
            Alertwarning('Mật khẩu phải có ít nhất 1 ký tự đặc biệt!');
            document.getElementById('PasswordRegister').focus()
            return;
        }
        if (PasswordRegister.trim().match(regexp) === null) {
            Alertwarning('Mật khẩu phải có ít nhất 1 ký tự viết hoa!');
            document.getElementById('PasswordRegister').focus()
            return;
        }

        if (PasswordEnterRegister.trim() === '') {
            Alertwarning('Vui lòng nhập lại mật khẩu');
            document.getElementById('PasswordEnterRegister').focus()
            return;
        }
        if (PasswordRegister.trim() !== '' && PasswordEnterRegister.trim() !== PasswordRegister.trim()) {
            Alertwarning('Mật khẩu chưa trùng khớp!');
            document.getElementById('PasswordEnterRegister').focus()
            return;
        }

        try {
            const pr = {
                Json: JSON.stringify({
                    CustomerId: 0,
                    CustomerName: UserNameRegister,
                    CustomerPhone: PhoneRegister,
                    CustomerEmail: EmailRegister,
                    CustomerAddress: AddressRegister,
                    Password: PasswordRegister,
                    IsHide: 0,
                    IsDelete: 0,
                    UserId: 0,
                }),
                func: "Shop_spCustomer_Save",
                API_key: "netcoApikey2025"
            }

            const list = await mainAction.API_spCallServer(pr, dispatch);
            if (list?.Status === 'NOTOK') {
                document.getElementById('UserNameRegister').focus()
                Alertwarning(list?.Result);
            }
            else {
                Alertsuccess('Đăng ký thành công')
                signInButtonClick()
                setUserName(PhoneRegister)
                setPassword(PasswordRegister)
                setUserNameRegister('')
                setEmailRegister('')
                setPhoneRegister('')
                setPasswordRegister('')
                setPasswordEnterRegister('')
                setAddressRegister('')
            }

        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region Logout
    const Logout = () => {
        localStorage.setItem("Customer_Id", '');
        localStorage.setItem("Customer_Name", '');
        localStorage.setItem("Customer_Phone", '');
        localStorage.setItem("Customer_Email", '');
        localStorage.setItem("Customer_Address", '');
        localStorage.removeItem("KeyLG");
        localStorage.removeItem("MyCart");
        setUser('')
        /*  navigator(location.pathname) */
    }
    //#endregion

    //#region dang sách dịch vụ
    const Shop_spWeb_Services_List = async () => {
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
            Shop_spWeb_Menu_List(list);
            localStorage.setItem("Web_Infor_Service_CAK_" + GROUPID, JSON.stringify(list));
        } catch (error) {
        }
    }
    //#endregion
    return (
        <section className="section_18">
            <nav class="navbar navbar-expand-lg bg-light shadow-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src={Logo} class="logo img-fluid" alt={CompanyName} />
                        <span className="ml-10">
                            {CompanyName}
                            <small>{Slogan}</small>
                        </span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            {DataMenu}
                            {
                                DataMenuList.length > 0 &&
                                    DataMenuList.filter(e => e.MenuUrl === "/san-pham").length > 0 ?
                                    <li class="nav-item ms-3">
                                        <div class="nav-link custom-btn custom-border-btn btn ml-10" href="donate.html"
                                            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                            onClick={() => setChangeCart(Math.random())}
                                        >
                                            <i class="bi bi-cart3"></i>
                                            <span id="totalCart" className="cardnumber">{totalCart}</span>
                                        </div>
                                    </li> : <></>
                            }
                            {
                                DataMenuList.length > 0 &&
                                    DataMenuList.filter(e => e.MenuUrl === "/dang-nhap").length > 0 ?
                                    User === ""
                                        ?
                                        <li class="nav-item ms-3">
                                            <a class="nav-link custom-btn custom-border-btn btn ml-10" type="button" onClick={e => Show_formLogin()}>{I18n.t("Header.Login")}</a>
                                        </li>
                                        :
                                        <li class="nav-item dropdown">
                                            <div class="nav-link click-scroll dropdown-toggle inactive"
                                                href="#section_5"
                                                id="navbarLightDropdownMenuLink"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">{User}</div>
                                            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink" data-bs-popper="static">
                                                <li><a class="dropdown-item pd-t-10" onClick={e => Logout()}>{I18n.t("Header.Logout")}</a></li>
                                            </ul>
                                        </li>
                                    : <></>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            <div class="modal in modal_active display-none" id="myModalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            <i class="bi bi-x-square closeModal_Login" onClick={e => Hidden_formLogin()}></i>
                            <div class="modal-body login">
                                <div class="container-login" id="containerlogin">
                                    <div class="form-container sign-up-container">
                                        <div className='form_lg'>
                                            <h1>{I18n.t("Header.Register")}</h1>
                                            <input
                                                id='UserNameRegister'
                                                type="text"
                                                placeholder="Tên tài khoản"
                                                class="form-control input-login mt-2"
                                                value={UserNameRegister}
                                                onChange={(e) => setUserNameRegister(e.target.value)}
                                                ref={UserNameRegisterRef}
                                            />
                                            <input
                                                id='PhoneRegister'
                                                type="number"
                                                placeholder="Số điện thoại"
                                                class="form-control input-login mt-2"
                                                value={PhoneRegister}
                                                onChange={(e) => setPhoneRegister(e.target.value)}
                                                ref={PhoneRegisterRef}
                                            />
                                            <input
                                                id='EmailRegister'
                                                type="text"
                                                placeholder="Email"
                                                class="form-control input-login mt-2"
                                                value={EmailRegister}
                                                onChange={(e) => setEmailRegister(e.target.value)}
                                                ref={EmailRegisterRef}
                                            />
                                            <input
                                                id='AddressRegister'
                                                type="text"
                                                placeholder="Địa chỉ"
                                                class="form-control input-login mt-2"
                                                value={AddressRegister}
                                                onChange={(e) => setAddressRegister(e.target.value)}
                                                ref={AddressRegisterRef}
                                            />
                                            <input
                                                id='PassHideRegister'
                                                type={PassHideRegister}
                                                placeholder="Mật khẩu"
                                                class="form-control input-login"
                                                value={PasswordRegister}
                                                onChange={(e) => setPasswordRegister(e.target.value)}
                                                ref={PassWordRegisterRef}
                                            />

                                            <input
                                                id='PasswordEnterRegister'
                                                type={PassHideEnterRegister}
                                                placeholder="Nhập lại mật khẩu"
                                                class="form-control input-login"
                                                value={PasswordEnterRegister}
                                                onChange={(e) => setPasswordEnterRegister(e.target.value)}
                                                ref={PassWordEnterRegisterRef}
                                            />
                                            <span className='Hidden_pass_Register'
                                                onClick={(e) => { setPassHideRegister(PassHideRegister === "password" ? "text" : "password") }} >
                                                {PassHideRegister === "password" ? <i class="bi bi-eye-slash" style={{ fontSize: '26px' }}></i> : <i class="bi bi-eye" style={{ fontSize: '26px' }}></i>}
                                            </span>
                                            <span className='Hidden_pass_enter_Register'
                                                onClick={(e) => { setPassHideEnterRegister(PassHideEnterRegister === "password" ? "text" : "password") }} >
                                                {PassHideEnterRegister === "password" ? <i class="bi bi-eye-slash" style={{ fontSize: '26px' }}></i> : <i class="bi bi-eye" style={{ fontSize: '26px' }}></i>}
                                            </span>
                                            <button className='mt-2 btform' onClick={e => Shop_spCustomer_Save()} >{I18n.t("Header.Register")}</button>
                                        </div>
                                    </div>
                                    <div class="form-container sign-in-container">
                                        <div className='form_lg'>
                                            <h1 className='mb-2'>{I18n.t("Header.Login")}</h1>
                                            <input
                                                id='UserName'
                                                type="text"
                                                placeholder="Tên đăng nhập"
                                                class="form-control input-login mt-2"
                                                aria-describedby="emailHelp"
                                                value={UserName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                ref={UserNameRef}
                                            />
                                            <input
                                                id='Password'
                                                type={PassHide}
                                                placeholder="Mật khẩu"
                                                class="form-control input-login"
                                                value={Password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                ref={PassWordRef}
                                            />
                                            <span className='Hidden_pass'
                                                onClick={(e) => { setPassHide(PassHide === "password" ? "text" : "password") }}>
                                                {PassHide === "password" ? <i class="bi bi-eye-slash" style={{ fontSize: '26px' }}></i> : <i class="bi bi-eye" style={{ fontSize: '26px' }}></i>}
                                            </span>


                                            <button className='mt-2 btform' onClick={e => Shop_spCustomer_Login()} >{I18n.t("Header.Login")}</button>
                                        </div>
                                    </div>
                                    <div class="overlay-container">
                                        <div class="overlay">
                                            <div class="overlay-panel overlay-left">
                                                <h1>{I18n.t("Login.Welcome")}</h1>
                                                <p>Để tiếp tục, vui lòng đăng nhập bằng thông tin của bạn!</p>
                                                <button class="ghost btform" id="signIn" onClick={e => signInButtonClick()}>{I18n.t("Header.Login")}</button>
                                            </div>
                                            <div class="overlay-panel overlay-right">
                                                <h1>{I18n.t("Login.Hi")}</h1>
                                                <p>Nhập thông tin cá nhân của bạn để đăng ký và bắt đầu trải nghiệm với chúng tôi!</p>
                                                <button class="ghost btform" id="signUp" onClick={e => signUpButtonClick()}>{I18n.t("Header.Register")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 >Giỏ hàng ( {DataCart.length} )</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div class="offcanvas-body">
                    <div className="cart-ctn gap-3">
                        {DataCart.length > 0 &&
                            DataCart.map((e, index) => {
                                const ListImageProduct = e.ImageProduct.split(",")
                                const ImageProduct = LINK_IMAGE + ListImageProduct[0]
                                return (
                                    <div className="cart-item d-flex align-items-center gap-2">
                                        <img
                                            src={ImageProduct}
                                            className="img-fluid cart-image"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                maxHeight: '100px',
                                                maxWidth: '100px',
                                                objectFit: 'cover'
                                            }}
                                            alt="Product"
                                        />
                                        <div className="me-auto">
                                            <div className="text-product">{e.ProductName}</div>
                                            <div className="text-muted cart-price-product" >{e.ProductPrice}</div>
                                            <div className="cart-quantity">
                                                <span>Số lượng</span>
                                                <input
                                                    className="form-control cart-quantity-input"
                                                    type="number"
                                                    value={e.NumberProduct}
                                                    onChange={(event) => handleChangeQuantity(event.target.value, index)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            class="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(e.ProductId)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <hr />
                <div class="offcanvas-header">
                    <div>
                        <h5>Tổng tiền</h5>
                        <div className="cart-price-b">{FormatNumber(totalPrice)}</div>
                    </div>
                    <button type="button" class="custom-btn btn smoothscroll" >Thanh toán</button>
                </div>
            </div>
        </section>
    )
}