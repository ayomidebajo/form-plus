import React from "react";
import Loadable from "react-loadable";
import "./styles/styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Loading } from "./components/reusables/Loading";
const TemplateDashboard = Loadable({
  loader: () => import("./components/TemplateDashboard"),
  loading: Loading,
});

function App() {
  return (
    <>
      <Router>
        <Route component={TemplateDashboard} path="/" />
      </Router>
    </>
  );
}

export default App;
