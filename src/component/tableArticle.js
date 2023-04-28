import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import Container from "@mui/material/Container";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";


function Table(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(host + "articles/getByArthorId/" + props.id)
      .then((response) => {
        setData(response.data);
        $(document).ready(function () {
          $("#example").DataTable();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.id]);

  const split_year = (date) => {
    if(date){
      const data = date.split("/");
      return data[0];
    }else{
      return "-";
    }
  };

  return (
    <Container maxWidth="xl" fluid className="mb-0 ">
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
                {data.map((document, index) => (
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
                    <td class="text-center">{document.total_citations == null ? '-' : document.total_citations}</td>
                    <td class="text-center">{split_year(document.publication_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Table;
