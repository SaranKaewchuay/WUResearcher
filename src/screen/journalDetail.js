import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../style/styles.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "scopus/journal/";

function JournalDetail() {
  const [journalData, setJournalData] = useState([]);
  const [changeJournalData, setChangeJournalData] = useState([]);
  const [citeSource, setCiteSource] = useState([]);
  const [citeSourceData, setCiteSourceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCiteScore, setIsLoadingCiteScore] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source_id = queryParams.get("sourceid");

  const handleSelectYear = (selectedYear) => {
    setIsLoadingCiteScore(true);
    const filteredData = citeSource.filter(
      (data) => data.year === selectedYear
    );
    setCiteSourceData(filteredData);

    setTimeout(() => {
      setIsLoadingCiteScore(false);
      $(document).ready(function () {
        $("#example").DataTable();
      });
    }, 400);
  };

  const fetchData = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}${id}`);
      console.log("response ", response.data);
      const data = response.data;
      setJournalData(data);
      setCiteSource(data[0].cite_source);
      setIsLoading(false);

      if (data[0].changeJournal) {
        const changeJournalSourceId = data[0].changeJournal.source_id;
        const changeJournalResponse = await axios.get(
          `${baseURL}${changeJournalSourceId}`
        );
        setChangeJournalData(changeJournalResponse.data[0]);
      }
      if (data[0].cite_source != null) {
        const filteredData = data[0].cite_source.filter(
          (_, index) => index === 0
        );
        setCiteSourceData(filteredData);
      } else {
        setCiteSourceData(null);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(source_id);
  }, [source_id]);

  useEffect(() => {
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, [citeSourceData]);

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
          {journalData.map((journal) => (
            <React.Fragment key={journal.journal_name}>
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
                      style={{ fontSize: "26px", fontWeight: "bolder" }}
                    >
                      {journal.journal_name}
                    </p>
                  </div>
                  {journal.changeJournal && changeJournalData && (
                    <div className="p-2">
                      <span
                        className="color-blue ubuntu"
                        style={{ fontSize: "16px" }}
                      >
                        <div>
                          <b>{journal.changeJournal.field}: </b>

                          <Link
                            to={`/journal-detail?sourceid=${changeJournalData.source_id}`}
                            className="no-underline"
                            rel="noopener noreferrer"
                          >
                            <span
                              className="ubuntu"
                              style={{ fontSize: "16px" }}
                            >
                              {changeJournalData.journal_name}
                            </span>
                          </Link>
                        </div>
                      </span>
                    </div>
                  )}
                  {journal.scopus_coverage_years && (
                    <div className="p-2 ">
                      <span
                        className="color-blue ubutu"
                        style={{ fontSize: "16px" }}
                      >
                        <div>
                          <b>Scopus coverage years: </b>
                          <span className="ubutu" style={{ fontSize: "16px" }}>
                            {journal.scopus_coverage_years}
                          </span>
                        </div>
                      </span>
                    </div>
                  )}
                  {journal.issn && (
                    <div className="p-2 m-0">
                      <span
                        className="color-blue ubutu"
                        style={{ fontSize: "16px" }}
                      >
                        <div>
                          <b>ISSN: </b>
                          <span className="ubutu" style={{ fontSize: "16px" }}>
                            {journal.issn}
                          </span>
                        </div>
                      </span>
                    </div>
                  )}
                  {journal.eissn ? (
                    <div className="p-2 m-0">
                      <span
                        className="color-blue ubutu"
                        style={{ fontSize: "16px" }}
                      >
                        <div>
                          {" "}
                          <b>E-ISSN: </b>
                          <span className="ubutu" style={{ fontSize: "16px" }}>
                            {journal.eissn}
                          </span>
                        </div>
                      </span>
                    </div>
                  ) : null}

                  {journal.subject_area && journal.subject_area.length > 0 && (
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
                            {journal.subject_area.map((subjectArea) => (
                              <div
                                className="border btn mt-4 text-center me-1 p-1"
                                key={subjectArea}
                              >
                                <span className="ubutu">{subjectArea}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-2 m-0">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <b>Source type: </b>
                    </span>
                    <span className="ubutu" style={{ fontSize: "16px" }}>
                      {journal.source_type}
                    </span>
                  </div>
                </div>
              </Container>
            </React.Fragment>
          ))}
          {citeSourceData &&
            Array.isArray(citeSourceData) &&
            citeSourceData.length > 0 &&
            citeSource !== null && (
              <Container maxWidth="xl">
                <div
                  className="shadow p-3 mb-5 bg-white rounded"
                  style={{ width: "100%", minHeight: "365px" }}
                >
                  <div >
                    {isLoadingCiteScore ? (
                      // Show loading message or spinner if isLoading is true
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "365px",
                        }}
                      >
                        <div className="loader">
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-12 col-md-1 pt-2">
                            <p
                              className="color-blue ubuntu"
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
                              onChange={(event) =>
                                handleSelectYear(event.target.value)
                              }
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
                              <div>
                                <p className="color-blue ubuntu p-2">
                                  Calculated on {data.calculated}
                                </p>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table
                                id="example"
                                className="table table-striped"
                              >
                                <thead>
                                  <tr>
                                    <th className="text-nowrap">#</th>
                                    <th className="text-nowrap">Category</th>
                                    <th className="text-nowrap">
                                      Sub Category
                                    </th>
                                    <th className="text-nowrap">Rank</th>
                                    <th className="text-nowrap">Percentile</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.category.map((categoryData, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{categoryData.category_name}</td>
                                      <td>{categoryData.sub_category}</td>
                                      <td>{categoryData.rank}</td>
                                      <td>{categoryData.percentile}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Container>
            )}
          {(!citeSourceData ||
            !Array.isArray(citeSourceData) ||
            citeSourceData.length === 0) && (
            <Container maxWidth="xl" className="mb-0 mt-2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "120px",
                }}
                className="shadow p-3 bg-white rounded mb-3"
              >
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  No data available.
                </p>
              </div>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default JournalDetail;
