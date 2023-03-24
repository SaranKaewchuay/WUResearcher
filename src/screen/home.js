import React, { useState, useEffect } from "react";
import Head from "../component/head";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/styles.css";

const baseURL = "http://localhost:8080/authors";



function Home() {
  const [posts, setPosts] = useState([]);

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

 
  return (
    <div>
      <Head />
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
