import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {execute, validateAnswers} from "./engine";
import ShareChallenge from "./ShareChallenge";
import "./ForensicsChallenge.scss";

export default function ForensicsChallenge({standalone = false}) {
  const {t, i18n} = useTranslation();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [solved, setSolved] = useState(false);
  const [scenario, setScenario] = useState("web");
  const [values, setValues] = useState({});
  const [actions, setActions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const outputRef = useRef(null);
  const Heading = standalone ? "h1" : "h2";

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);

  function run(value) {
    const input = value.trim();
    if (!input) return;
    const result = execute(input, scenario);
    setCommand("");
    if (result.type === "clear") {
      setHistory([]);
      return;
    }
    if (result.type === "success") setSolved(true);
    setHistory(previous => [...previous, {input, ...result}].slice(-30));
  }

  function reset() {
    setHistory([]);
    setCommand("");
    setSolved(false);
    setValues({});
    setActions([]);
    setFeedback(null);
  }

  const fields = scenario === "web"
    ? [
        {id: "ip"}, {id: "attack1", group: "attacks", options: ["sqli", "traversal", "xss", "rce"]},
        {id: "attack2", group: "attacks", options: ["sqli", "traversal", "xss", "rce"]},
        {id: "request"}, {id: "http", inputMode: "numeric"},
        {id: "outcome", options: ["confirmed", "unconfirmed"]}
      ]
    : [
        {id: "domain"}, {id: "dmarc", options: ["pass", "fail"]},
        {id: "delivery", options: ["delivered", "quarantined", "blocked"]},
        {id: "outcome", options: ["confirmed", "unconfirmed"]}
      ];

  function evaluate(event) {
    event.preventDefault();
    const errors = validateAnswers(scenario, values, actions);
    setFeedback(errors);
    setSolved(errors.length === 0);
  }

  return (
    <section className="main forensics" id="challenge" aria-labelledby="challenge-title">
      <div className="forensics-intro">
        <p className="forensics-eyebrow">{t("challenge.eyebrow")}</p>
        <Heading id="challenge-title">{t("challenge.title")}</Heading>
        <p>{t("challenge.intro")}</p>
        <ShareChallenge />
      </div>
      <div className="forensics-scenarios" role="group" aria-label={t("challenge.chooseScenario")}>
        {["web", "mail"].map(item => (
          <button key={item} type="button" aria-pressed={scenario === item} onClick={() => { if (item !== scenario) { reset(); setScenario(item); } }}>
            {t(`challenge.scenario.${item}`)}
          </button>
        ))}
      </div>
      <div className="forensics-layout">
        <div className="forensics-brief">
          <span className="forensics-label">{t(`challenge.${scenario}.label`)}</span>
          <h3>{t(`challenge.${scenario}.title`)}</h3>
          <p>{t(`challenge.${scenario}.brief`)}</p>
          <p>{t("challenge.formInstructions")}</p>
          <p className="forensics-note">{t("challenge.note")}</p>
          <button type="button" className="forensics-reset" onClick={reset}>{t("challenge.reset")}</button>
        </div>
        <div className="forensics-terminal" lang={i18n.resolvedLanguage || "en"}>
          <div className="terminal-bar"><span aria-hidden="true">● ● ●</span><span>evidence / {scenario === "web" ? "web-portal" : "email"}</span><span className="terminal-status">{solved ? t("challenge.solved") : t("challenge.inProgress")}</span></div>
          <div className="terminal-output" ref={outputRef} role="log" aria-label={t("challenge.outputLabel")} aria-live="polite">
            <p className="terminal-welcome">{t("challenge.welcome")}</p>
            {history.map((entry, index) => (
              <div className="terminal-entry" key={index}>
                <div className="terminal-command"><span aria-hidden="true">analyst@lab:~$ </span>{entry.input}</div>
                <pre>{entry.type === "text" ? entry.text : entry.type === "hint" ? t(`challenge.${scenario}.hint`) : t(`challenge.result.${entry.type}`)}</pre>
              </div>
            ))}
          </div>
          <form className="terminal-form" onSubmit={event => {event.preventDefault(); run(command);}}>
            <label htmlFor="terminal-command" className="terminal-prompt" aria-hidden="true">$</label>
            <input id="terminal-command" aria-label={t("challenge.inputLabel")} placeholder={t("challenge.inputPlaceholder")} autoComplete="off" autoCapitalize="none" spellCheck="false" value={command} onChange={event => setCommand(event.target.value)} />
            <button type="submit">{t("challenge.run")}</button>
          </form>
          <div className="terminal-shortcuts" aria-label={t("challenge.shortcuts")}>
            {(scenario === "web" ? ["help", "ls", "cat ticket.txt", "cat baseline.txt", "cat waf.log", "cat origin.log", "cat threat-intel.txt", "hint"] : ["help", "ls", "cat ticket.txt", "cat message.txt", "cat auth-results.txt", "cat gateway.log", "cat url-intel.txt", "hint"]).map(item => (
              <button key={item} type="button" onClick={() => run(item)}>{item}</button>
            ))}
          </div>
        </div>
      </div>
      <form className="forensics-answer-form" onSubmit={evaluate} noValidate>
        <h3>{t("challenge.answerTitle")}</h3>
        <div className="forensics-fields">
          {fields.map(field => (
            <label key={field.id} htmlFor={`answer-${field.id}`}>
              <span>{t(`challenge.field.${field.id}`)}</span>
              {field.options ? (
                <select id={`answer-${field.id}`} value={values[field.id] || ""} aria-invalid={!!(feedback && feedback.includes(field.group || field.id))} onChange={event => setValues({...values, [field.id]: event.target.value})}>
                  <option value="">{t("challenge.select")}</option>
                  {field.options.map(option => <option key={option} value={option}>{t(`challenge.option.${option}`)}</option>)}
                </select>
              ) : (
                <input id={`answer-${field.id}`} value={values[field.id] || ""} inputMode={field.inputMode || "text"} autoCapitalize="none" autoCorrect="off" spellCheck="false" aria-invalid={!!(feedback && feedback.includes(field.group || field.id))} onChange={event => setValues({...values, [field.id]: event.target.value})} />
              )}
            </label>
          ))}
        </div>
        <fieldset className="forensics-actions">
          <legend>{t("challenge.actionsTitle")}</legend>
          <p>{t("challenge.actionsInstructions")}</p>
          {["document", "investigate", "contain", "dismiss"].map(action => (
            <label key={action}><input type="checkbox" checked={actions.includes(action)} onChange={event => setActions(event.target.checked ? [...actions, action] : actions.filter(item => item !== action))} /> {t(`challenge.action.${action}`)}</label>
          ))}
        </fieldset>
        <button className="forensics-submit" type="submit">{t("challenge.submit")}</button>
        {feedback !== null && (
          <div className={`forensics-feedback${solved ? " is-success" : ""}`} role="status" aria-live="polite">
            {solved ? <><strong>{t("challenge.solved")}</strong><p>{t(`challenge.${scenario}.success`)}</p></> : <><strong>{t("challenge.feedbackTitle")}</strong><ul>{feedback.map(key => <li key={key}>{t(`challenge.feedback.${key}`)}</li>)}</ul></>}
          </div>
        )}
      </form>
    </section>
  );
}
