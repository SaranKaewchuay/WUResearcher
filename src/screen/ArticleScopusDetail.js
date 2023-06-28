import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "articlesScopus/articleId/";

export default function ArticleScopusDetail() {
  const [posts, setPosts] = React.useState([]);
  const [sourceID, setSourceID] = React.useState();
  const [journalName, setJournal] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const fetchJournalNames = async (source_id) => {
    try {
      const response = await axios.get(
        `https://scrap-backend.vercel.app/journal/getBySourceId/${source_id}`
      );
      let journalNames = response.data.map((item) => item.journal_name);
      if (journalNames.length === 0) {
        journalNames = null;
      }
      return journalNames;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseURL}${id}`);
        const journalName = await fetchJournalNames(response.data.source_id);
        setSourceID(response.data.source_id);
        setJournal(journalName);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
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
                <b>{posts.article_name}</b>
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
              {sourceID ? (
                <Link
                  to={`/journal-detail?sourceid=${sourceID}`}
                  className="no-underline color-blue"
                >
                  <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 mt-2">
                      <span className="ubuntu gray color-blue">
                        <b>Journal Name</b>
                      </span>
                    </div>
                    <div className="col-12 col-sm">
                      <p
                        className="ubuntu color-blue"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        {journalName} {" "}  ({sourceID})
                      </p>
                    </div>
                  </div>
                </Link>
              ) : null}

              {Object.entries(posts).map(([key, value], index) => (
                <React.Fragment key={index}>
                  {key !== "_id" &&
                    key !== "name" &&
                    key !== "source_id" &&
                    key !== "author_id" &&
                    key !== "article_name" &&
                    key !== "__v" && (
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
