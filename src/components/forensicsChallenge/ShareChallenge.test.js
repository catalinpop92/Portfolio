import React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import i18n from "../../i18n";
import ShareChallenge from "./ShareChallenge";

let container;
const originalShare = Object.getOwnPropertyDescriptor(navigator, "share");
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

beforeEach(async () => {
  await i18n.changeLanguage("it");
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => { ReactDOM.render(<ShareChallenge />, container); });
});

afterEach(() => {
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  container.remove();
  if (originalShare) Object.defineProperty(navigator, "share", originalShare);
  else delete navigator.share;
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else delete navigator.clipboard;
});

test("opens the device share sheet with a challenge link", async () => {
  const share = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, "share", {configurable: true, value: share});
  await act(async () => { Simulate.click(container.querySelector("button")); });
  expect(share).toHaveBeenCalledWith(expect.objectContaining({url: expect.stringMatching(/#challenge$/)}));
});

test("falls back to a selectable link if sharing and clipboard are unavailable", async () => {
  Object.defineProperty(navigator, "share", {configurable: true, value: undefined});
  Object.defineProperty(navigator, "clipboard", {configurable: true, value: undefined});
  await act(async () => { Simulate.click(container.querySelector("button")); });
  expect(container.querySelector('[role="status"]').textContent).toContain("Seleziona e copia");
  expect(container.querySelector("input").value).toMatch(/#challenge$/);
});

test("copies the challenge link when the share sheet is unavailable", async () => {
  const writeText = jest.fn().mockResolvedValue();
  Object.defineProperty(navigator, "share", {configurable: true, value: undefined});
  Object.defineProperty(navigator, "clipboard", {configurable: true, value: {writeText}});
  await act(async () => { Simulate.click(container.querySelector("button")); });
  expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/#challenge$/));
  expect(container.querySelector('[role="status"]').textContent).toBe("Link copiato.");
});
