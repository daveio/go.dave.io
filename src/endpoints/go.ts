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
    let dest = fetchURL(slug);
    dest.then((url) => {
      if (url === null) {
        return Response.json({}, { status: 404 });
      } else if (typeof url === "string") {
        return Response.redirect(url, 302);
      } else {
        return Response.json({}, { status: 500 });
      }
    });
  }
}

async function fetchURL(slug) {
  return "https://fartbox.org";
}
