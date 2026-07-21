import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // TODO review if this env load is legit
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      devtools(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      viteReact(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "react-router-dom": "node:path",
      },
    },
    server: {
      // TODO reevaluate all these rules
      headers: {
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Content-Security-Policy": [
          "default-src 'self';",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
          "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;",
          "font-src 'self' https://fonts.gstatic.com;",
          "frame-ancestors 'none';",
          `connect-src 'self' ${env.VITE_ZITADEL_DOMAIN} ${env.VITE_API_URL};`,
          "img-src 'self' data:;",
        ].join(" "),

        // Permissions-Policy (Blocks browser features you aren't using)
        "Permissions-Policy":
          "geolocation=(), camera=(), microphone=(), geolocation=()",
      },
    },
  };
});
