import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "../style/styles.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Typography } from "@mui/material";
import journal from "../json/Scopus_Journal";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "articles/articleId/";

export default function JournalDetail() {
  const [journalData, setJournal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    $(document).ready(function () {
      $("#example").DataTable();
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  // React.useEffect(() => {
  //   setIsLoading(true);

  //   setJournal(journal[0]);

  //   console.log("journal = ", journal[0]);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <div style={{ marginTop: "110px" }}>
      <React.Fragment>
        <Container maxWidth="xl" className="mb-0 mt-5">
          <div
            className="shadow p-3 bg-white rounded mb-3"
            style={{ width: "100%" }}
          >
            <h2 className="ubuntu color-blue">
              <b>Source Details</b>
            </h2>
          </div>
          <div
            className="shadow p-3 mb-3 bg-white rounded"
            style={{ width: "100%", minHeight: "365px" }}
          >
            <div className="p-2">
              <p className="color-blue ubutu m-0" style={{ fontSize: "24px" }}>
                IOP Conference Series: Earth and Environmental Science
              </p>
            </div>
            <div className="p-2 ">
              <span className="color-blue ubutu" style={{ fontSize: "16px" }}>
                <b>Scopus coverage years: </b>
              </span>
              <span className="ubutu" style={{ fontSize: "16px" }}>
                from 2010 to Present
              </span>
            </div>
            <div className="p-2 m-0">
              <span className="color-blue ubutu" style={{ fontSize: "16px" }}>
                <b>ISSN: </b>
              </span>
              <span className="ubutu" style={{ fontSize: "16px" }}>
                1755-1307{" "}
              </span>
            </div>
            <div className="p-2 m-0">
              <span className="color-blue ubutu" style={{ fontSize: "16px" }}>
                <b>E-ISSN: </b>
              </span>
              <span className="ubutu" style={{ fontSize: "16px" }}>
                1755-1315
              </span>
            </div>

            <div className="p-2 m-0">
              <div className="row">
                <div className="col-12 col-md-1">
                  <span
                    className="color-blue ubutu"
                    style={{ fontSize: "16px" }}
                  >
                    <b>Subject Area:</b>
                  </span>
                </div>
                <div className="col-12 col-md">
                  <div className="d-flex flex-wrap m-0">
                    <div className="border btn mt-4 text-center me-1 p-1">
                      <span className="color-blue ubutu">
                        Earth and Planetary Sciences: General Earth and
                        Planetary Sciences
                      </span>
                    </div>
                    <div className="border btn mt-4 text-center me-1 p-1">
                      <span className="color-blue ubutu">
                        Environmental Science: General Environmental Science
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 m-0">
              <span className="color-blue ubutu" style={{ fontSize: "16px" }}>
                <b>Source type: </b>
              </span>
              <span className="ubutu" style={{ fontSize: "16px" }}>
                Conference Proceeding
              </span>
            </div>
          </div>
        </Container>

        <Container maxWidth="xl">
          <div
            className="shadow p-3 mb-5 bg-white rounded"
            style={{ width: "100%", minHeight: "365px" }}
          >
            <div className="row">
              <div className="col-12 col-md-1 p-3 pt-2">
                <p
                  className="color-blue ubutu"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  CiteScore
                </p>
              </div>
              <div className="col-12 col-md">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ maxWidth: "50%", height: "auto" }}
                >
                  <option value="1">2022</option>
                  <option value="2">2021</option>
                  <option value="3">2020</option>
                  <option value="3">2019</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="border btn text-center col-12 col-sm-6 col-md-4 col-lg-3 m-1 mb-3 p-0">
                <p
                  className="color-blue ubutu p-0"
                  style={{ fontSize: "40px" }}
                >
                  0.99
                </p>
              </div>
            </div>

            <div className="table-responsive">
              <table id="example" className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-nowrap">#</th>
                    <th className="text-nowrap">Category</th>
                    <th className="text-nowrap">Sub Category</th>
                    <th className="text-nowrap">Rank</th>
                    <th className="text-nowrap">Percentile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Earth and Planetary Sciences</td>
                    <td>General Earth and Planetary Sciences</td>
                    <td>#150/192</td>
                    <td>22nd</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Environmental Science</td>
                    <td>General Environmental Science</td>
                    <td>#182/227</td>
                    <td>20th</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Earth and Planetary Sciences</td>
                    <td>General Earth and Planetary Sciences</td>
                    <td>#150/192</td>
                    <td>22nd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}
