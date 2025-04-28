import { Err, Ok, Result } from "ts-handling";

const runPrompt = async (message: string): Promise<Result<string, string>> => {
  if (!process.stdin.isTTY) return Err("Must be run within a terminal");

  console.log(message);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  let data = "";
  let inputTimeout: NodeJS.Timeout;

  return Ok(
    await new Promise<string>((resolve) => {
      const onDataReceived = (chunk: string) => {
        clearTimeout(inputTimeout);
        data += chunk;
        inputTimeout = setTimeout(() => {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener("data", onDataReceived);
          process.stdout.moveCursor(0, -1);
          process.stdout.clearLine(1);
          resolve(data.replace(/\r/g, "\n").trim());
        }, 500);
      };

      process.stdin.on("data", onDataReceived);
    }),
  );
};

export { runPrompt };
