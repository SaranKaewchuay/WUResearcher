import * as React from "react";
import { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";

const baseURL = "http://localhost:8080/articles/articleId/";

const ResponsiveBox = styled(Box)({
  overflow: "auto",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "100%",
  minWidth: "280px",
  width: "90%",
});

export default function Home() {
  const [posts, setPosts] = React.useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  React.useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ResponsiveBox>
      <div>
        <div class="row">
          <div>
            <Container sx={{ py: 8 }} maxWidth="lg">
              <div class="row ml-5">
                <div class="col">
                  <div
                    class="shadow-sm p-3 bg-white rounded mb-3"
                    style={{ width: "100%" }}
                  >
                    <h2 class="some-text blue">
                      <b>{posts.article_name}</b>
                    </h2>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div
                    class="shadow-sm p-5 mb-5 bg-white rounded "
                    style={{ width: "100%", borderRadius: "500px" }}
                  >
                    {Object.entries(posts).map(([key, value], index) => (
                      <div class="row">
                        <div class="col-2">
                          <p
                            class="some-text gray"
                            style={{ textAlign: "right" }}
                          >
                            {
                              key !== "_id" &&
                              key !== "article_name" &&
                              key !== "author_id" &&
                              value !== "" &&
                              key !== "__v" &&
                              key !== "url" ? ( // check if key is not "url"
                                (
                                  key.charAt(0).toUpperCase() + key.slice(1)
                                ).replace("_", " ")
                              ) : key === "url" ? (
                                <Typography variant="body1" align="right">
                                    <LinkIcon />
                                </Typography>
                              ) : null 
                            }
                          </p>
                        </div>
                        <div className="col-10">
                          {key !== "_id" &&
                            key !== "article_name" &&
                            key !== "__v" &&
                            value !== "" &&
                            key !== "author_id" && (
                              <>
                                {key === "author" ? (
                                  <p className="some-text">{value + ", "}</p>
                                ) : key === "url" ? (
                                  <Typography variant="body1" align="left">
                                    <span></span> <span></span> <span></span>
                                    <a
                                      href={value}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      class="color-blue"
                                    >
                                      Read More
                                    </a>
                                  </Typography>
                                ) : (
                                  <p className="some-text">{value}</p>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </ResponsiveBox>
  );
}
