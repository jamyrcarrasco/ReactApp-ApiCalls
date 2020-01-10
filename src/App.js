import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// ---COMPONENTS IMPORTS------
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "./utils/Routes";

// ----------HTTTP METHODS--------------
import { getRepositoriesByName } from "./Http/httpGet";

// ------------COMPONENTS-----------------------------

// ----Styles to a div as a variable-----------------
const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

function App({ history }) {
  // -------------------STATES------------------
  const [isLoading, setIsloading] = useState(false);
  const [repositoryList, setRepositoryList] = useState([]);

  // ------------FUNCTIONS----------------
  var numeral = require("numeral");

  async function searchRepository(value) {
    setIsloading(true);
    console.log(value);
    const { data } = await getRepositoriesByName(value.inputValue);
    console.log(data);
    setRepositoryList(data.items);
    setIsloading(false);
  }

  return (
    <div className="App">
      <Router>
        {Routes.map((data, index) => (
          <Route
            key={index}
            path={data.path}
            exact={data.exact}
            component={data.main}
          />
        ))}
      </Router>
    </div>
  );
}

export default App;
