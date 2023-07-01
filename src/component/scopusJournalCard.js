import React from "react";
import { Link } from "react-router-dom";
import { CardMedia, Typography } from "@mui/material";


const ScopusCard = ({ post }) => {
  return (
    <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
      <Link
        to={`/journal-detail?sourceid=${post.source_id}`}
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
                  height: "450px",
                  "@media (min-width: 600px)": {
                    width: "150px",
                    height: "250px",
                  },
                }}
                image={"https://cdn-icons-png.flaticon.com/512/3235/3235042.png"}
                alt={post.journal_name}
              />
            </div>
            <div class="card-body p-5">
              <h4 className="ubutu color-blue">{post.journal_name}</h4>
              <Typography className="ubutu gray" style={{ fontSize: "17px" }}> 
                Publisher {post.publisher}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScopusCard;