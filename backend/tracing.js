const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { Resource } = require("@opentelemetry/resources");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const serviceName = "backend";

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    "service.name": serviceName,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318/v1/traces",
  }),
  instrumentations: [getNodeAutoInstrumentations(), new HttpInstrumentation()],
});
sdk.start();