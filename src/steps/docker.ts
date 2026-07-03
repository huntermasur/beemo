import path from "node:path";
import { renderDir } from "../template.js";
import type { BeemoConfig } from "../config.js";

/** Generate Dockerfile, docker-compose.yml, nginx.conf and .dockerignore. */
export async function dockerStep(config: BeemoConfig): Promise<void> {
  renderDir("docker", config.targetDir, { projectName: config.projectName });
}
