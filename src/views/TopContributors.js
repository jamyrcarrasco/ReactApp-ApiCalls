import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

// ---------------HTTP---------------------
import { getRepositoryList } from "../Http/httpGet";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

function TopContributors({ history, location }) {
  const [fetchMore, setFetchMore] = useState(5);
  const [contributorsList, setContributorsList] = useState([]);
  var numeral = require("numeral");
  useEffect(() => {
    getContributorsList(location.state.link);
  }, [location]);

  async function getContributorsList(link) {
    const { data } = await getRepositoryList(link);

    setContributorsList(data);
  }

  function loadMoreItems() {
    setFetchMore(fetchMore + 5);
  }

  return (
    <div>
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Frontend Developer Challenge</p>
        </header>
      </div>
      <Container>
        <h1>Top Contributors List</h1>
        <div>
          {contributorsList.slice(0, fetchMore).map((data, index) => (
            <Card
              key={index}
              style={{
                width: "35%",
                boxShadow:
                  "0 5px 10px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
                display: "inline-block",
                marginRight: "3%",
                marginBottom: "2%"
              }}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={data.avatar_url}></Avatar>
                }
                title={"Username: " + data.login}
                subheader={
                  "(Contributions: " +
                  numeral(data.contributions).format(0, 0) +
                  ")"
                }
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(data.html_url)}
                >
                  View profile
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div>
          <Button
            style={{ height: 54, width: 155 }}
            variant="outlined"
            color="primary"
            onClick={() => loadMoreItems()}
            disabled={fetchMore === contributorsList.length}
          >
            Fetch more
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(TopContributors);
