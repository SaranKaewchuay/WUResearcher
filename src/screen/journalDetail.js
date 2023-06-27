import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useLocation } from "react-router-dom";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "journal/getBySourceId/";

export default function JournalDetail() {
  const [journalData, setJournal] = useState([]);
  const [citeSource, setCiteSource] = useState([]);
  const [citeSourceData, setCiteSourceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source_id = queryParams.get("sourceid");

  const handleSelectYear = (selectedYear) => {
    const filteredData = citeSource.filter(
      (data) => data.year === selectedYear
    );
    setCiteSourceData(filteredData);
    $(document).ready(function () {
      $("#example").DataTable();
    });
  };
  React.useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(`${baseURL}${source_id}`)
        .then((response) => {
          setJournal(response.data);
          setCiteSource(response.data[0].cite_source);
          setIsLoading(false);

          const filteredData = response.data[0].cite_source.filter(
            (data, index) => index === 0
          );
          setCiteSourceData(filteredData);
          $(document).ready(function () {
            $("#example").DataTable();
          });
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };

    fetchData();
  }, [source_id]);

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
        <>
          {journalData.map((data) => (
            <React.Fragment key={data.journal_name}>
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
                    <p
                      className="color-blue ubutu m-0"
                      style={{ fontSize: "26px",fontWeight:"bolder" }}
                    >
                      {data.journal_name}
                    </p>
                  </div>
                  <div className="p-2 ">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <b>Scopus coverage years: </b>
                    </span>
                    <span className="ubutu" style={{ fontSize: "16px" }}>
                      {data.scopus_coverage_years}
                    </span>
                  </div>
                  <div className="p-2 m-0">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <b>ISSN: </b>
                    </span>
                    <span className="ubutu" style={{ fontSize: "16px" }}>
                      {data.issn}
                    </span>
                  </div>
                  <div className="p-2 m-0">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <b>E-ISSN: </b>
                    </span>
                    <span className="ubutu" style={{ fontSize: "16px" }}>
                      {data.eissn}
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
                          {data.subject_area.map((subjectArea) => (
                            <div
                              className="border btn mt-4 text-center me-1 p-1"
                              key={subjectArea}
                            >
                              <span className="ubutu">
                                {subjectArea}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 m-0">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <b>Source type: </b>
                    </span>
                    <span className="ubutu" style={{ fontSize: "16px" }}>
                      {data.source_type}
                    </span>
                  </div>
                </div>
              </Container>
            </React.Fragment>
          ))}

          <Container maxWidth="xl">
            <div
              className="shadow p-3 mb-5 bg-white rounded"
              style={{ width: "100%", minHeight: "365px" }}
            >
              <div className="row">
                <div className="col-12 col-md-1 pt-2">
                  <p
                    className="color-blue ubutu"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    CiteScoreYear
                  </p>
                </div>
                <div className="col-12 col-md">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ maxWidth: "20%", height: "auto" }}
                    onChange={(event) => handleSelectYear(event.target.value)}
                  >
                    {citeSource.map((data) => (
                      <option value={data.year} key={data.year}>
                        {data.year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {citeSourceData.map((data) => (
                <React.Fragment key={data.year}>
                  <div className="row">
                    <div className="col-2">
                      <p
                        className="color-blue ubuntu p-0"
                        style={{ fontSize: "40px" }}
                      >
                        CiteScore
                      </p>
                    </div>
                    <div className="border btn text-center col-12 col-sm-6 col-md-4 col-lg-3 m-1 mb-3 p-0">
                      <p
                        className="color-blue ubuntu p-0"
                        style={{ fontSize: "40px" }}
                      >
                        {data.citation}
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
                        {data.category.map((category, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{category.category_name}</td>
                            <td>{category.sub_category}</td>
                            <td>{category.rank}</td>
                            <td>{category.percentile}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}
