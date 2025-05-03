import { OpenAPIRoute, Str } from "chanfana"
import type { Context } from "hono"
import { z } from "zod"

// Define interfaces for the response structure
interface RedirectResponse {
  success: boolean
  redirect: {
    url: string
  }
}

export class Go extends OpenAPIRoute {
  schema = {
    tags: ["Go"],
    summary: "Redirect to a URL by slug",
    request: {
      params: z.object({
        slug: Str({ description: "Redirect slug" })
      }),
      query: z.object({
        fbclid: Str({ description: "Facebook Click ID", required: false })
      })
    },
    responses: {
      "302": {
        description: "Redirects to a URL"
      },
      "404": {
        description: "Redirect not found"
      }
    }
  }

  async handle(_c: Context): Promise<Response> {
    const data = await this.getValidatedData<typeof this.schema>()
    const { slug } = data.params
    const response = await fetch(`https://api.dave.io/redirect/${slug}`)
    if (response.ok) {
      const result = await this.parseResponse(response)
      if (result.success) {
        return Response.redirect(result.redirect.url, 302)
      }
    }
    return new Response(null, { status: 404 })
  }

  async parseResponse(response: Response): Promise<RedirectResponse> {
    return (await response.json()) as RedirectResponse
  }
}
