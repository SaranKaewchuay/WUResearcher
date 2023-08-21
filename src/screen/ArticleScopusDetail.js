import * as React from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import baseApi from "../baseApi/baseApi";
const baseURL = baseApi + "scopus/";

export default function ArticleScopusDetail() {
  const [posts, setPosts] = React.useState([]);
  const [sourceID, setSourceID] = React.useState();
  const [journalName, setJournal] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [corResponding, setCorresponding] = React.useState();
  const [articleUrl, setArticleUrl] = React.useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("eid");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchJournalNames = async (source_id) => {
    try {
      const response = await axios.get(
        `https://scrap-backend.vercel.app/scopus/journal/${source_id}`
      );
      let journalNames = response.data.journal_name
      if (!journalNames) {
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
        const response = await axios.get(`${baseURL}article/${id}`);
        const journalName = await fetchJournalNames(response.data.source_id);
        console.log("response.data.eid : ", response.data.eid);
        try {
          const responseCor = await axios.get(
            `${baseURL}corresponding/${response.data.eid}`
          );
          if (responseCor.status === 200) {
            setCorresponding(responseCor.data);
          }
        } catch (error) {
          console.error(error);
        }
        setSourceID(response.data.source_id);
        setArticleUrl(response.data.url);

        setJournal(journalName);
        setPosts(response.data);
        console.log("response.data == ", response.data);
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
              <div className="row mb-3">
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
                  to={`/journal-detail?sourceId=${sourceID}`}
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
                        {journalName} ({sourceID})
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
                    key !== "__v" &&
                    key !== "author_scopus_id" &&
                    key !== "url" &&
                    value !== "" &&
                    value.length > 0 &&
                    value !== null && (
                      <div className="row">
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                          <span className="ubuntu gray color-blue">
                            <b>
                              {(() => {
                                const formattedKey =
                                  key.charAt(0).toUpperCase() + key.slice(1);
                                return formattedKey.replace(/_/g, " ");
                              })()}
                            </b>
                          </span>
                        </div>
                        <div className="col-xl-10 col-lg-9 col-md-8 col-sm-8">
                          {key === "co_author" ? (
                            <>
                              {Object.entries(value).map(
                                ([key, value], index, arr) => (
                                  <span className="ubuntu" key={index}>
                                    🧑‍🔬
                                    {value.includes("*")
                                      ? value.replace("*", "📧")
                                      : value}
                                    {index !== arr.length - 1 && "   "}
                                    <br />
                                  </span>
                                )
                              )}
                              <p></p>
                            </>
                          ) : key === "co_author_department" ? (
                            <div className="mb-3">
                              {Object.entries(value).map(
                                ([key, val], index, arr) => (
                                  <span className="ubuntu" key={index}>
                                    {val}
                                    {index !== arr.length - 1 && ", "}
                                    <br />
                                  </span>
                                )
                              )}
                            </div>
                          ) : key === "corresponding" ? (
                            <div className="mb-3">
                              {Object.entries(value).map(
                                ([key, val], index, arr) => (
                                  <span className="ubuntu" key={index}>
                                    {val}
                                    {index !== arr.length - 1}
                                    <br />
                                  </span>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="ubuntu">{value}</p>
                          )}
                        </div>
                      </div>
                    )}
                </React.Fragment>
              ))}
              {corResponding && Object.keys(corResponding).length !== 0 ? (
                <div className="row">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                    <span className="ubuntu gray color-blue">
                      <b>Corresponding</b>
                    </span>
                  </div>

                  <div className="col">
                    <span className="ubuntu">
                      {corResponding.correspondingData.map((data, index) => (
                        <div key={index}>
                          <p className="ubuntu">
                            <span role="img" aria-label="scientist">
                              🧑‍🔬{data.corresName}{"  "}({data.corresFullName}),{"  "}
                              {data.address},{data.email}
                            </span>
                          </p>
                        </div>
                      ))}
                      <br />
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                  <Typography variant="body1">
                    <div>
                      <LinkIcon />
                    </div>
                  </Typography>
                </div>

                <div className="mb-3 col">
                  <Typography
                    variant="body1"
                    align="left"
                    className="ubuntu mb-3"
                  >
                    <a
                      href={articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="color-blue"
                    >
                      Read More
                    </a>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
