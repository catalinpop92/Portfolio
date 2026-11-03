import React from "react";
import ReactDOM from "react-dom";
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
  expect(ids).toEqual(["skills", "experience", "projects", "challenge", "education"]);
  expect(div.querySelector('a[href="#education"]')).not.toBeNull();
  expect(div.querySelector('a[href="#projects"]')).not.toBeNull();
  expect(div.querySelector(".soc-details summary")).not.toBeNull();
  expect(div.querySelectorAll(".experience-text-details details")).toHaveLength(2);
  expect(div.querySelectorAll(".education-text-details details")).toHaveLength(2);
  ReactDOM.unmountComponentAtNode(div);
});
