import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Go } from "./endpoints/go";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/:slug", Go);

// Export the Hono app
export default app;
