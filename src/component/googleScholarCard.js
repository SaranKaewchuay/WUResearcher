import React from "react";
import { Link } from "react-router-dom";
import {
    CardMedia,
    Typography
  } from "@mui/material";

const GoogleScholarCard = ({ post}) => {
  return (
    <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
      <Link to={`/author-detail?id=${post._id}`} className="no-underline">
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
                  height: "450px",
                  "@media (min-width: 600px)": {
                    width: "150px",
                    height: "200px",
                  },
                }}
                image={post.image}
                alt={post.author_name}
              />
            </div>
            <div class="card-body p-5">
              <h4 className="ubutu color-blue">{post.author_name}</h4>
              <Typography className="ubutu gray" style={{ fontSize: "17px" }}>
                {post.department}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GoogleScholarCard;
