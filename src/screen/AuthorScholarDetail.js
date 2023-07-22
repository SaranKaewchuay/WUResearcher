import React, { useState, useEffect, useContext } from "react";
import Graph from "../component/graphScholar";
import SubTable from "../component/sub_table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import "../style/loader.css";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

export default function AuthorScholarDetail() {
  const [posts, setPosts] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [subjectArea, setSubjectArea] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [length, setLength] = useState(0);

  console.log("posts = ", posts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get(host + "scholar/author/" + id),
      axios.get(host + `scholar/article/authorId/` + id),
    ])
      .then((response) => {
        setPosts(response[0].data);
        setData(response[0].data.citation_by.table);
        setSubjectArea(response[0].data.subject_area);
        setLength(response[1].data.length);
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

  const split_year = (date) => {
    if (date) {
      const data = date.split("/");
      return data[0];
    } else {
      return "-";
    }
  };

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
            <div className="shadow p-3 mb-5 bg-white rounded">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                  <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <img
                      src={posts.image}
                      className="img-thumbnail"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      alt="post"
                    />
                    <div className="d-flex flex-column align-items-center mt-3">
                      <h5 className="author-name ubutu color-blue" >
                        <b>{posts.author_name}</b>
                      </h5>
                      <br />
                      <h6 className="ubutu gray">{posts.department}</h6>
                      <div className="d-flex flex-wrap justify-content-center">
                        <div className="border-blue p-2 mt-4 text-center me-1">
                          <span className="data-label ubutu color-blue" >
                            <b>Research Articles: </b>
                          </span>
                          <span className="data-value">
                            {length}
                          </span>
                        </div>
                        <div className="border-blue p-2 mt-4 text-center me-1">
                          <div className="text-center">
                            <span className="data-label ubutu color-blue">
                              <b>h-index: </b>
                            </span>
                            <span className="data-value">
                              {data.find((item) => item.h_index)?.h_index?.all}
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
                    <h5 className="ubutu color-blue pb-2 text-center" style={{ fontWeight: "bolder", fontSize: "20px" }}>Catation Graph</h5>
                      <Graph id={id} />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                    {/* <h5 className="ubutu color-blue" style={{ fontWeight: "bolder", fontSize: "20px" }}>Cited by</h5> */}
                      <SubTable id={id} />
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
                        <th className="text-nowrap">Cited By</th>
                        <th className="text-nowrap">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTable.map((document, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              to={`/article-detail?id=${document._id}`}
                              className="no-underline color-blue"
                            >
                              {document.article_name}
                            </Link>
                          </td>
                          <td className="text-center">
                            {document.total_citations == null
                              ? "-"
                              : document.total_citations}
                          </td>
                          <td className="text-center">
                            {split_year(document.publication_date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}