import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		include: ["@katzumi/slidev-addon-qrcode > styled-qr-code"],
	},
});