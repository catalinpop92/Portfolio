import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";
import "./i18n";
import App from "./App";

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  })
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  expect(div.querySelector("#greeting")).not.toBeNull();
  expect(div.querySelector(".splash-container")).toBeNull();
  const main = div.querySelector("main");
  const ids = [...main.querySelectorAll("#skills, #experience, #projects, #challenge, #education")].map(node => node.id);
  expect(ids).toEqual(["skills", "education", "experience", "projects", "challenge"]);
  expect(div.querySelector('a[href="#education"]')).not.toBeNull();
  expect(div.querySelector('a[href="#projects"]')).not.toBeNull();
  expect(div.querySelector(".soc-details summary")).not.toBeNull();
  expect(div.querySelector('a[href="#/soc"]')).not.toBeNull();
  expect(div.querySelector(".terminal-form")).toBeNull();
  expect(div.querySelectorAll(".experience-text-details details")).toHaveLength(2);
  expect(div.querySelectorAll(".education-text-details details")).toHaveLength(2);
  ReactDOM.unmountComponentAtNode(div);
});

it("opens the SOC subpage, supports returning home and loads a direct link", () => {
  const div = document.createElement("div");
  const scrollTo = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = jest.fn();
  const navigate = hash => {
    act(() => {
      window.history.replaceState(null, "", hash);
      window.dispatchEvent(new Event("hashchange"));
    });
  };
  try {
    act(() => { ReactDOM.render(<App />, div); });
    navigate("#/soc");
    expect(div.querySelector(".terminal-form")).not.toBeNull();
    expect(div.querySelector("h1#challenge-title")).not.toBeNull();
    expect(div.querySelector("#greeting")).toBeNull();
    expect(div.querySelector('.soc-page-navigation a').getAttribute("href")).toBe("#challenge");
    navigate("#challenge");
    expect(div.querySelector("#greeting")).not.toBeNull();
    expect(div.querySelector(".terminal-form")).toBeNull();
    act(() => { ReactDOM.unmountComponentAtNode(div); });
    window.history.replaceState(null, "", "#/soc");
    act(() => { ReactDOM.render(<App />, div); });
    expect(div.querySelector(".terminal-form")).not.toBeNull();
    expect(div.querySelector("#greeting")).toBeNull();
  } finally {
    act(() => { ReactDOM.unmountComponentAtNode(div); });
    window.history.replaceState(null, "", window.location.pathname);
    Element.prototype.scrollIntoView = originalScrollIntoView;
    scrollTo.mockRestore();
  }
});
