import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { mainAction } from "../Redux/Actions";
import { Alertsuccess, Alertwarning, FormatDateJson,} from "../Utils";
import { APIKey } from "../Services";
import { useLocation } from "react-router-dom";


const ConfirmComp = ({ }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [Data, setData] = useState([]);

    useEffect(() => {
        if (location.search !== "" && location.search.indexOf("v=") !== -1) {
            let _params = location.search
                .replace("?", "")
                .split("&")
                .find((p) => p.indexOf("v=") !== -1);
            let ID =
                ((_params.split("v=")[1])
                    .replace("{", "")
                    .replace("}", "")
                )
            CPN_spLading_Recipient_Confirm_Deadline_ListById(ID);
        }
    }, []);


    //#region show info
    const CPN_spLading_Recipient_Confirm_Deadline_ListById = async (Id) => {
        const pr = {
            IdDeadline: Id
        }
        const params = {
            ApiKey: APIKey,
            Json: JSON.stringify(pr),
            func: "CPN_spLading_Recipient_Confirm_Deadline_ListById"
        }
        const result = await mainAction.API_spCallServerSystem(params, dispatch);
        console.log(result);
        if (result.length > 0) {
            setData(result);
            CPN_spRecipient_Confirm_Deadline_ByCustomer(Id);
        }
        else
        {
            setData([]);  
            Alertwarning('Không có vận đơn cần xác nhận ngày phát mới!');
        }
    }
    //#endregion

    //#region xác nhận
    const CPN_spRecipient_Confirm_Deadline_ByCustomer = async (Id) => {
        const pr = {
            IdDeadline: Id
        }
        const params = {
            ApiKey: APIKey,
            Json: JSON.stringify(pr),
            func: "CPN_spRecipient_Confirm_Deadline_ByCustomer"
        }
        const result = await mainAction.API_spCallServerSystem(params, dispatch);
        console.log(result);
        if (result.Status === 'OK') {
            Alertsuccess('Xác nhận thành công!');
        }
    }
    //#endregion

    return (
        <div className="content-404 ConfirmDeadline fullbg">
            <div className="container cont-box">
                {Data.length > 0 ?
                    <div class="card-body Loginform cfdl">
                        <div class="wrapper">
                            <img src="https://admin-netco.vps.vn//Image/ckfinder/files/logoNew.png" alt="NETCO POST"></img>
                            <div class="table premium">
                                <div class="ribbon"><span>{Data[0].Source}</span></div>
                                <div class="price-section">
                                    <div class="price-area">
                                        <div class="inner-area">
                                            {/*  <span class="text">Tổng bill</span>  */}
                                            <span class="price">{Data[0].TotalLading}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="package-name">
                                    <span>Ngày phát : {FormatDateJson(Data[0].Deadline, 1)}</span>
                                </div>
                                <ul class="features">
                                    {
                                        Data.map(item => {
                                            return (
                                                <li>
                                                    <span class="list-name">{item.LadingCode} : {item.CitySendCode} - {item.CityRecipientCode}</span>
                                                    <span class="icon check"><i class="fas fa-check"></i></span>
                                                </li>
                                            )
                                        })
                                    }



                                </ul>
                                {/*   <div class="btn" onClick={e => CPN_spRecipient_Confirm_Deadline_ByCustomer(Data[0].Id)}><button>Xác nhận ngày phát mới</button></div> */}
                            </div>

                        </div>
                    </div>
                    :
                    <div class="card-body Loginform cfdl">
                        <div class="wrapper">
                            <img src="https://admin-netco.vps.vn//Image/ckfinder/files/logoNew.png" alt="NETCO POST"></img>
                            <div class="table premium">
                                <div class="ribbon"><span></span></div>
                                <div class="price-section">
                                    <div class="price-area">
                                        <div class="inner-area">
                                            <span class="price">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="package-name">
                                </div>
                                <ul class="features">
                                    <li>Link không hợp lệ. Vui lòng kiểm tra lại thông tin! </li>

                                </ul>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export const Confirm = React.memo(ConfirmComp);
