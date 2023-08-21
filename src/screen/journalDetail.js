import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../style/styles.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import baseApi from "../baseApi/baseApi";

const baseURL = baseApi + "scopus/journal/";

function JournalDetail() {
  const [journal, setJournalData] = useState([]);
  const [selectedYear, setSelectedYear] = useState();

  const [changeJournalData, setChangeJournalData] = useState([]);
  const [linkJournalData, setlinkJournalData] = useState([]);

  const [citeSource, setCiteSource] = useState([]);
  const [citeSourceData, setCiteSourceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCiteScore, setIsLoadingCiteScore] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source_id = queryParams.get("sourceId");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectYear = (selectedYear) => {
    setSelectedYear(selectedYear);
    setIsLoadingCiteScore(true);
    const filteredData = citeSource.filter(
      (data) => data.cite.year === selectedYear
    );

    setCiteSourceData(filteredData);
    setTimeout(() => {
      setIsLoadingCiteScore(false);
      $(document).ready(function () {
        $("#example").DataTable();
      });
    }, 360);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      setIsLoading(true);
      try {
        axios.get(`${baseURL}${source_id}`).then((response) => {
          const data = response.data;
          setJournalData(data);
          setCiteSource(data.cite_source);
          if (
            data.hasOwnProperty("changeJournal") &&
            data.changeJournal.length > 0
          ) {
            setChangeJournalData(data.changeJournal);
          }

          if (data.cite_source != null) {
            const filteredData = data.cite_source.filter(
              (_, index) => index === 0
            );
            setCiteSourceData(filteredData);
          } else {
            setCiteSourceData(null);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [source_id]);

  // useEffect(async () => {
  //   await fetchData(source_id);
  // }, [source_id]);

  useEffect(() => {
    async function fetchChangeData() {
      try {
        const newData = [];
        for (const data of changeJournalData) {
          const comresponse = await axios.get(
            `${baseURL}changeJournal/${data.source_id}`
          );
          if (comresponse.data) {
            newData.push(data.source_id);
          }
        }
        setlinkJournalData(newData);
      } catch (error) {
        console.error("Error fetching change data:", error);
      }
    }

    fetchChangeData();
  }, [changeJournalData]);

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

                {journal.changeJournal && changeJournalData.length > 0 && (
                  <div>
                    {changeJournalData.map((data, index) => {
                      const matchingLink = linkJournalData.includes(
                        data.source_id
                      );
                      console.log("linkJournalData : ", linkJournalData);
                      console.log("matchingLink : ", matchingLink);
                      return (
                        <div className="p-2" key={index}>
                          <span
                            className="color-blue ubuntu"
                            style={{ fontSize: "16px" }}
                          >
                            <div>
                              <b>{journal.changeJournal[index]?.field}: </b>
                              {matchingLink ? (
                                <Link
                                  to={`/journal-detail?sourceid=${data.source_id}`}
                                  className="no-underline"
                                  rel="noopener noreferrer"
                                >
                                  <span
                                    className="ubuntu"
                                    style={{ fontSize: "16px" }}
                                  >
                                    {data.journal_name}
                                  </span>
                                </Link>
                              ) : (
                                <span
                                  className="ubuntu"
                                  style={{ fontSize: "16px" }}
                                >
                                  {data.journal_name}
                                </span>
                              )}
                            </div>
                          </span>
                        </div>
                      );
                    })}
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
                {journal.publisher ? (
                  <div className="p-2 m-0">
                    <span
                      className="color-blue ubutu"
                      style={{ fontSize: "16px" }}
                    >
                      <div>
                        {" "}
                        <b>Publisher: </b>
                        <span className="ubutu" style={{ fontSize: "16px" }}>
                          {journal.publisher}
                        </span>
                      </div>
                    </span>
                  </div>
                ) : null}
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

          {citeSourceData &&
            Array.isArray(citeSourceData) &&
            citeSourceData.length > 0 &&
            citeSource !== null && (
              <Container maxWidth="xl">
                <div
                  className="shadow p-3 mb-5 bg-white rounded"
                  style={{ width: "100%", minHeight: "365px" }}
                >
                  <div>
                    <div className="row">
                      <div className="col-12 col-sm-3 col-md-2 col-lg-2 d-flex flex-wrap pt-2">
                        <p
                          className="color-blue ubuntu"
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          CiteScoreYear
                        </p>
                      </div>
                      <div className="col-12 col-sm-4 col-md-4 col-lg-3">
                        <select
                          className="form-select"
                          aria-label="Select a year"
                          style={{ maxWidth: "100%", height: "auto" }}
                          value={selectedYear}
                          onChange={(event) =>
                            handleSelectYear(event.target.value)
                          }
                        >
                          {citeSource.map((data) => (
                            <option value={data.cite.year} key={data.cite.year}>
                              {data.cite.year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

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
                        {citeSourceData.map((data) => (
                          <React.Fragment key={data.cite.year}>
                            <div className="row">
                              <div className="col-12 col-sm-4 col-md-3 col-lg-2 d-flex flex-wrap">
                                <p
                                  className="color-blue ubuntu p-0 pt-2"
                                  style={{ fontSize: "25px" }}
                                >
                                  <b>CiteScore</b>
                                </p>
                              </div>
                              <div className="border text-center col-12 col-sm-7 col-md-6 col-lg-3 mb-3  p-0 rounded ">
                                <p
                                  className="color-blue ubuntu p-0"
                                  style={{ fontSize: "30px" }}
                                >
                                  {data.cite.citeScore}
                                </p>
                              </div>
                              <div>
                                <p className="color-blue ubuntu p-2">
                                  Calculated on {data.cite.calculatedDate}
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
