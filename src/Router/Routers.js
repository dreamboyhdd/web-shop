import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "../Component/Main";
import { Product, ProductDetail } from "../Component/Products";
import { Footer, Header, Nav, NotFound, Social, Sub_Footer } from "../Component/Template";
import { ContactPage } from "../Component/Contacts";
import { AboutUsPage } from "../Component/AboutUs";
import { ServicePage, ServiceDetailPage } from "../Component/Services";
import { NewsPage, NewsDetailPage } from "../Component/News";
import { RecruitmentPage, RecruitmentDetailPage } from "../Component/Recruitment";
import React from "react";
export const Routers = () => {
  return (
    <BrowserRouter>
       <Route path="/" component={Header} /> 
       <Route path="/" component={Nav} />
      <Switch>
      <Route path="/dich-vu" component={ServicePage} />
        <Route path="/chi-tiet-dich-vu/:ServiceId" component={ServiceDetailPage} />
        <Route path="/gioi-thieu" component={AboutUsPage} />
        <Route path="/lien-he" component={ContactPage} />
        <Route exact path="/san-pham" component={Product} />
        <Route exact path="/chi-tiet-san-pham/:ProductId" component={ProductDetail} />
        <Route exact path="/tin-tuc" component={NewsPage} />
        <Route exact path="/chi-tiet-tin-tuc/:NewsId" component={NewsDetailPage} />
        <Route exact path="/tuyen-dung" component={RecruitmentPage} />
        <Route exact path="/chi-tiet-tuyen-dung/:CareerId" component={RecruitmentDetailPage} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Route path="/" component={Footer} />
      <Route path="/" component={Social} />
    </BrowserRouter>
  );
};
