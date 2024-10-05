# otel-demo

![OpenTelemetry logo](https://github.com/user-attachments/assets/cfce0930-5da9-46ad-aa1a-156a21217ed3)

This repository is an example on how to use OpenTelemetry for tracing requests made to distributed applications. In this case, we have a frontend and a backend that communicate, and OpenTelemetry is registering events for the requests sent from the frontend to backend, as well as browser events.

This setup can be considered one of the most basic and straightforward ways to start with OpenTelemetry, since it describes a very common use-case (2-tier application). It is also very accessible since it uses Grafana Cloud (which has a free plan) as the monitoring solution.

Feel free to fork the repository, or use it as a base for your instrumentations.
