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
import authors from "../json/Scopus_Author";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "authors/";

function GraphScopus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("id");

  const [dataGraph, setDataGraph] = useState([]);

  useEffect(() => {
    const authorsData = authors.filter((item) => item.name.split(",")[0] === name);
    setDataGraph(authorsData);
    console.log("authorsData = ", authorsData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={165}>
      {dataGraph.map((dataItem) => (
        <BarChart data={dataItem.citations_graph} className="m-0" key={dataItem.id}>
          <Bar dataKey="documents" fill="#0a4275" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </BarChart>
      ))}
    </ResponsiveContainer>
  );
}


export default GraphScopus;
