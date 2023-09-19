import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useInput } from "../Hooks";
import { mainAction } from "../Redux/Actions";
import {
  Alerterror,
  Alertsuccess,
  Alertwarning,
  FormatDateJson,
  FormatMoney,
} from "../Utils";
import { SelectWeight } from "../Common";
import I18n from "../Language";
import ReactHtml from "raw-html-react";
import { Alert } from "reactstrap";
import ChatLayout from "../Layout/ChatLayout";

const LoadingPageComp = () => {
    const [MobileHeight, setMobileHeight] = useState(800);
    useEffect(() => {
       
          setMobileHeight(window.innerHeight);
        }
      , []);        
    return(
      
      <div className="content" style={{alignItems:"center",backgroundColor:"#20212C" ,justifyContent:"center"}}>
      <img
        // src="https://i.pinimg.com/originals/d0/fe/e4/d0fee4efd20303b651fb1dd6dfff73b7.gif"
        src="../Assets/img/loading.gif"
        alt="Customer"
        href="#"
        style={{ width: "100%", height: "100%" , marginTop:"100%"}}
      />

      <div
        className="card-footer bg-transparent border-0 "
        style={{ width: "100%", position: "fixed",bottom: "0px",backgroundColor:"#20212C" }}
      >
        <div
          class="form-group chat-input-group "
          style={{ marginBottom: "0px",backgroundColor:"#20212C"  }}
        >
          <div class="input-group" style={{backgroundColor:"#20212C"}}>
            <input
              id="ad"
              type="text"
             
              placeholder={I18n.t("Chat.InputMessage")}
              style={{ color: "green" }}
             
              className="form-control input-send"
              disabled
            />
            <div class="input-group-append" style={{backgroundColor:"#20212C"}}>
              <button
                type="button"
                class="btn btn-success"
                // onClick={(e) => clickSearch(Chatvalue)}
                // disabled
              >
                {I18n.t("Chat.Send")}
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    )
    };
    export const LoadingPage = React.memo(LoadingPageComp);
