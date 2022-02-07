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
    category: "All",
    date: "Default",
    order: "Default",
  });
  const pageHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  const onChangeHandler = (e) => {
    setFilters({ ...filter, [e.target.name]: e.target.value });
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      setFilters({ ...filter, [e.target.name]: e.target.value });
    }
  };

  const renderCurrentPage = useCallback(() => {
    if (!data) return;
    let fill = [];
    const start = (pageNumber - 1) * NUMBERPERPAGE;
    const end = start + NUMBERPERPAGE;
    const dataToRender = data.slice(start, end);

    if (filter.category !== "All") {
      fill = dataToRender.filter((obj) =>
        obj.category.some((item) => item.includes(filter.category))
      );
    } else {
      fill = dataToRender;
    }

    if (filter.order !== "Default") {
      if (filter.order === "Ascending") {
        fill = fill.sort((a, b) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        console.log(fill, "asc");
      } else {
        fill = fill.sort((a, b) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return textB < textA ? -1 : textB > textA ? 1 : 0;
        });
      }
    }
    if (filter.date !== "Default") {
      if (filter.date === "Ascending") {
        fill = fill.sort((a, b) => {
          let aDate = new Date(a.created);
          let bDate = new Date(b.created);
          return aDate.getTime() - bDate.getTime();
        });
      } else {
        fill = fill.sort((a, b) => {
          let aDate = new Date(a.created);
          let bDate = new Date(b.created);
          return bDate.getTime() - aDate.getTime();
        });
      }
    }

    setRenderData(fill);
  }, [pageNumber, data, filter]);

  useEffect(() => {
    const customEffect = async () => {
      dispatch(getTemplateData());
    };
    customEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderCurrentPage();
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
                <option value="All">Category</option>
                <option value="Education">Education</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Health">Health</option>
              </select>
              <select
                name="date"
                className="filter-input"
                value={filter.date}
                id=""
                disabled={
                  filter.category !== "Default" && filter.order !== "Default"
                }
                onChange={onChangeHandler}
              >
                <option value="Default">Date</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
              <select
                name="order"
                value={filter.order}
                className="filter-input"
                id=""
                disabled={
                  filter.category !== "Default" && filter.date !== "Default"
                }
                onChange={onChangeHandler}
              >
                <option value="Default">Order</option>
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
