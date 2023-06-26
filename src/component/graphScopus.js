import React, { useEffect, useState } from "react";
import { ComposedChart, ResponsiveContainer, Line, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLocation } from "react-router-dom";
import axios from "axios";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authorsScoupus/";

function GraphScopus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [dataGraph, setDataGraph] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + id);
        const { citations_graph, documents_graph } = response.data;

        const mappedCitations = citations_graph.map(item => ({
          label: item.year,
          citation: parseInt(item.citations),
        }));

        const mappedDocuments = documents_graph.map(item => ({
          label: item.year,
          document: parseInt(item.documents),
        }));

        const data = [...mappedCitations, ...mappedDocuments];
        data.sort((a, b) => a.label - b.label);
        setDataGraph(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const MyChart = () => (
    <ResponsiveContainer width="95%" height={350}>
      <ComposedChart data={dataGraph}>
        <XAxis dataKey="label" className="text-center" />
        <YAxis domain={[0, 'dataMax']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="document" barSize={60} fill="#0066CC" />
        <Line type="monotone" dataKey="citation" stroke="#000066" connectNulls={true} />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return (
    <div className="App">
      <span className="text-center ubuntu color-blue" style={{ fontWeight: "bolder",fontSize:"20px" }}><p>Document &amp; Citation Trends</p></span>
      <MyChart />
    </div>
  );
}

export default GraphScopus;