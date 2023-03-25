import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style/styles.css";

const baseURL = "http://localhost:8080/authors";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const url = searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;

    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchQuery]);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "3rem" }}>
      <Typography variant="h4" sx={{ mb: 2 }} class="color-blue">
        Search Researcher
      </Typography>
      <TextField
        variant="outlined"
        label="Enter researcher name"
        fullWidth
        value={searchQuery}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={3}>
            <Link to={`/author-detail?id=${post._id}`} className="no-underline">
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
                    width: "100%",
                    height: "290px",
                  }}
                  image={post.image}
                  alt={post.author_name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>
                    <h5 class="ubutu color-blue">{post.author_name}</h5>
                  </Typography>
                  <Typography class="ubutu gray">{post.department}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
