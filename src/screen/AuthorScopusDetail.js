import React, { useState, useEffect, useContext } from "react";
import GraphScopus from "../component/graphScopus";

import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import "../style/loader.css";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { post } from "jquery";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

export default function AuthorScopusDetail() {
  const [post, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [subjectArea, setSubjectArea] = React.useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get(host + "authorsScoupus/" + id),
      axios.get(host + `articlesScopus/getByArthorId/` + id),
    ])
      .then((response) => {
        setPosts(response[0].data);
        setSubjectArea(response[0].data.subject_area);
        setDataTable(response[1].data);
        setIsLoading(false);
        $(document).ready(function () {
          $("#example").DataTable();
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div style={{ marginTop: "110px" }}>
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
        <div>
          <Container maxWidth="xl" className="mb-0 mt-5">
            <div>
              <div
                className="shadow p-3 mb-5 bg-white rounded"
                style={{ width: "100%", minHeight: "365px" }}
              >
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                    <div
                      className="shadow-sm p-3 mb-5 bg-white rounded"
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                        height: "330px",
                      }}
                    >
                      <img
                        src="https://img.freepik.com/vetores-premium/avatar-que-veste-um-tampao-da-graduacao-sobre-o-fundo-da-cerceta-ilustracao-vetorial_24877-19950.jpg?w=360"
                        className="img-thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        alt="post"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12 mt-3 p-2 mx-auto d-flex flex-column align-items-center">
                    <h5 className="ubutu color-blue">
                      <b>{post.author_name}</b>
                    </h5>
                    <br />
                    <div className="d-flex flex-wrap justify-content-center">
                      <div className="border-blue p-2 mt-4 text-center me-1">
                        <span className="color-blue ubutu">
                          <b>Research Articles: </b>
                        </span>
                        <span className="color-blue ubutu">
                          {post.documents}{" "}
                        </span>
                      </div>
                      <div className="border-blue p-2 mt-4 text-center me-1">
                        <div className="text-center">
                          <span className="color-blue ubutu">
                            <b>h-index: </b>
                            <span className="color-blue ubutu">
                              {post.h_index}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                      {subjectArea.map((data) => (
                        <div
                          className="border btn mt-4 text-center me-1 p-1"
                          key={data}
                        >
                          <span className="color-blue ubutu">{data}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 pr-5 m-0 p-1">
                    <div className="row">
                      <div className="col-12">
                        <GraphScopus />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow p-4 mb-5 bg-white rounded table-responsive">
                <Row>
                  <Col>
                    <table id="example" className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-nowrap">#</th>
                          <th className="text-nowrap">Document title</th>
                          <th className="text-nowrap">Document Type</th>
                          <th className="text-nowrap">Source Type</th>
                          <th className="text-nowrap">Publisher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataTable.map((document, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Link
                                to={`/article-scopus-detail?id=${document._id}`}
                                className="no-underline color-blue"
                              >
                                {document.article_name}
                              </Link>
                            </td>
                            <td class="text-center">
                              {document.document_type}
                            </td>
                            <td class="text-center">{document.source_type}</td>
                            <td class="text-center">{document.publisher}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
