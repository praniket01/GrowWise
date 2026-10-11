# GrowWise 🌱

**Short description:** GrowWise is an AI-powered gardening companion
that turns personalized plant-care advice into simple outdoor actions,
helping people grow plants and spend more time outside.

## The problem

People who want to start gardening often struggle to know what to grow,
how to care for it, and what action to take next. Advice is scattered
across websites and can be too generic for a person's growing space,
sunlight, plant symptoms, and experience level. Many gardening apps
provide information, but don't consistently turn it into small,
achievable real-world actions.

## Our solution

GrowWise brings gardening guidance, planning, symptom investigation, and
outdoor missions into one experience. It combines a web app with an AI
service so users can ask gardening questions, explore practical care
guidance, and turn that guidance into actions they can complete and
reflect on.

## Features

-   **AI Garden Coach:** Ask gardening questions and receive practical
    suggestions based on details such as growing space, sunlight,
    plants, and goals. Model-generated responses are intended as general
    guidance, not professional diagnosis.
-   **Garden Planner:** Create a starter care plan with practical,
    rule-based tasks.
-   **Plant Guide Library:** Browse plant information through public,
    search-friendly pages.
-   **Touch Grass Missions:** Explore short outdoor gardening
    activities, mark missions complete, record reflections, and track
    time spent outdoors.
-   **Plant Health Investigator:** Work through a guided, rule-based
    checklist for common symptoms, possible causes, and safer next
    steps. It does not provide a definitive plant diagnosis.
-   **Garden Memory Journal:** Record plant observations, search
    entries, review a timeline, delete entries, and export records as
    JSON.
-   **Responsive web experience:** Built with Next.js and designed to
    work across desktop and mobile layouts.

### Current implementation notes

Mission completion, reflections, and journal entries are stored in
browser `localStorage` in the current implementation. They are local to
that browser and are not synchronized to PostgreSQL or across devices.
The planner currently uses deterministic starter rules. Features should
be described as prototypes where applicable; don't present fallback
guidance as model-generated output.

## AI model

The local development setup uses **Qwen2.5 3B (`qwen2.5:3b`)**, served
through **Ollama**. The Python FastAPI service calls an
OpenAI-compatible chat-completions endpoint using environment variables:

-   `MODEL_API_BASE_URL`
-   `MODEL_API_KEY`
-   `MODEL_NAME`

For the documented local Docker setup, Ollama runs on the host computer
and the AI service runs in Docker, so the base URL is:

``` env
MODEL_API_BASE_URL=http://host.docker.internal:11434/v1
MODEL_API_KEY=not-needed-for-local
MODEL_NAME=qwen2.5:3b
```

Model weights are not bundled with this repository and must be
downloaded separately. A compatible hosted inference endpoint can be
configured instead, subject to its terms, cost, privacy requirements,
and model license. Keep real credentials in environment variables; never
commit `.env` files.

## Technology stack

-   **Frontend:** Next.js, React, TypeScript
-   **AI API:** Python, FastAPI, HTTPX
-   **Database foundation:** PostgreSQL and Prisma
-   **Local services:** Docker Compose
-   **Local model runtime:** Ollama with Qwen2.5 3B
-   **Deployment:** DigitalOcean (deployment configuration and
    environment values depend on the chosen DigitalOcean resources)

## Deployment on DigitalOcean

GrowWise is intended to be deployed on **DigitalOcean**. The web app can
be deployed through DigitalOcean App Platform or a compatible
container-based setup. The web app, AI service, and database may need
separate components depending on the selected deployment architecture.

Configure the deployment with the appropriate environment variables,
including:

-   `DATABASE_URL` --- connection string for the deployed PostgreSQL
    database.
-   `AI_SERVICE_URL` --- reachable URL for the deployed FastAPI service.
-   `MODEL_API_BASE_URL`, `MODEL_API_KEY`, and `MODEL_NAME` ---
    inference endpoint settings for the AI service.

**Deployment note:** The local URL
`http://host.docker.internal:11434/v1` is for local development and
should not be copied blindly into a cloud deployment. The deployed AI
service needs a model endpoint it can actually reach. If using a
separately hosted model runtime, configure its endpoint and credentials
securely. Set health checks, review logs, restrict access to internal
services, and avoid exposing secrets.

Add the public DigitalOcean deployment URL here once finalized: **Live
demo:** `https://<your-deployed-domain>`

## Run locally

### Requirements

-   Node.js and npm
-   Docker Desktop and Docker Compose
-   Ollama (for local model inference)

### 1. Configure environment files

Create `growwise/.env` from the root `.env.example` and configure the
model variables above.

Create `apps/web/.env` from `apps/web/.env.example`. A typical local
configuration is:

``` env
DATABASE_URL="postgresql://growwise:growwise_dev_password@localhost:5432/growwise?schema=public"
AI_SERVICE_URL="http://localhost:8001"
```

Use the actual templates in the repository as the source of truth for
variable names. Never commit your real `.env` files.

### 2. Start Ollama and download the model

``` bash
ollama pull qwen2.5:3b
ollama serve
```

If Ollama is already running as a desktop service, you may not need to
start it again.

### 3. Start the database and AI service

From the repository root:

``` bash
docker compose up --build -d
```

### 4. Start the web app

``` bash
cd apps/web
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open `http://localhost:3000`.

Useful local routes:

-   `/advisor` --- AI Garden Coach
-   `/planner` --- Garden Planner
-   `/plants` --- Plant Guide Library
-   `/missions` --- Touch Grass Missions
-   `/health-check` --- Plant Health Investigator
-   `/journal` --- Garden Memory Journal

## Safety and limitations

GrowWise provides educational gardening information and should not be
treated as a certified horticultural diagnosis service. Recommendations
can be wrong or incomplete; check local growing conditions and trusted
horticultural sources, especially for plant disease, pesticide, pet, and
food-safety decisions. Weather-aware recommendations, authoritative
regional planting calendars, authentication, and cross-device
persistence should only be advertised as available once implemented and
verified.

## Contributing

Contributions are welcome. Before opening a pull request:

1.  Explain the problem or improvement.
2.  Keep recommendations transparent and avoid unsupported horticultural
    claims.
3.  Test the affected route and its error states.
4.  Never commit credentials, `.env` files, or private user data.

## License

See the repository's `LICENSE` file for the applicable license.
