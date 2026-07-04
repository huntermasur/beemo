import path from "node:path";
import { renderDir } from "../template.js";
import type { BMOConfig } from "../config.js";

/** Generate Dockerfile, docker-compose.yml, nginx.conf and .dockerignore. */
export async function dockerStep(config: BMOConfig): Promise<void> {
  renderDir("docker", config.targetDir, { projectName: config.projectName });
}
