import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  GROUPID} from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
export const Banner = () => {
    const dispatch = useDispatch();
    const [DataSlider, setDataSlider] = useState([]);
    const inforSlider = localStorage.getItem("Web_Infor_Slider_CAK"+GROUPID)
    useEffect(() => {
    
        Shop_spWeb_Slides_List();
    }, []);

    //#region thông tin công ty
    const Shop_spWeb_Slides_List = async () => {
        if (inforSlider !== undefined && inforSlider !== null && inforSlider !== "") {
            let List = JSON.parse(inforSlider)
            setDataSlider(List)
        }
        const pr2 = {
            Domain:'',
            GroupId:GROUPID
        }
        const params2 = {
            Json: JSON.stringify(pr2),
            func: "Shop_spWeb_Slides_List",
        };

        try {
            const result2 = await mainAction.API_spCallServer(params2, dispatch);
            setDataSlider(result2)
            localStorage.setItem("Web_Infor_Slider_CAK"+GROUPID, JSON.stringify(result2));
        } catch (err) {
        }
    };
    //#endregion
    return (
        <>
            <section class="hero-section hero-section-full-height" id="section_20">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12 col-12 p-0">
                            <div id="hero-slide" class="carousel carousel-fade slide" data-bs-ride="carousel">
                                <div class="carousel-inner">

                                    {
                                        DataSlider.map((itm, Key) => {
                                            return (
                                                (
                                                    <div class={Key === 0 ? "carousel-item active" : "carousel-item"}>
                                                        <img src={itm.Links + itm.ImageShow}
                                                            class="carousel-image img-fluid" alt="..." />
                                                        <div class="carousel-caption d-flex flex-column justify-content-end">
                                                            <h1>{itm.Title}</h1>
                                                            <p>{itm.Description}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        })
                                    }
                                </div>

                                <button class="carousel-control-prev" type="button" data-bs-target="#hero-slide"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>

                                <button class="carousel-control-next" type="button" data-bs-target="#hero-slide"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>


    );
};
