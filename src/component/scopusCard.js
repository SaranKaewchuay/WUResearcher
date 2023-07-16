import React from "react";
import { Link } from "react-router-dom";
import { CardMedia, Typography } from "@mui/material";


const ScopusCard = ({ post }) => {
  return (
    <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
      <Link
        to={`/authors-scopus-detail?id=${post.author_scopus_id}`}
        className="no-underline"
      >
        <div class="card">
          <div class="card-horizontal">
            <div class="img-square-wrapper">
              <CardMedia
                component="img"
                sx={{
                  pt: "56.25%",
                  borderRadius: "7.5px",
                  padding: "2px",
                  width: "100%",
                  height: "352px",
                  "@media (min-width: 600px)": {
                    width: "120px",
                    height: "100%",
                  },
                }}
                image={"https://img.freepik.com/vetores-premium/avatar-que-veste-um-tampao-da-graduacao-sobre-o-fundo-da-cerceta-ilustracao-vetorial_24877-19950.jpg?w=360"}
                alt={post.name}
              />
            </div>
            <div class="card-body p-4" style={{marginLeft:"25px"}}>
              <h4 className="ubutu color-blue" style={{fontSize:"21px"}}>{post.author_name}</h4>
              <Typography className="ubutu gray" style={{ fontSize: "16px" }}>
              {post.citations} citations by {post.citations_by}
              </Typography>
              
              <div className="d-flex flex-wrap ">
                <div className="border-blue p-2 mt-4 text-center me-1">
                  <span className="color-blue ubutu" style={{fontSize:"14px"}}>
                    <b>Research Articles: </b>
                  </span>
                  <span className="color-blue ubutu" style={{fontSize:"14px"}}>{post.documents} </span>
                </div>
                <div className="border-blue p-2 mt-4 text-center me-1">
                  <div className="text-center">
                    <span className="color-blue ubutu">
                      <b>h-index: </b>
                      <span className="color-blue ubutu">{post.h_index}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScopusCard;
