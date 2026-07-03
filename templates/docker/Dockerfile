# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
# Use the lockfile for reproducible installs when present, otherwise fall back
# to npm install (a project may be scaffolded with --no-install and no lockfile).
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .

# --- dev: Vite dev server with HMR (docker compose up dev) ---
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- build: production bundle ---
FROM base AS build
RUN npm run build

# --- prod: static files behind nginx (docker compose up prod) ---
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
