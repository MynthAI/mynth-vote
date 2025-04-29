import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { type } from "arktype";
import { mayFail } from "ts-handling";

const Json = type("string").pipe((v, ctx) => {
  const parsed = mayFail(() => JSON.parse(v));
  return parsed.ok ? parsed.data : ctx.error("valid JSON");
});
const PackageJson = Json.pipe(type({ version: "string" }));

const here = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(here, "..", "package.json");
const packageJson = PackageJson.assert(readFileSync(packageJsonPath, "utf-8"));

const version = packageJson.version;

export default version;
