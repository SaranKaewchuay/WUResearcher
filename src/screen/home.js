import React, { useState, useEffect } from "react";
import Head from "../component/head";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

import "../style/styles.css";

const baseURL = "http://localhost:8080/authors";

function Home() {
  const [posts, setPosts] = useState([]);
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    const {target: { value },} = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    
    if(personName == ""){
      axios
      .get("http://localhost:8080/authors")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      axios
    .get("http://localhost:8080/authors/author/" + personName)
    .then((response) => {
      setPosts(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    }
 
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
        console.log(posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const search = (str) => {
  //   axios
  //     .get("http://localhost:8080/authors/author/" + str)
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div>
      <Container maxWidth="sm" sx={{ paddingTop: "3rem", height: "50" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "33rem",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, flexDirection: "column" }}
            placeholder="Search Researcher"
            onChange={handleChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link
                to={`/author-detail?id=${post._id}`}
                className="no-underline"
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: "56.25%",
                      padding: "0",
                      width: "270px",
                      height: "250px",
                    }}
                    image={post.image}
                    alt={post.author_name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.author_name}
                    </Typography>
                    <Typography>{post.department}</Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions> */}
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
