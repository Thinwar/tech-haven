import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const indexPath = path.join(distDir, "index.html");
const port = Number(process.env.PORT || 8080);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const sendFile = (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(res);
};

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const normalizedPath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = path.join(distDir, normalizedPath);

  if (
    existsSync(requestedPath) &&
    statSync(requestedPath).isFile() &&
    requestedPath.startsWith(distDir)
  ) {
    sendFile(res, requestedPath);
    return;
  }

  if (existsSync(indexPath)) {
    sendFile(res, indexPath);
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  const message =
    "Build output not found. Run `npm run build` before starting the server.";
  res.end(message);
});

server.listen(port, "0.0.0.0", async () => {
  let note = "";

  if (!existsSync(indexPath)) {
    note =
      " Warning: dist/index.html is missing. The service will return 500 until the build runs.";
  }

  console.log(`Server listening on port ${port}.${note}`);
});
