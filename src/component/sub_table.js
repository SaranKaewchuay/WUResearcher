import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

function SubTable() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [data, setData] = useState([]); // Set initial value to an empty array
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    axios
      .get(`${host}scholar/author/${id}`)
      .then((response) => {
        setData(response.data.citation_by.table);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading state to false in case of an error
        // You may want to handle errors here, e.g., show an error message
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

  // Check if all the data values are null
  const isDataEmpty =
    data.length === 0 ||
    data.every((item) => {
      const keys = Object.keys(item);
      return keys.every((key) => item[key].all === null && item[key].since_2018 === null);
    });

  // If there is no data, return null to prevent rendering the table div
  if (isDataEmpty) {
    return null;
  }

  // If there is data, render the table
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
              {/* Changed anchor <a> to <span> */}
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
              {/* Changed anchor <a> to <span> */}
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
              {/* Changed anchor <a> to <span> */}
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
