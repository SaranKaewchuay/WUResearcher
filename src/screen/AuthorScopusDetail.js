import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Container from "@mui/material/Container";
import axios from "axios";
import $ from "jquery";
import GraphScopus from "../component/graphScopus";
import "../style/styles.css";
import "../style/loader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const AuthorScopusDetail = () => {
  const [post, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [subjectArea, setSubjectArea] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get(host + "authorsScopus/" + id),
      axios.get(host + `articlesScopus/getByArthorId/` + id),
    ])
      .then(([authorResponse, articlesResponse]) => {
        setPosts(authorResponse.data[0]);
        setSubjectArea(authorResponse.data[0].subject_area);
        setDataTable(articlesResponse.data);
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
            <div className="author-details">
              <div className="shadow p-3 mb-5 bg-white rounded">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded">
                      <img
                        src="https://img.freepik.com/vetores-premium/avatar-que-veste-um-tampao-da-graduacao-sobre-o-fundo-da-cerceta-ilustracao-vetorial_24877-19950.jpg?w=360"
                        style={{ width: "200", height:"auto" }}
                        alt="post"
                      />
                      <div className="d-flex flex-column align-items-center mt-3">
                        <h5 className="author-name ubutu color-blue" >
                          <b>{post.author_name}</b>
                        </h5>
                        <div className="d-flex flex-wrap justify-content-center">
                          <div className="border-blue p-2 mt-4 text-center me-1">
                            <span className="data-label ubutu color-blue" >
                              <b>Research Articles: </b>
                            </span>
                            <span className="data-value">
                              {post.documents}{" "}
                            </span>
                          </div>
                          <div className="border-blue p-2 mt-4 text-center me-1">
                            <div className="text-center">
                              <span className="data-label ubutu color-blue">
                                <b>h-index: </b>
                              </span>
                              <span className="data-value">
                                {post.h_index}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 pr-5 m-0 p-4">
                    <div className="row">
                      <div className="col-12">
                        <GraphScopus />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-12">
                      <h5 className="ubutu color-blue" style={{ fontWeight: "bolder", fontSize: "20px" }}>Subject Area</h5>
                        <div className="d-flex flex-wrap mt-2 text-center me-1 p-1">
                          {subjectArea.map((data) => (
                            <span className="data-value" key={data}> &nbsp; &nbsp;• {data} </span>
                          ))}
                        </div>
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
                            <td class="text-center">{(document.source_type).split("•")[0].trim()}</td>
                        
                            <td class="text-center">{document.publisher == null? "-":document.publisher}</td>
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
};

export default AuthorScopusDetail;