import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./reusables/Card";
import { Info, Arrow } from "./reusables/Svgs";
import { getTemplateData } from "../actions/templateActions";
import { useCallback } from "react";

const NUMBERPERPAGE = 60;
const TemplateDashboard = () => {
  const dispatch = useDispatch();
  const { data, pageTotal } = useSelector((state) => state.templates);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderData, setRenderData] = useState([]);
  const [filter, setFilters] = useState({
    search: "",
    category: "all",
    date: "",
    order: "",
  });
  const pageHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  const onChangeHandler = (e) => {
    setFilters({ ...filter, category: e.target.value });
  };

  const filterByCategory = () => {
    let fill = [];
    if (filter.category !== null || filter.category !== "") {
      fill = renderData.filter((obj) =>
        obj.category.some((item) => item.includes(filter.category))
      );
    }
    console.log(fill, "filterd cat");
    // setRenderData(fill);
    return fill;
    // console.log(renderData, count, "render");
  };

  const filterByAlphabeticalOrder = () => {
    let fill = [];
    if (filter.order !== null || filter.order !== "") {
      fill = renderData.sort((a, b) => {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      // fill.sort();
    }
    console.log(fill, "fill");
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      setFilters({ ...filter, [e.target.name]: e.target.value });
      console.log("enter");
    }
  };

  const renderCurrentPage = useCallback(() => {
    if (!data) return;
    const start = (pageNumber - 1) * NUMBERPERPAGE;
    const end = start + NUMBERPERPAGE;
    const dataToRender = data.slice(start, end);
    console.log(dataToRender);

    setRenderData(dataToRender);
  }, [pageNumber, data]);

  useEffect(() => {
    const customEffect = async () => {
      dispatch(getTemplateData());
    };
    customEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(Math.ceil(pageTotal), pageTotal);
    renderCurrentPage();
    filterByCategory();
    filterByAlphabeticalOrder();
    // filterBy();
    // console.log(, "filteredObj");
  }, [pageNumber, data, filter, renderCurrentPage]);

  return (
    <div className="main--container">
      <div className="header--container">
        <div className="header-input__container">
          <input
            type="text"
            className="input"
            name="search"
            onChange={searchHandler}
            placeholder="Search templates"
          />
          <div className="filter--container">
            <div className="text-grey-light">Sort by:</div>
            <div className="option-container">
              <select
                name="category"
                className="filter-input"
                value={filter.category}
                onChange={onChangeHandler}
                id=""
              >
                <option value="all">Category</option>
                <option value="Education">Education</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Health">Health</option>
              </select>
              <select
                name="date"
                className="filter-input"
                id=""
                onChange={onChangeHandler}
              >
                <option value="Default">Date</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
              <select
                name="order"
                className="filter-input"
                id=""
                onChange={onChangeHandler}
              >
                <option value="Default">Date</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
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
          {renderData.map((item, i) => (
            <Card
              key={i + item.created}
              category={item.category}
              description={item.description}
              name={item.name}
            />
          ))}
        </div>
      </div>
      <div className="footer--container">
        <div className="footer">
          <div className="previous arrow">
            <p>Previous</p>
          </div>
          <div className="page-count">
            <span className="current-page">{pageNumber}</span>

            <p>of {Math.ceil(pageTotal)}</p>
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
};

export default TemplateDashboard;
