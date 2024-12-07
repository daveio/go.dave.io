import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Ping } from "./endpoints/ping";
import { Go } from "./endpoints/go";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/go/docs",
});

// Register OpenAPI endpoints
openapi.get("/ping", Ping);
openapi.get("/go/ping", Ping);
openapi.get("/:slug", Go);
openapi.get("/go/:slug", Go);

// Export the Hono app
export default app;
