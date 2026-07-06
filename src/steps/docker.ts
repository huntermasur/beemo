import type { NEPTRConfig } from "../config.js";
import { renderDir } from "../template.js";

/** Generate Dockerfile, docker-compose.yml, nginx.conf and .dockerignore. */
export async function dockerStep(config: NEPTRConfig): Promise<void> {
  renderDir("docker", config.targetDir, { projectName: config.projectName });
}
