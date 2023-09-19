import React from "react";
export const Sub_Footer = ({
}) => {
    return (
        <>
            <section class="cta-section section-padding section-bg">
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-center">
                        <div class="row text-center">
                            <div class="col-md-4 b-r-dashed">
                                <a href="/">
                                    <i class="bi bi-clock-history iconsub"></i>
                                    <div>
                                        <p><strong>Tư vấn hỗ trợ</strong></p>
                                        <p className="titesub">Hỗ trợ 24/7 - Đội ngũ hỗ trợ riêng</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4 b-r-dashed">
                                <a href="/">
                                    <i class="bi bi-book iconsub"></i>
                                    <div className="titesub">
                                        <p><strong>Trải nghiệm</strong></p>
                                        <p className="titesub">Miễn phí 30 ngày đầu tiên sử dụng thử</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4">
                                <a href="/">
                                    <i class="bi bi-headset iconsub"></i>
                                    <div>
                                        <p><strong>Dịch vụ</strong></p>
                                        <p className="titesub">Đa dạng hình thức - Uy tín - Nhanh chóng</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
