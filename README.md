# GrowWise 🌱

GrowWise is an AI-assisted gardening planner that turns a gardener's location, growing space, sunlight, and plant choices into practical weekly care tasks.

## MVP features

- SEO-friendly public landing page and plant guide routes using the Next.js App Router.
- Garden profile form and dashboard experience.
- Weekly care plan generation with deterministic, transparent starter rules.
- AI Garden Coach for plant-care questions, yellowing leaves, possible pests, watering, and beginner guidance.
- Quick prompts and actionable responses with an explicit model-vs-fallback label.
- Optional FastAPI AI service for open-weight model integration.
- PostgreSQL + Prisma data model.
- Docker Compose for local PostgreSQL and the AI service.
- Deployable Next.js app suitable for DigitalOcean App Platform.

> This is a starter MVP, not an agronomic diagnostic tool. Recommendations are general guidance. Verify local planting dates and pesticide/plant-health decisions with trusted local horticultural sources.

## Architecture

- `apps/web`: Next.js, TypeScript, App Router, Tailwind CSS.
- `apps/ai-service`: Python + FastAPI. Uses a configurable OpenAI-compatible endpoint if provided; otherwise returns a clearly labeled deterministic local response.
- `prisma/schema.prisma`: PostgreSQL data model.
- `docker-compose.yml`: local PostgreSQL and AI service.

The AI service is optional. The web app works without it. The `/advisor` page calls `/api/recommend`, which forwards validated requests to FastAPI. Responses clearly distinguish configured model output from fallback guidance. For the simplest model-backed local run, start Ollama on the host and configure the endpoint in the root `.env` before running `docker compose up --build`.

## Requirements

- Node.js 20.9+
- npm
- Python 3.11+ (only for the AI service)
- Docker (recommended for PostgreSQL)

## Quick start

### 1. Configure environment

```bash
cp apps/web/.env.example apps/web/.env
```

Set `DATABASE_URL` to your PostgreSQL connection string. For local development with Docker Compose, use:

```env
DATABASE_URL="postgresql://growwise:growwise_dev_password@localhost:5432/growwise?schema=public"
AI_SERVICE_URL="http://localhost:8001"
```

### 2. Start an open-weight model (recommended for the AI Coach)

For a local-first setup, install [Ollama](https://ollama.com/) and pull a small open-weight model, for example:

```bash
ollama pull qwen2.5:3b
ollama serve
```

Keep Ollama running. In the repository root, copy `.env.example` to `.env`. The sample endpoint is set up for the AI service running in Docker to reach Ollama on the host. If you run FastAPI directly on your host, set `MODEL_API_BASE_URL=http://localhost:11434/v1` instead. Check the selected model's license and hardware needs before using it.

### 3. Start PostgreSQL and AI service

From the repository root:

```bash
docker compose up -d postgres
```

To start the AI service locally:

```bash
cd apps/ai-service
python -m venv .venv
source .venv/bin/activate # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Or run the AI service and PostgreSQL with Docker Compose (the model runtime remains on your host):

```bash
docker compose up --build
```

### 4. Start the Next.js app

```bash
cd apps/web
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000 and visit `/advisor` to use the AI Garden Coach. The Coach result indicates whether it came from the configured model or from fallback guidance.

The homepage and plant guides work without a database. The garden planner currently uses local form state and a deterministic care-plan engine; persistence endpoints and Prisma models are provided as a foundation for the next iteration.

## Open-weight AI

The AI service intentionally does not bundle model weights. Configure an OpenAI-compatible inference endpoint using environment variables for the AI service (for Docker Compose, put these in a root `.env`; for local Uvicorn, export them in the shell or load them with your preferred environment-file tool):

```env
MODEL_API_BASE_URL=http://host.docker.internal:11434/v1
MODEL_API_KEY=not-needed-for-local
MODEL_NAME=your-open-weight-model
```

This can point at a local runtime such as LM Studio or another compatible inference server, or a hosted inference endpoint. Keep credentials server-side. Check the selected model's license, usage restrictions, and hardware requirements before deployment.

If no endpoint is configured, `/recommend` returns a safe starter recommendation and labels it as a fallback. Do not present fallback output as model-generated.

## Database

The Prisma schema includes users, gardens, plants, garden plants, care tasks, and observations. Authentication is not wired in this MVP; do not deploy private user data publicly until authentication, authorization, validation, rate limiting, and database migrations are completed.

For a local schema sync:

```bash
cd apps/web
npx prisma db push
```

For production, use reviewed Prisma migrations rather than `db push`.

## DigitalOcean deployment

Suggested initial deployment:

1. Push this repository to GitHub.
2. Create a managed PostgreSQL database in DigitalOcean.
3. Create an App Platform app from the repository.
4. Configure the web component to use `apps/web` as its source directory, with build command `npm run build` and run command `npm run start` (or use the included Dockerfile).
5. Set `DATABASE_URL` and `AI_SERVICE_URL` as App Platform environment variables.
6. Deploy the AI service as a separate container component if you use remote inference.
7. Configure health checks and keep secrets in platform environment variables.

The included `apps/web/Dockerfile` builds the Next.js application as a standalone container. If deploying via Dockerfile, ensure the build context and Prisma generation are configured as in the file.

DigitalOcean costs and bounty eligibility depend on the current program rules and selected resources. Confirm current terms before relying on credits.

## Project structure

```text
growwise/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── prisma/           # Prisma schema is at repository root
│   │   ├── public/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── ai-service/
├── prisma/
├── docker-compose.yml
└── README.md
```

## Roadmap

- [ ] Add authentication and per-user authorization.
- [ ] Add expert-reviewed evaluation cases for Garden Coach outputs.
- [ ] Add response provenance and model/runtime details to the UI.
- [ ] Connect garden forms and task completion to PostgreSQL.
- [ ] Integrate weather and authoritative local planting data.
- [ ] Add image-based plant symptom triage with uncertainty and safety guardrails.
- [ ] Add unit, integration, and end-to-end tests.
- [ ] Add offline PWA support for saved plans and observations.
- [ ] Add privacy policy, accessibility review, and deployment monitoring.

## License

MIT for this project's original code unless a file states otherwise. Any separately downloaded model weights, datasets, images, or external services retain their own licenses and terms.
