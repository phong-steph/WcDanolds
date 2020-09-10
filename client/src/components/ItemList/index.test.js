import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import ItemList from "./index";

import store from "../../store";

beforeAll(() => {
  window.scrollTo = jest.fn();
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          items: [
            {
              id: 1,
              title: "BIG MAC",
              description:
                "Ses deux steaks hachés, son cheddar fondu, ses oignons, ses cornichons, son lit de salade et sa sauce inimitable, font du Big Mac un burger culte et indémodable.",
              price: 3.8,
              logo:
                "https://ws.mcdonalds.fr/media/f9/2a/46/f92a4620185b701485e4b69cad53d81f67e7c3b1",
            },
            {
              id: 2,
              title: "FILET-O-FISH",
              description:
                "Fondez pour son poisson pané croustillant et sa sauce légèrement vinaigrée aux oignons et aux câpres, le tout dans un pain cuit vapeur. Laissez-vous prendre dans ses filets !",
              price: 3.8,
              logo:
                "https://ws.mcdonalds.fr/media/92/98/d0/9298d0751ac047c90346b6288371b1bed28ad083",
            },
            {
              id: 3,
              title: "LE 280™ ORIGINAL",
              description:
                "Un pain ciabatta cuit sur pierre, un steak haché 100% pur bœuf *, de l'emmental et du cheddar fondus, des oignons frais, deux rondelles de tomates, du ketchup et une sauce légèrement citronnée.",
              price: 5.9,
              logo:
                "https://ws.mcdonalds.fr/media/09/0e/eb/090eeba3e36f2aeaf47e0b0a6eda8c880cae345d",
            },
            {
              id: 4,
              title: "McCHICKEN",
              description:
                "Notre spécialité panée au poulet, sa salade croquante et sa sauce légèrement citronnée font du McChicken un succès incontesté et surtout incontestable depuis 1980.",
              price: 3.7,
              logo:
                "https://ws.mcdonalds.fr/media/44/5f/b1/445fb1e49089f1364b359c673f80620244f93fc5",
            },
            {
              id: 5,
              title: "CHICKEN McNUGGETS",
              description:
                "Craquez pour ces nuggets croustillants, à savourer avec ou sans sauce, en famille ou entre amis, faîtes-vous plaisir !",
              price: 2.7,
              logo:
                "https://ws.mcdonalds.fr/media/f6/27/3d/f6273de586b57c9b63f12f1cd36c72e76461876a",
            },
            {
              id: 6,
              title: "HAMBURGER",
              description:
                "Un steak haché, une rondelle de cornichon, des oignons, de la moutarde douce et du ketchup, retrouvez tout l'esprit de McDonald's dans ce classique au goût inimitable.",
              price: 1.2,
              logo:
                "https://ws.mcdonalds.fr/media/20/d9/8a/20d98ac9a9a0ddc3d2251769d23a77ea42269145",
            },
          ],
          totalCount: 6,
        }),
    })
  );
});

afterAll(() => {
  fetch.mockClear();
});

const renderWrappedComponent = () => {
  render(
    <Provider store={store}>
      <ItemList />
    </Provider>
  );
};

describe("fetchItems", () => {
  test("scrolling to bottom should refetch items", async () => {
    renderWrappedComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // scrolling should trigger fetchItems
    fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });
  test("should not refetch items if no scroll to bottom ", async () => {
    renderWrappedComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // scrolling should trigger fetchItems
    fireEvent.scroll(window, { target: { scrollY: window.innerHeight - 50 } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  test("should not call fetch items more than 2 times", async () => {
    renderWrappedComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // scrolling should trigger fetchItems
    fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    // scrolling should trigger fetchItems
    fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
    await waitFor(() => expect(global.fetch).not.toHaveBeenCalledTimes(3));
  });

  test("fetchItems should assert an error", async () => {
    const error = new Error();
    const assert = jest.spyOn(global.console, "assert");
    global.fetch = jest.fn(() => Promise.reject(error));

    renderWrappedComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(assert).toHaveBeenCalledTimes(1);
    expect(assert).toHaveBeenCalledWith(true, error);
  });
});

describe("render", () => {
  test("should display a loader", async () => {
    renderWrappedComponent();

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).toBeInTheDocument()
    );
  });

  test("should fetch and display 3 items", async () => {
    renderWrappedComponent();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/items?limit=3",
      expect.any(Object)
    );

    // Wait for rerendering after Items have been fetched
    await waitFor(() => [
      expect(screen.getByText("BIG MAC")).toBeInTheDocument(),
      expect(screen.getByText("FILET-O-FISH")).toBeInTheDocument(),
      expect(screen.getByText("LE 280™ ORIGINAL")).toBeInTheDocument(),
    ]);
  });

  test("should fetch and display next 3 items", async () => {
    renderWrappedComponent();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/items?limit=3",
      expect.any(Object)
    );

    // Wait for rerendering after Items have been fetched
    await waitFor(() => [
      expect(screen.getByText("BIG MAC")).toBeInTheDocument(),
      expect(screen.getByText("FILET-O-FISH")).toBeInTheDocument(),
      expect(screen.getByText("LE 280™ ORIGINAL")).toBeInTheDocument(),
    ]);

    // scrolling should trigger fetchItems
    fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });

    // should display a spinner before refetching items
    await waitFor(() => [
      expect(screen.queryByText("Loading...")).toBeInTheDocument(),
    ]);

    // Wait api call before testing UI
    await waitFor(() => [
      expect(global.fetch).toHaveBeenCalledTimes(2),
      expect(global.fetch).toHaveBeenCalledWith(
        "/items?limit=6",
        expect.any(Object)
      ),
    ]);

    // spinner should be removed before displaying items
    expect(screen.queryByText("loading...")).toBeNull();

    // Wait for rerendering after Items have been fetched
    await waitFor(() => [
      expect(screen.queryByText("McCHICKEN")).toBeInTheDocument(),
      expect(screen.queryByText("CHICKEN McNUGGETS")).toBeInTheDocument(),
      expect(screen.queryByText("HAMBURGER")).toBeInTheDocument(),
    ]);
  });
});
