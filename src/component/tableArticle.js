import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import Container1 from "@mui/material/Container";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

function Table(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dull-tan-dove-hose.cyclic.app/articles/getByArthorId/" + props.id)
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
    const data = date.split("/");
    return data[0];
  };

  return (
    <Container1 fluid className="mb-0 mt-5">
      <div className="shadow p-4 mb-5 bg-white rounded">
        <Row>
          <Col>
            <table id="example" className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Document title</th>
                  <th>Cited By</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {data.map((document, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/article-detail?id=${document._id}`}
                        className="no-underline blue"
                      >
                        {document.article_name}
                      </Link>
                    </td>
                    <td>{document.total_citations}</td>
                    <td>{split_year(document.publication_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </Container1>
  );
}

export default Table;
