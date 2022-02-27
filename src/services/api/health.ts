import { Service } from "fastify-decorators";

import * as Repository from "infraarchitecture/repositories/Repository";

export const HealthServiceToken = Symbol("HealthService");

@Service(HealthServiceToken)
export default class HealthService {
  async getPing(): Promise<void> {
    await Repository.ping();
  }
}
