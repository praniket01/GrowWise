# GrowWise architecture

## Principles

1. The product should help a gardener take a real-world action, not keep them chatting.
2. The AI must be identifiable as model output and should be grounded in reliable data as integrations are added.
3. Avoid claiming a planting calendar is locally accurate until a trusted location-specific data source is integrated.
4. Keep credentials and inference calls server-side.
5. Keep user data private; authentication and authorization are required before multi-user production use.

## Request flow

1. Browser requests public pages from Next.js.
2. Next.js renders plant guide content and metadata on the server.
3. Planner form creates a starter plan in the browser.
4. The AI Garden Coach sends a structured question to Next.js `/api/recommend`.
5. Next.js validates the payload and forwards it to FastAPI.
6. FastAPI calls an OpenAI-compatible model endpoint when configured, otherwise returns a clearly marked fallback.
7. PostgreSQL/Prisma models define the intended persistent domain.

## Open AI approach

The service supports an OpenAI-compatible endpoint. This allows a developer to use a local runtime or a hosted inference provider without binding the application to one model vendor. The model is not bundled; users must obtain model weights from their chosen provider and comply with the relevant license.

## Next steps

- Implement authentication and authorization.
- Persist planner data using Prisma.
- Add verified weather and horticultural data sources.
- Add provenance and timestamps to recommendation context.
- Add request limits and prompt-injection defenses.
- Evaluate recommendations with a small expert-reviewed test set.
