import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";

export class Go extends OpenAPIRoute {
  schema = {
    tags: ["Go"],
    summary: "Redirect to a URL by slug",
    request: {
      params: z.object({
        slug: Str({ description: "Redirect slug" }),
      }),
    },
    responses: {
      "302": {
        description: "Redirects to a URL",
        content: {},
      },
      "404": {
        description: "Redirect not found",
        content: {},
      },
    },
  };

  async handle(c) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { slug } = data.params;
    const response = await fetch("https://api.dave.io/url/" + slug);
    const result = await fetchURL(response);
    if (result === null) {
      return Response.json({}, { status: 404 });
    } else {
      return Response.json(result, { status: 200 });
      // Response.redirect(url, 302)
    }
    //});
  }
}

async function fetchURL(response) {
  return await response.json();
}
