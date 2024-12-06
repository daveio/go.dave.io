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
    // dest.then((url) => {
    if (dest === null) {
      return Response.json({}, { status: 404 });
    } else if (typeof dest === "string") {
      return Response.redirect(dest, 302);
    } else {
      return Response.json({ dest }, { status: 500 });
    }
    //});
  }
}

async function fetchURL(slug) {
  let dest = await fetch("https://api.dave.io/url/" + slug);
  if (dest.ok) {
    let json = dest.json().then((data) => {
      return data.redirect.url;
    });
    return json;
  } else {
    return null;
  }
}
