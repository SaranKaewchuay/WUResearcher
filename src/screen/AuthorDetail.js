import React, { useState, useEffect } from "react";
import Table from "../component/tableArticle";
import Graph from "../component/graph";
import SubTable from "../component/sub_table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import "../style/loader.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const host = "https://scrap-backend.vercel.app/";

export default function AuthorDetail() {
  const [posts, setPosts] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [subjectArea, setSubjectArea] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("posts = ", posts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  console.log("author_id = ", id);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(host + "authors/" + id)
      .then((response) => {
        setPosts(response.data);
        setData(response.data.citation_by.table);
        setSubjectArea(response.data.subject_area);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const [length, setLength] = useState(0);

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(host + `articles/getByArthorId/` + id)
      .then((response) => {
        setLength(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div style={{marginTop:"110px"}}>
      <div>
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
          <Container maxWidth="xl" className="mb-0 mt-5">
            <div
              class="shadow p-3 mb-5 bg-white rounded"
              style={{ width: "100%", minHeight: "365px" }}
            >
              <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center ">
                  <div
                    class="shadow-sm p-3 mb-5 bg-white rounded"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "330px",
                    }}
                  >
                    <img
                      src={posts.image}
                      class="img-thumbnail"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mt-5 p-2 mx-auto d-block justify-content-center">
                  <h5 class="ubutu color-blue">
                    <b>{posts.author_name}</b>
                  </h5>
                  <br />
                  <h6 class="ubutu gray">{posts.department}</h6>
                  <div class="d-flex flex-wrap ">
                    <div class="border-blue  p-2 mt-4 text-center me-1">
                      <span class=" color-blue ubutu">
                        <b>Research Articles: </b>
                      </span>
                      <span class="color-blue">{length}</span>
                    </div>
                    <div class="border-blue  p-2 mt-4 text-center me-1">
                      <div class="text-center">
                        <span class=" color-blue ubutu">
                          <b>h-index: </b>
                          <span class="color-blue ubutu">
                            {data.find((item) => item.h_index)?.h_index?.all}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex flex-wrap">
                    {subjectArea.map((data) => (
                      <div class="border btn mt-4 text-center me-1 p-1 ">
                        <span class="color-blue ubutu">{data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="col-lg-4 col-md-12 pr-5 m-0 p-4">
                  <div class="row mb-4">
                    <div class="col-12">
                      <SubTable id={id} />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <Graph id={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        )}
        <Table id={id} />
      </div>
    </div>
  );
}
