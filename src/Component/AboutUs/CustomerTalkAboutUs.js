import React, { useEffect, useState } from "react";
import I18n from '../../Language';

export const CustomerTalkAboutUs = ({

}) => {

    return (

        <section class="testimonial-section section-padding section-bg">
            <div class="container">
                <div class="row">

                    <div class="col-lg-8 col-12 mx-auto">
                        <h2 class="mb-lg-3">{I18n.t("Other.Happycustomers")}</h2>

                        <div id="testimonial-carousel" class="carousel carousel-fade slide" data-bs-ride="carousel">

                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="carousel-caption">
                                        <h4 class="carousel-title">Đội ngũ nhân viên tư vấn, hỗ trợ nhiệt tình ...</h4>

                                        <small class="carousel-name"><span class="carousel-name-title">Khách Hàng</span>,
                                            036***6221</small>
                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <div class="carousel-caption">
                                        <h4 class="carousel-title">Sản phẩm, giao diện rất đa dạng, khá ưng ý! </h4>

                                        <small class="carousel-name"><span class="carousel-name-title">Khách Hàng</span>,
                                        037***65674</small>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="carousel-caption">
                                        <h4 class="carousel-title">Dịch vụ , chất lượng , trải nghiệm rất tốt ... </h4>

                                        <small class="carousel-name"><span class="carousel-name-title">Khách Hàng</span>,
                                        036***5467</small>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="carousel-caption">
                                        <h4 class="carousel-title">Giá cả hợp lý , đáp ứng tốt các yêu cầu của tôi! </h4>

                                        <small class="carousel-name"><span class="carousel-name-title">Khách Hàng</span>,
                                        036***5781</small>
                                    </div>
                                </div>



                                <ol class="carousel-indicators">
                                    <li data-bs-target="#testimonial-carousel" data-bs-slide-to="0" class="active" aria-current="true">
                                        <img src="https://mediaimages.vps.vn/Product/2023/082023/12/customrhappy.jpg" class="img-fluid rounded-circle avatar-image" alt="avatar" />
                                    </li>

                                    <li data-bs-target="#testimonial-carousel" data-bs-slide-to="1" class="">
                                        <img src="https://mediaimages.vps.vn/Product/2023/082023/12/customrhappy.jpg" class="img-fluid rounded-circle avatar-image" alt="avatar" />
                                    </li>

                                    <li data-bs-target="#testimonial-carousel" data-bs-slide-to="2" class="">
                                        <img src="https://mediaimages.vps.vn/Product/2023/082023/12/customrhappy.jpg" class="img-fluid rounded-circle avatar-image" alt="avatar" />
                                    </li>

                                    <li data-bs-target="#testimonial-carousel" data-bs-slide-to="3" class="">
                                        <img src="https://mediaimages.vps.vn/Product/2023/082023/12/customrhappy.jpg" class="img-fluid rounded-circle avatar-image" alt="avatar" />
                                    </li>
                                </ol>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

