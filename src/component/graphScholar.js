import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";
import axios from "axios";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

// const baseURL = host + "authors/";

function Graph() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [dataGraph, setDataGraph] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}scholar/author/${id}`)
      .then((response) => {
        setDataGraph(response.data.citation_by.graph);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!dataGraph || dataGraph.length === 0) {
    return null;
  }

  const maxBarWidth = 40;
  return (
    <div>
      <h5
        className="ubutu color-blue pb-2 text-center"
        style={{ fontWeight: "bolder", fontSize: "20px" }}
      >
        Catation Graph
      </h5>
      <ResponsiveContainer width="95%" height={165}>
        <BarChart data={dataGraph} className="m-0">
          <Bar dataKey="citations" fill="#0a4275" maxBarSize={maxBarWidth} />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
