import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";
import journal from "../json/Scopus_Journal";
import authors from "../json/Scopus_Author";
import { Link } from "react-router-dom";
const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "articles/articleId/";

export default function ArticleScopusDetail() {
  const [posts, setPosts] = React.useState([]);
  const [journalName, setJournal] = React.useState();

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("id");

  React.useEffect(() => {
    setIsLoading(true);
    const authorsData = authors.filter(
      (item) => item.name.split(",")[0] === name
    );

    setPosts(authorsData.length > 0 ? authorsData[0].articles[0] : null);
    setJournal(journal[0].journal_name);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // React.useEffect(() => {
  //   setIsLoading(true);

  //   axios
  //     .get(baseURL + id)
  //     .then((response) => {
  //       setPosts(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // }, []);

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
          <div className="loader">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col" key={posts.id}>
            <div
              className="shadow-sm p-3 bg-white rounded mb-3"
              style={{ width: "100%" }}
            >
              <h2 className="ubuntu color-blue">
                <b>{posts.name}</b>
              </h2>
            </div>

            <div className="shadow-sm p-5 mb-5 bg-white rounded">
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                  <span className="ubuntu gray color-blue">
                    <b>Article Source</b>
                  </span>
                </div>
                <div className="col">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png"
                    style={{ width: "95px", height: "auto" }}
                    alt="Scopus Logo"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 mt-2">
                  <span className="ubuntu gray color-blue">
                    <b>Journal Name</b>
                  </span>
                </div>
                <div className="col-12 col-sm">
                  <Link
                    to={`/journal-detail?sourceid=test11122`}
                    className="no-underline color-blue"
                  >
                    <p
                      className="ubuntu color-blue"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        textDecoration: "underline",
                      }}
                    >
                      {journalName}
                    </p>
                  </Link>
                </div>
              </div>

              {Object.entries(posts).map(([key, value], index) => (
                <React.Fragment key={index}>
                  {key !== "id" && key !== "name" && (
                    <div className="row">
                      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                        <span className="ubuntu gray color-blue">
                          <b>
                            {(
                              key.charAt(0).toUpperCase() + key.slice(1)
                            ).replace("_", " ")}
                          </b>
                          {key === "url" && (
                            <Typography variant="body1">
                              <div>
                                <LinkIcon />
                              </div>
                            </Typography>
                          )}
                        </span>
                      </div>
                      <div className="col-xl-10 col-lg-9 col-md-8 col-sm-8">
                        {key === "co_author" ? (
                          <>
                            {Object.entries(value).map(
                              ([key, value], index, arr) => (
                                <span className="ubuntu" key={index}>
                                  {value}
                                  {index !== arr.length - 1 && " | "}
                                </span>
                              )
                            )}
                            <p></p>
                          </>
                        ) : key === "url" ? (
                          <Typography
                            variant="body1"
                            align="left"
                            className="ubuntu"
                          >
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="color-blue"
                            >
                              Read More
                            </a>
                          </Typography>
                        ) : (
                          <p className="ubuntu">{value}</p>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
