/**
 * @title HTTP Server: Serving Files
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-net --allow-read <url>
 * @resource {$std/http/mod.ts} Doc: std/http
 * @resource {/http-server} Example: HTTP Server: Hello World
 *
 * An example of a HTTP server that serves files.
 */

// Import utility methods for serving files with mime types.
import { serveDir, serveFile } from "$std/http/file_server.ts";

// Import the http server from std/http.
import { serve } from "$std/http/server.ts";

// Here we start a simple server
serve((req: Request) => {
  // Get the path from the url (ie. example.com/whatever -> /whatever)
  const pathname = new URL(req.url).pathname;

  if (pathname === "/simple_file") {
    // In the most basic case we can just call this function with the
    // request object and path to the file
    return serveFile(req, "./path/to/file.txt");
  }

  if (pathname.startsWith("/static")) {
    // We can also serve a whole directory using the serveDir utility
    // method. By default it serves the current directory but this
    // can be changed using the "fsRoot" option. We can use the "urlRoot"
    // option to strip off the start of the url in the case we don't
    // serve the directory at the top level.
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "static",
    });
  }

  return new Response("404: Not Found", {
    status: 404,
  });
});
