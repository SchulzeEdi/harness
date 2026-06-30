import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Scaffold k6 — adapte BASE_URL e os fluxos criticos (inclua o de receita).
const errorRate = new Rate("errors");
const latency = new Trend("latency_ms", true);

const BASE = __ENV.BASE_URL || "http://localhost:3000";
const RATE = Number(__ENV.RATE || 200); // RPS alvo

export const options = {
  scenarios: {
    rampa: {
      executor: "ramping-arrival-rate",
      startRate: Math.round(RATE / 4),
      timeUnit: "1s",
      preAllocatedVUs: 50,
      maxVUs: 500,
      stages: [
        { target: RATE, duration: "1m" },        // nominal
        { target: RATE * 2, duration: "1m" },    // 2x
        { target: RATE * 5, duration: "1m" },    // 5x
        { target: RATE * 10, duration: "1m" },   // 10x
      ],
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<300"], // meta p95
    errors: ["rate<0.01"],            // meta erro < 1%
  },
};

export default function () {
  const res = http.get(`${BASE}/api/health`);
  latency.add(res.timings.duration);
  errorRate.add(res.status >= 400);
  check(res, { "status 2xx/3xx": (r) => r.status < 400 });
  sleep(0.1);
}
