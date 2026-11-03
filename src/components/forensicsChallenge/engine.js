// Fictional evidence only. Commands never access the visitor's device or network.
export const evidence = {
  "baseline.txt": `SERVICE: portal.civic.example (public web portal)\nPROTECTION: WAF in blocking mode\nAPPROVED MONITORING: 198.51.100.25, GET /health every 5 minutes\nNOTE: /admin is not a public application route.\nSCOPE: evidence collected from 10:00 to 10:08 UTC.`,
  "ticket.txt": `SOC TICKET: WEB-042\nSCOPE: Investigate the heavily reported source targeting the public portal.\nFOCUS: Identify its blocked attack categories and the /admin request that reached the application.\nCHECK: Correlate request IDs and client responses with the origin logs.\nEVIDENCE LIMIT: This snapshot does not include host forensics or database audit logs.`,
  "waf.log": `[10:00:00] req=m001 src=198.51.100.25 method=GET uri=/health rule=NONE action=PASS client_status=200
[10:01:12] req=w101 src=203.0.113.77 method=GET uri=/search?q=%27%20OR%201%3D1-- rule=SQL_INJECTION action=BLOCK client_status=403
[10:01:38] req=w102 src=203.0.113.77 method=GET uri=/download?file=..%2F..%2Fetc%2Fpasswd rule=PATH_TRAVERSAL action=BLOCK client_status=403
[10:02:10] req=w103 src=203.0.113.77 method=GET uri=/admin rule=NONE action=PASS client_status=404
[10:02:41] req=w104 src=203.0.113.77 method=GET uri=/search?q=%27%20UNION%20SELECT%20NULL-- rule=SQL_INJECTION action=BLOCK client_status=403
[10:03:07] req=w105 src=203.0.113.77 method=GET uri=/api/export?path=..%2F..%2Fetc%2Fpasswd rule=PATH_TRAVERSAL action=BLOCK client_status=403
[10:03:30] req=w201 src=203.0.113.120 method=GET uri=/search?q=%3Cscript%3E rule=XSS action=BLOCK client_status=403
[10:04:18] req=w106 src=203.0.113.77 method=GET uri=/robots.txt rule=NONE action=PASS client_status=404
[10:05:00] req=m002 src=198.51.100.25 method=GET uri=/health rule=NONE action=PASS client_status=200`,
  "origin.log": `[10:00:00] req=m001 route=/health status=200
[10:02:10] req=w103 route=/admin status=404
[10:04:18] req=w106 route=/robots.txt status=404
[10:05:00] req=m002 route=/health status=200
NOTE: This log records requests received by the application.`,
  "threat-intel.txt": `INDICATOR: 203.0.113.77\nREPORTS: 86 reports from 21 independent sources in the past 30 days\nTAGS: web-scanning, injection-attempts\nLAST SEEN: 2 hours before the incident\nASSESSMENT: high-risk source; reputation alone does not prove an attack succeeded.\n\nINDICATOR: 203.0.113.120\nREPORTS: 2 reports in the past 30 days\nTAGS: automated-probing\n\nINDICATOR: 198.51.100.25\nASSESSMENT: approved monitoring source (see baseline.txt).`
};

export const mailEvidence = {
  "ticket.txt": `SOC TICKET: MAIL-018\nSCOPE: Investigate a reported invoice email and determine what happened to message m-481.\nCHECK: Compare the displayed sender, authentication results, URL and mail gateway action.\nEVIDENCE LIMIT: Click-tracking and recipient interviews are not available in this snapshot.`,
  "message.txt": `MESSAGE: m-481\nFROM: invoices@vendor.example\nREPLY-TO: accounts@billing-update.example\nSUBJECT: Urgent: outstanding invoice\nBODY: Review the invoice at https://login.billing-update.example/signin\nNOTE: The displayed sender claims to be a known supplier.`,
  "auth-results.txt": `MESSAGE: m-481\nHEADER-FROM: vendor.example\nENVELOPE-FROM: billing-update.example\nSPF: pass for billing-update.example (not aligned with header-from)\nDKIM: fail for vendor.example\nDMARC: fail (no aligned passing SPF or DKIM)`,
  "gateway.log": `[11:20:03] message=m-481 recipient=employee@corp.example verdict=phishing action=quarantine delivery=quarantined\n[11:21:11] message=m-482 recipient=employee@corp.example verdict=clean action=deliver delivery=inbox\nNOTE: Gateway actions do not establish whether an earlier message was clicked.`,
  "url-intel.txt": `INDICATOR: login.billing-update.example\nREPORTS: 18 reports in 7 days\nTAGS: credential-phishing, supplier-impersonation\nNOTE: Reputation supports investigation; it does not establish that credentials were entered.`
};

function findFile(files, name) {
  return Object.prototype.hasOwnProperty.call(files, name) ? files[name] : null;
}

export function execute(command, scenario = "web") {
  const files = scenario === "mail" ? mailEvidence : evidence;
  const parts = command.trim().split(/\s+/);
  const verb = (parts[0] || "").toLowerCase();
  if (!verb) return {type: "empty"};
  if (verb === "help" && parts.length === 1) return {type: "help"};
  if (verb === "ls" && parts.length === 1) return {type: "text", text: Object.keys(files).join("   ")};
  if (verb === "clear" && parts.length === 1) return {type: "clear"};
  if (verb === "hint" && parts.length === 1) return {type: "hint"};
  if (verb === "cat" && parts.length === 2) {
    const file = findFile(files, parts[1]);
    return file === null ? {type: "notFound"} : {type: "text", text: file};
  }
  if (verb === "grep" && parts.length === 3) {
    const file = findFile(files, parts[2]);
    if (file === null) return {type: "notFound"};
    const lines = file.split("\n").filter(line => line.toLowerCase().includes(parts[1].toLowerCase()));
    return lines.length ? {type: "text", text: lines.join("\n")} : {type: "noResults"};
  }
  return {type: "unknown"};
}

export function validateAnswers(scenario, values, actions) {
  const value = key => (values[key] || "").trim().toLowerCase();
  const errors = [];
  if (scenario === "web") {
    if (value("ip") !== "203.0.113.77") errors.push("ip");
    const types = [value("attack1"), value("attack2")];
    if (!(types.includes("sqli") && types.includes("traversal"))) errors.push("attacks");
    if (value("request") !== "w103") errors.push("request");
    if (value("http") !== "404") errors.push("http");
  } else {
    if (value("domain") !== "login.billing-update.example") errors.push("domain");
    if (value("dmarc") !== "fail") errors.push("dmarc");
    if (value("delivery") !== "quarantined") errors.push("delivery");
  }
  if (value("outcome") !== "unconfirmed") errors.push("outcome");
  if (!["document", "investigate", "contain"].every(action => actions.includes(action)) || actions.includes("dismiss")) errors.push("actions");
  return errors;
}
