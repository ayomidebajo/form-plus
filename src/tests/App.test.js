import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/RootReducer";
import axios from "axios";
import Card from "../components/reusables/Card";

jest.mock("axios");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const fakeTemplateData = {
  data: [
    {
      category: ["Health", "E-commerce", "Education"],
      created: "2022-02-07T14:31:44.438343",
      description: "commodo tempor nostrud officia Lorem",
      link: "https://formpl.us/templates",
      name: "nulla velit elit,",
    },
    {
      category: ["Health", "E-commerce", "Education"],
      created: "2022-02-07T14:31:44.316070",
      description: "incididunt consequat. amet, eiusmod exercitation",
      link: "https://formpl.us/templates",
      name: "incididunt laborum. dolore",
    },
    {
      category: ["Education", "E-commerce"],
      created: "2022-02-07T14:31:43.907363",
      description: "adipiscing cupidatat proident, magna aliqua.",
      link: "https://formpl.us/templates",
      name: "laborum. aliqua.",
    },
    {
      category: ["Education", "E-commerce"],
      created: "2022-02-07T14:31:43.906485",
      description: "ipsum Lorem eiusmod dolore deserunt",
      link: "https://formpl.us/templates",
      name: "laboris reprehenderit",
    },

    {
      category: ["Health", "E-commerce"],
      created: "2022-02-07T14:31:43.909432",
      description: "Excepteur occaecat labore aliquip laborum.",
      link: "https://formpl.us/templates",
      name: "voluptate culpa",
    },

    {
      category: ["Health", "E-commerce"],
      created: "2022-02-07T14:31:43.902547",
      description: "mollit aliquip laboris elit, Excepteur",
      link: "https://formpl.us/templates",
      name: "Excepteur ipsum",
    },
    {
      category: ["Health", "E-commerce"],
      created: "2022-02-07T19:18:13.146336",
      description: "Lorem tempor nulla commodo irure",
      link: "https://formpl.us/templates",
      name: "dolore voluptate",
    },
    {
      category: ["Health", "E-commerce", "Education"],
      created: "2022-02-07T19:18:13.781663",
      description: "voluptate commodo incididunt consequat. elit,",
      link: "https://formpl.us/templates",
      name: "proident, veniam, mollit",
    },
    {
      category: ["Health", "E-commerce", "Education"],
      created: "2022-02-07T19:18:13.527921",
      description: "voluptate officia reprehenderit fugiat laborum.",
      link: "https://formpl.us/templates",
      name: "exercitation consequat. magna",
    },
    {
      category: ["Health", "E-commerce", "Education"],
      created: "2022-02-07T19:18:13.553974",
      description: "minim fugiat laborum. irure elit,",
      link: "https://formpl.us/templates",
      name: "consectetur culpa consequat.",
    },
    {
      category: ["E-commerce", "Education"],
      created: "2022-02-07T19:18:13.161164",
      description: "unique",
      link: "https://formpl.us/templates",
      name: "laborum. irure",
    },
    {
      category: ["Education", "Health"],
      created: "2022-02-07T19:18:13.163108",
      description: "cupidatat velit Excepteur veniam, ullamco",
      link: "https://formpl.us/templates",
      name: "eiusmod cillum",
    },
    {
      category: ["Education", "Health"],
      created: "2022-02-07T19:18:13.152089",
      description: "exercitation dolore labore occaecat fugiat",
      link: "https://formpl.us/templates",
      name: "pariatur. consequat.",
    },
    {
      category: ["Education", "E-commerce"],
      created: "2022-02-07T19:18:13.155137",
      description: "minim ullamco eiusmod occaecat consequat.",
      link: "https://formpl.us/templates",
      name: "reprehenderit minim",
    },
    {
      category: ["E-commerce", "Education"],
      created: "2022-02-07T19:18:13.159080",
      description: "Excepteur magna ipsum pariatur. ullamco",
      link: "https://formpl.us/templates",
      name: "pariatur. incididunt",
    },
  ],
};
test("renders learn react link", async () => {
  // fetchMock.mockResponseOnce(JSON.stringify(fakeTemplateData));
  axios.get.mockResolvedValueOnce(fakeTemplateData);
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

it("renders template data", async () => {
  const { container } = render(
    <Card
      category={["Health", "E-commerce"]}
      description="mollit aliquip laboris elit, Excepteur"
      name="Excepteur ipsum"
    />
  );
  console.log(container.ELEMENT_NODE, "con");
  // const cards = window.document.getElementsByClassName("card");

  // console.log(cards);
  let desc = await screen.findByText("mollit aliquip laboris elit, Excepteur");
  expect(desc).toBeTruthy();
});

it("it filters by category", async () => {
  axios.get.mockResolvedValueOnce(fakeTemplateData);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let categ = await screen.findByTestId("select-category");
  expect(categ).toBeTruthy();

  fireEvent.change(categ, { target: { value: "Education" } });

  let cards = await screen.findAllByTestId("card");

  expect(cards).toHaveLength(7);
});

it("it filters by search", async () => {
  axios.get.mockResolvedValueOnce(fakeTemplateData);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let searchInput = await screen.findByTestId("search-test");
  expect(searchInput).toBeTruthy();

  fireEvent.change(searchInput, { target: { value: "ipsum" } });

  let cards = await screen.findAllByTestId("card");

  expect(cards).toHaveLength(1);
});

it("it paginates", async () => {
  axios.get.mockResolvedValueOnce(fakeTemplateData);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  let nextBtn = await screen.findByText("Next");
  expect(nextBtn).toBeTruthy();

  fireEvent.click(nextBtn);

  let cards = await screen.findAllByTestId("card");

  expect(cards).toHaveLength(5);
});
