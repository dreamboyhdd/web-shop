
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GROUPID } from "../../Services/Api";
export const Social = () => {
    const dispatch = useDispatch();
    const [Hotline, setHotline] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [KeyShowIconFB, setKeyShowIconFB] = useState('');

    useEffect(() => {
        Shop_spWeb_Setting_List();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    //#region thông tin web
    const Shop_spWeb_Setting_List = async () => {
        const infor = localStorage.getItem("Web_Infor_Setting_CAK_" + GROUPID)
        if (infor !== undefined && infor !== null && infor !== "") {

            const result2 = JSON.parse(infor);
            let Hotline = (result2.find(e => e.KeySetting === "Hotline")).DataSetting;
            setHotline(Hotline);

            //Ẩn hiên FB
            let KeyShowIconFB = (result2.filter(e => e.KeySetting === "KeyShowIconFB"))[0].DataSetting;
            setKeyShowIconFB(KeyShowIconFB);
          
            //Ẩn hiện zalo
            let KeyShowIconZalo = (result2.filter(e => e.KeySetting === "KeyShowIconZalo"))[0].DataSetting;
            if (KeyShowIconZalo !== 'C') {
                document.getElementsByClassName('zalo-chat-widget')[0].style.display = 'none'
            }
            else {
                document.getElementsByClassName('zalo-chat-widget')[0].style.display = 'block'
            }

        }
    };
    //#endregion

    //#region croll
    const handleScroll = () => {
        if (window.scrollY > 1000) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };
    //#endregion

    
    return (
        <div className="social-container">
            {
                KeyShowIconFB !== ""
                &&
                <div className="social-buttons" >
                    <a href={KeyShowIconFB} target="blank"
                        title="Facebook"
                        className="fbicon"><img className="social-button" src="https://mediaimages.vps.vn/Product/2023/082023/12/messenger-icon.png" alt="facebook" /></a>
                </div>
            }
            <div className="social-buttons">
                {
                    Hotline.indexOf('-') !== -1
                        ? Hotline.split('-').map((item, key) => {
                            return (
                                item !== "" ?
                                    <a className={key === 0 ? "iconphone" : key === 1 ? "iconphone1" : "iconphone2"}
                                        href={"tel:" + item.replaceAll(" ", "")}
                                        title={"HotLine" + (key + 1)}
                                    >
                                        <i class="bi bi-telephone">
                                        </i>
                                    </a>
                                    : <></>
                            )
                        })
                        :
                        <a className="iconphone"
                            title="HotLine"
                            href={"tel:" + Hotline}>
                            <i class="bi bi-telephone">
                            </i>
                        </a>
                }



            </div>
            {showButton && (
                <div className="social-buttons"
                    onClick={() => {
                        window.scrollTo({
                            top: -90,
                        });
                    }
                    }
                >
                    <a className="iconsrolltop" title="Lên đầu trang"><i class="bi bi-arrow-up-circle"></i></a>
                </div>
            )}
        </div>
    );

};
