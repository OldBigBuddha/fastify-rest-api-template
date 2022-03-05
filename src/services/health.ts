import { Service } from "fastify-decorators";

import * as Repository from "db/helper";

export const HealthServiceToken = Symbol("HealthService");

@Service(HealthServiceToken)
export default class HealthService {
  async getPing(): Promise<void> {
    await Repository.ping();
  }
}
