import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "articles/articleId/";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(baseURL + id)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl" style={{ marginTop: "56px" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div class="loader">
            <div></div>

            <div></div>
          </div>
        </div>
      ) : (
        <div class="row">
          <div>
            <div class="row ml-5">
              <div class="col">
                <div
                  class="shadow-sm p-3 bg-white rounded mb-3"
                  style={{ width: "100%" }}
                >
                  <h2 class="ubutu color-blue">
                    <b>{posts.article_name}</b>
                  </h2>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="shadow-sm p-5 mb-5 bg-white rounded ">
                  {Object.entries(posts).map(([key, value], index, arr) => (
                    <div class="row">
                      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                        <span class="ubutu gray color-blue">
                          <b>
                            {key !== "_id" &&
                            key !== "article_name" &&
                            key !== "author_id" &&
                            value !== "" &&
                            key !== "__v" &&
                            key !== "url" ? (
                              (
                                key.charAt(0).toUpperCase() + key.slice(1)
                              ).replace("_", " ")
                            ) : key === "url" ? (
                              <Typography variant="body1">
                                <div>
                                  <LinkIcon />
                                </div>
                              </Typography>
                            ) : null}
                          </b>
                        </span>
                      </div>
                      <div class="col-xl-10 col-lg-9 col-md-8 col-sm-8">
                        <span>
                          {key !== "_id" &&
                            key !== "article_name" &&
                            key !== "__v" &&
                            value !== "" &&
                            key !== "author_id" && (
                              <>
                                {key === "authors" ? (
                                  <>
                                    {Object.entries(value).map(
                                      ([key, value], index, arr) => (
                                        <span className="ubutu">
                                          {value}
                                          {index === arr.length - 1
                                            ? " "
                                            : ", "}
                                        </span>
                                      )
                                    )}
                                    <p></p>
                                  </>
                                ) : key === "url" ? (
                                  <Typography
                                    variant="body1"
                                    align="left"
                                    class="ubutu"
                                  >
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
                                  <p className="ubutu">{value}</p>
                                )}
                              </>
                            )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
