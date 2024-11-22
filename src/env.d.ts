/// <reference path="../.astro/types.d.ts" />

import type { D1Database } from "@cloudflare/workers-types";

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;

type ENV = {
  // replace `MY_KV` with your KV namespace
  MY_KV: KVNamespace;
  oltp: D1Database;
};

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}