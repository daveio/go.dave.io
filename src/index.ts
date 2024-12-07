import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Go } from "./endpoints/go";
import { Ping } from "./endpoints/ping";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/docs",
});

// Register OpenAPI endpoints
openapi.get("/ping", Ping);
openapi.get("/:slug", Go);
openapi.get("/go/:slug", Go);

// Export the Hono app
export default app;
