import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "authors/";

function SubTable() {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => {
        setData(response.data.citation_by.table);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div class="table-responsive">
      <table class="table center" style={{width:"95%"}}>
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
              <a
                class="no-underline"
                title='This is the number of citations to all publications. The second column has the "recent" version of this metric which is the number of new citations in the last 5 years to all publications.'
              >
                <p class="blue">
                  <b>Citations</b>
                </p>
              </a>
            </td>
            <td>{data.find((item) => item.citations)?.citations?.all}</td>
            <td>
              {data.find((item) => item.citations)?.citations?.since_2018}
            </td>
          </tr>
          <tr>
            <td>
              <a
                class="gsc_rsb_f gs_ibl no-underline"
                title='h-index is the largest number h such that h publications have at least h citations. The second column has the "recent" version of this metric which is the largest number h such that h publications have at least h new citations in the last 5 years.'
              >
                <p class="blue">
                  <b>h-index</b>
                </p>
              </a>
            </td>
            <td>{data.find((item) => item.h_index)?.h_index?.all}</td>
            <td>{data.find((item) => item.h_index)?.h_index?.since_2018}</td>
          </tr>
          <tr>
            <td>
              <a
                class="no-underline"
                title='i10-index is the number of publications with at least 10 citations. The second column has the "recent" version of this metric which is the number of publications that have received at least 10 new citations in the last 5 years.'
              >
                <p class="blue">
                  <b>i10-index</b>
                </p>
              </a>
            </td>
            <td>{data.find((item) => item.i10_index)?.i10_index?.all}</td>
            <td>
              {data.find((item) => item.i10_index)?.i10_index?.since_2018}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubTable;
