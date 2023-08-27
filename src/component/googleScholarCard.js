import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardMedia, Typography } from "@mui/material";
import axios from "axios";
import baseApi from "../baseApi/baseApi";

const host = baseApi;

const GoogleScholarCard = ({ post }) => {
  // const [length, setLength] = useState(0);
  // useEffect(() => {
  //     axios.get(host + `scholar/article/authorId/${post._id}`)
  //     .then((response) => {
  //       setLength(response.data.length);
  //       console.log(response.data.length)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
      <Link to={`/author-detail?scholar_id=${post.scholar_id}`} className="no-underline" target="_blank">
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
                    height: "185px",
                  },
                }}
                image={post.image}
                alt={post.author_name}
              />
            </div>
            <div class="card-body p-4" style={{marginLeft:"25px"}}>
              <h4 className="ubutu color-blue" style={{ fontSize: "21px" }}>
                {post.author_name}
              </h4>
              <Typography className="ubutu gray" style={{ fontSize: "16px" }}>
                {post.department}
              </Typography>

              <div className="d-flex flex-wrap ">
                <div className="border-blue p-2 mt-4 text-center me-1">
                  <span className="color-blue ubutu" style={{fontSize:"14px"}}>
                    <b>Research Articles: </b>
                  </span>
                  <span
                    className="color-blue ubutu"
                    style={{ fontSize: "14px",padding:"2px"}}
                  >
                    {/* {length} */}
                    {post.documents}
                  </span>
                </div>
                <div className="border-blue p-2 mt-4 text-center me-1">
                  <div className="text-center">
                    <span className="color-blue ubutu">
                      <b>h-index: </b>
                      <span className="color-blue ubutu" style={{ fontSize: "14px",padding:"2px"}}>
                        {/* {post.citation_by.table.find((item) => item.h_index)
                          ?.h_index?.all }  */}
                          {post.h_index} 
                      </span>
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

export default GoogleScholarCard;
