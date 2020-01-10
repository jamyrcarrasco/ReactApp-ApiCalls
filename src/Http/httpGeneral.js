import axios from "axios";
import { withRouter } from "react-router-dom";

const http = axios.create({
  baseURL: "https://api.github.com/"
  // headers: {
  //   ContentType: "application/json",
  //   Accept: "*/*"
  // }
});

export default withRouter(http);
