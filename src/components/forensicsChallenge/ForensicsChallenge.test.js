import React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import i18n from "../../i18n";
import ForensicsChallenge from "./ForensicsChallenge";

let container;
beforeEach(async () => {
  await i18n.changeLanguage("it");
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => { ReactDOM.render(<ForensicsChallenge />, container); });
});
afterEach(() => {
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  container.remove();
});
function click(text) {
  const button = [...container.querySelectorAll("button")].find(item => item.textContent === text);
  expect(button).toBeDefined();
  act(() => { Simulate.click(button); });
}
function change(id, value) {
  act(() => { Simulate.change(container.querySelector(`#answer-${id}`), {target: {value}}); });
}
function checkActions(indices) {
  const boxes = container.querySelectorAll('.forensics-actions input[type="checkbox"]');
  indices.forEach(index => act(() => { Simulate.change(boxes[index], {target: {checked: true}}); }));
}
function submitReport() {
  act(() => { Simulate.submit(container.querySelector(".forensics-answer-form")); });
}

test("web report provides targeted feedback, accepts correct answers and restarts", () => {
  click("cat waf.log");
  expect(container.querySelector('[role="log"]').textContent).toContain("SQL_INJECTION");
  change("ip", "203.0.113.77");
  change("attack1", "traversal"); change("attack2", "sqli");
  change("request", "w103"); change("http", "403"); change("outcome", "unconfirmed");
  checkActions([0, 1, 2]);
  submitReport();
  expect(container.textContent).toContain("Controlla la risposta dell’applicazione");
  expect(container.querySelector("#answer-http").getAttribute("aria-invalid")).toBe("true");
  expect(container.querySelector("#answer-ip").getAttribute("aria-invalid")).toBe("false");
  change("http", "404"); submitReport();
  expect(container.textContent).toContain("CASO RISOLTO");
  expect(container.textContent).toContain("non confermano una compromissione");
  click("Ricomincia");
  expect(container.textContent).toContain("IN CORSO");
  expect(container.querySelector("#answer-ip").value).toBe("");
});

test("email scenario is independent and can be completed after switching languages", async () => {
  change("ip", "203.0.113.77");
  click("Email sospetta");
  expect(container.querySelector("#answer-ip")).toBeNull();
  click("cat auth-results.txt");
  expect(container.textContent).toContain("DMARC: fail");
  await act(async () => { await i18n.changeLanguage("en"); });
  expect(container.textContent).toContain("An urgent invoice");
  change("domain", "login.billing-update.example");
  change("dmarc", "fail"); change("delivery", "quarantined"); change("outcome", "unconfirmed");
  checkActions([0, 1, 2]); submitReport();
  expect(container.textContent).toContain("CASE SOLVED");
  expect(container.textContent).toContain("neither confirms nor rules out credential entry");
  click("Web attacks");
  expect(container.querySelector("#answer-ip").value).toBe("");
});
