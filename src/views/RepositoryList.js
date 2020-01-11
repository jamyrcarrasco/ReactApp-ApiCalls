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
import Swal from "sweetalert2";

// ---------HTTP IMPORTS------------
import { getRepositoriesByName } from "../Http/httpGet";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

function RepositoryList({ history, location }) {
  // -------------------STATES------------------
  const [isLoading, setIsloading] = useState(false);
  const [repositoryList, setRepositoryList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  // ------------FUNCTIONS----------------
  var numeral = require("numeral");

  useEffect(() => {}, []);

  async function searchRepository(value) {
    setIsloading(true);

    const { data } = await getRepositoriesByName(value.inputValue);
    if (data.items.length === 0) {
      Swal.fire({
        type: "info",
        title: "Información",
        text: "No se han encontrado repositorios con los datos suministrados."
      });
      setIsloading(false);
      setRepositoryList([]);
    } else {
      setRepositoryList(data.items);
      setIsloading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Frontend Developer Challenge</p>
      </header>
      <Container>
        <h1>Welcome, please search.</h1>
        <div>
          <Formik
            initialValues={{ inputValue: "" }}
            enableReinitialize
            onSubmit={value => searchRepository(value)}
          >
            {({ handleChange, handleSubmit, values }) => (
              <div>
                <TextField
                  style={{ width: "45%" }}
                  required
                  id="outlined-basic"
                  label="Search repository..."
                  variant="outlined"
                  onChange={handleChange("inputValue")}
                />
                <Button
                  style={{ marginLeft: "5%", height: 54, width: 155 }}
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={values.inputValue === ""}
                >
                  Search
                </Button>
              </div>
            )}
          </Formik>
        </div>
        <div style={{ marginTop: "5%" }}>
          {isLoading && <CircularProgress />}
        </div>
      </Container>
      <Container>
        <div>
          {repositoryList.slice(0, 6).map((data, index) => (
            <Card
              key={index}
              style={{
                width: "25%",
                boxShadow:
                  "0 5px 10px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
                display: "inline-block",
                marginRight: "5%",
                marginBottom: "2%"
              }}
            >
              <CardHeader
                onClick={handleClick}
                avatar={<Avatar aria-label="recipe">{data.name[0]}</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={data.name}
                subheader={data.created_at}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      history.push({
                        pathname: "/top-contributors",
                        state: { link: data.contributors_url }
                      })
                    }
                  >
                    Top Contributors
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => window.open(data.svn_url)}
                  >
                    View Repository
                  </Button>
                </MenuItem>
              </Menu>
              <CardContent>
                <div>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: "left", marginBottom: "3%" }}
                  >
                    {data.description}
                  </Typography>
                  <div style={{ textAlign: "left" }}>
                    <Icon style={{ fontSize: 13 }}>fiber_manual_record</Icon>
                    {data.language}
                  </div>
                </div>
              </CardContent>

              <CardActions>
                <Icon>star</Icon>
                {numeral(data.stargazers_count).format(0, 0)}
                <Icon>warning</Icon>
                {numeral(data.open_issues_count).format(0, 0)}
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default withRouter(RepositoryList);
