import React from "react";
import "./styles/styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TemplateDashboard from "./components/TemplateDashboard";

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
