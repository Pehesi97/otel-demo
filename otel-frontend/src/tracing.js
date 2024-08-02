import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";

const serviceName = "otel-frontend";

const provider = new WebTracerProvider({
  resource: new Resource({
    "service.name": serviceName,
  }),
});

const exporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces",
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations(),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [new RegExp(process.env.REACT_APP_API_BASE_URL.replace("https://", ""))],
    }),
  ],
});

console.log("OpenTelemetry tracing initialized");