/// <reference path="astro/types.d.ts" />

import type { D1Database, KVNamespace } from "@cloudflare/workers-types";
import type { Runtime } from "@astrojs/cloudflare";

type ENV = {
  MY_KV: KVNamespace;
  oltp: D1Database;
};

declare namespace App {
  interface Locals extends Runtime<Env> {}
}
