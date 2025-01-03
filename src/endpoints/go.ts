import { OpenAPIRoute, Str } from "chanfana";
import { any, z } from "zod";

export class Go extends OpenAPIRoute {
	schema = {
		tags: ["Go"],
		summary: "Redirect to a URL by slug",
		request: {
			params: z.object({
				slug: Str({ description: "Redirect slug" }),
			}),
			// query: z.object({ fbclid: Str({ description: "Facebook Click ID" }) }),
		},
		responses: {
			"302": {
				description: "Redirects to a URL",
			},
			"404": {
				description: "Redirect not found",
			},
		},
	};

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>();
		const { slug } = data.params;
		const response = await fetch(`https://api.dave.io/url/${slug}`);
		if (response.ok) {
			const result = await this.parseResponse(response);
			if (result.success) {
				return Response.redirect(result.redirect.url, 302);
			}
		}
		return new Response(null, { status: 404 });
	}

	async parseResponse(response) {
		return await response.json();
	}
}
