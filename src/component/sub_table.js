import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";
import baseApi from "../baseApi/baseApi";

const host = baseApi;

function SubTable() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("scholar_id");

  const [data, setData] = useState([]); 
  const [citationBy, setCitationBy] = useState(); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get(`${host}scholar/author/${id}`)
      .then((response) => {
        setData(response.data.citation_by.table);
        setCitationBy(response.data.citation_by);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return (
      <div
        className="loading-spinner-container d-flex align-items-center justify-content-center"
        style={{ fontWeight: "bold", fontSize: "18px" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const isDataEmpty = Object.keys(citationBy).length == 0

  if (isDataEmpty) {
    return null;
  }

  return (
    <div className="table-responsive d-flex align-items-center justify-content-center">
      <table className="table center" style={{ width: "80%" }}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">All</th>
            <th scope="col">Since 2018</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span
                className="no-underline"
                title='This is the number of citations to all publications. The second column has the "recent" version of this metric which is the number of new citations in the last 5 years to all publications.'
              >
                <p className="blue">
                  <b>Citations</b>
                </p>
              </span>
            </td>
            <td>{data.find((item) => item.citations)?.citations?.all}</td>
            <td>{data.find((item) => item.citations)?.citations?.since_2018}</td>
          </tr>
          <tr>
            <td>
              <span
                className="gsc_rsb_f gs_ibl no-underline"
                title='h-index is the largest number h such that h publications have at least h citations. The second column has the "recent" version of this metric which is the largest number h such that h publications have at least h new citations in the last 5 years.'
              >
                <p className="blue">
                  <b>h-index</b>
                </p>
              </span>
            </td>
            <td>{data.find((item) => item.h_index)?.h_index?.all}</td>
            <td>{data.find((item) => item.h_index)?.h_index?.since_2018}</td>
          </tr>
          <tr>
            <td>
              <span
                className="no-underline"
                title='i10-index is the number of publications with at least 10 citations. The second column has the "recent" version of this metric which is the number of publications that have received at least 10 new citations in the last 5 years.'
              >
                <p className="blue">
                  <b>i10-index</b>
                </p>
              </span>
            </td>
            <td>{data.find((item) => item.i10_index)?.i10_index?.all}</td>
            <td>{data.find((item) => item.i10_index)?.i10_index?.since_2018}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubTable;
