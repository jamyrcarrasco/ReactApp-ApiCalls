import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function TestView({ history, location }) {
  const [fetchMore, setFetchMore] = useState(5);
  const [contributorsList, setContributorsList] = useState([]);
  useEffect(() => {}, []);

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => history.push("top-contributors")}
    >
      Hola test
    </div>
  );
}

export default withRouter(TestView);
