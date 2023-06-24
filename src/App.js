import * as React from "react";

import Footer from "./component/copyrigh";
import Nav from "./component/nav";
import Home from "./screen/home";
import AuthorDetail from "./screen/AuthorDetail";
import ArticleDetail from "./screen/ArticleDetail";
import ArticleScopusDetail from "./screen/ArticleScopusDetail";
import AuthorScopusDetail from "./screen/AuthorScopusDetail";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MyApp() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/author-detail/" element={<AuthorDetail />} />
          <Route path="/article-detail/" element={<ArticleDetail />} />
          <Route path="/article-scopus-detail/" element={<ArticleScopusDetail/>} />
          <Route path="/authors-scopus-detail/" element={<AuthorScopusDetail/>} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
