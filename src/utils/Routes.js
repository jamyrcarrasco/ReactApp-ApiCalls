import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TopContributors from "../views/TopContributors";
import RepositoryList from "../views/RepositoryList";

export const Routes = [
  {
    path: "/",
    exact: true,
    main: () => <RepositoryList />
  },
  {
    path: "/top-contributors",
    main: () => <TopContributors />
  }
];
