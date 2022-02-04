import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./reusables/Card";
import { Info, Arrow } from "./reusables/Svgs";
import { getTemplateData } from "../actions/templateActions";

class TemplateDashboard extends Component {
  componentDidMount() {
    this.props.getTemplateData();
    this.customPagination();
  }

  state = {
    pageNumber: 1,
    loading: false,
  };
  customPagination = () => {
    console.log(this.props?.templates, "stuff");
  };
  render() {
    const pageHandler = (e) => {
      // eslint-disable-next-line react/no-direct-mutation-state
      let newNum = (this.state.pageNumber += 1);
      this.setState({
        ...this.state,
        pageNumber: newNum,
      });
    };
    console.log(this.state, "bitch");
    return (
      <div className="main--container">
        <div className="header--container">
          <div className="header-input__container">
            <input
              type="text"
              className="input"
              placeholder="Search templates"
            />
            <div className="filter--container">
              <div className="text-grey-light">Sort by:</div>
              <div className="option-container">
                <select name="category" className="filter-input" id="">
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                </select>
                <select name="order" className="filter-input" id="">
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                </select>
                <select name="date" className="filter-input" id="">
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                  <option value="">stuff</option>
                </select>
              </div>
            </div>
          </div>
          <div className="header-advert">
            <span>
              <Info />
            </span>
            <p className="header-advert--body">
              Tada! Get started with a free template. Can’t find what you are
              looking for? Search from the 1000+ available templates
            </p>
          </div>
        </div>
        <div className="body--container">
          <div className="template-amount">
            <p className="text-grey-dark">All Templates</p>
            <small className="text-grey-light">2000 templates</small>
          </div>
          <div className="grid--container">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="footer--container">
          <div className="footer">
            <div className="previous arrow">
              <p>Previous</p>
            </div>
            <div className="page-count">
              <span className="current-page">1</span>
              <p>of 14</p>
            </div>
            <div className="next arrow" onClick={pageHandler}>
              <p>Next</p>
              <span>
                <Arrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    templates: state.templates.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTemplateData: () => dispatch(getTemplateData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDashboard);
