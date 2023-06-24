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
import "../style/loader.css";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authors";
function Home() {
  const [posts, setPosts] = useState([]);
  const [postslength, setPostsLength] = useState(0);
  const [citation, setCitation] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const url =
      searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;
    setIsLoading(false);
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
        setPostsLength(response.data.length);
        setCitation(response.data.citation_by.table);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [searchQuery]);

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingTop: "3rem" }}
      style={{ marginTop: "65px" }}
    >
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
        <div>
          <Typography variant="h4" sx={{ mb: 2 }} className="color-blue pb-3">
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
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {postslength === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <p className="font color-blue not-found ubutu">
                Not Found Researcher
              </p>
            </div>
          ) : (
            <>
          
              <div className="p-2 mt-4 ">
                <h4 className="color-blue ubutu" style={{fontWeight:"bolder"}}>{postslength}  Researchers</h4>
              </div>
              <div className="row">
                {posts.map((post) => (
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
                    <Link
                      to={`/author-detail?id=${post._id}`}
                      className="no-underline"
                    >
                      <div class="card">
                        <div class="card-horizontal">
                          <div class="img-square-wrapper">
                            <CardMedia
                              component="img"
                              sx={{
                                pt: "56.25%",
                                padding: "0",
                                width: "100%",
                                height: "450px",
                                "@media (min-width: 600px)": {
                                  width: "180px",
                                  height: "240px",
                                },
                              }}
                              image={post.image}
                              alt={post.author_name}
                            />
                          </div>
                          <div class="card-body p-5">
                            <h5 className="ubutu color-blue">
                              {post.author_name}
                            </h5>
                            <Typography className="ubutu gray">
                              {post.department}
                            </Typography>
                            {/* <div className="d-flex flex-wrap ">
                              <div className="border-blue p-2 mt-4 text-center me-1">
                                <span className="color-blue ubutu">
                                  <b>Research Articles: </b>
                                </span>
                                <span className="color-blue ubutu">15</span>
                              </div>
                              <div className="border-blue p-2 mt-4 text-center me-1">
                                <div className="text-center">
                                  <span className="color-blue ubutu">
                                    <b>h-index: </b>
                                    <span className="color-blue ubutu">55</span>
                                  </span>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default Home;
