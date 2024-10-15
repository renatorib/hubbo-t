import { Hubbo } from "@hubbo/core";

export class HubboSeo {
  constructor(hubbo: Hubbo) {
    if (!hubbo.options.config?.baseUrl) {
      throw new Error("You need to set 'config.baseUrl' in order to use HubboSeo");
    }
  }
}
