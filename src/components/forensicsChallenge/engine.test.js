import {execute, validateAnswers} from "./engine";

test("evidence distinguishes suspicious traffic, WAF blocks and forwarded requests", () => {
  const files = execute("ls").text;
  for (const file of ["ticket.txt", "baseline.txt", "waf.log", "origin.log", "threat-intel.txt"]) expect(files).toContain(file);
  expect(execute("cat ticket.txt").text).toContain("/admin");
  expect(execute("cat baseline.txt").text).toContain("198.51.100.25");
  expect(execute("cat threat-intel.txt").text).toContain("86 reports");
  expect(execute("grep SQL_INJECTION waf.log").text).toContain("action=BLOCK client_status=403");
  expect(execute("grep PATH_TRAVERSAL waf.log").text).toContain("action=BLOCK client_status=403");
  expect(execute("grep XSS waf.log").text).toContain("src=203.0.113.120");
  expect(execute("grep w103 waf.log").text).toContain("action=PASS client_status=404");
  expect(execute("grep w103 origin.log").text).toContain("status=404");
  expect(execute("grep w101 origin.log").type).toBe("noResults");
});

test("web report checks each finding and operational actions", () => {
  const correct = {ip: "203.0.113.77", attack1: "traversal", attack2: "sqli", request: "W103", http: "404", outcome: "unconfirmed"};
  const actions = ["document", "investigate", "contain"];
  expect(validateAnswers("web", correct, actions)).toEqual([]);
  expect(validateAnswers("web", {...correct, ip: "198.51.100.25", http: "403"}, actions)).toEqual(["ip", "http"]);
  expect(validateAnswers("web", {...correct, attack2: "xss"}, actions)).toEqual(["attacks"]);
  expect(validateAnswers("web", correct, [...actions, "dismiss"])).toEqual(["actions"]);
  expect(validateAnswers("web", correct, [])).toEqual(["actions"]);
});

test("email evidence and report distinguish authentication, quarantine and uncertainty", () => {
  expect(execute("cat auth-results.txt", "mail").text).toContain("DMARC: fail");
  expect(execute("cat gateway.log", "mail").text).toContain("action=quarantine delivery=quarantined");
  expect(execute("cat waf.log", "mail").type).toBe("notFound");
  const correct = {domain: "login.billing-update.example", dmarc: "fail", delivery: "quarantined", outcome: "unconfirmed"};
  expect(validateAnswers("mail", correct, ["document", "investigate", "contain"])).toEqual([]);
  expect(validateAnswers("mail", {...correct, dmarc: "pass", outcome: "confirmed"}, ["document", "investigate", "contain"])).toEqual(["dmarc", "outcome"]);
});

test("unknown inputs do not read outside the simulated evidence or crash", () => {
  expect(execute("grep nonexistent waf.log").type).toBe("noResults");
  expect(execute("cat /etc/passwd").type).toBe("notFound");
  expect(execute("cat constructor").type).toBe("notFound");
  expect(execute("grep x constructor").type).toBe("notFound");
  expect(execute("ls; whoami").type).toBe("unknown");
  expect(execute("clear").type).toBe("clear");
});
