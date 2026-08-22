import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "Mesh Budget Pot",
  description: "A shared contribution pot for planning a group budget together.",
  accentHex: "#0d8a70",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
