import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/../styles/index.scss";` // Ensure this path is correct
            }
        }
    },
    envPrefix: 'PUBLIC_',
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    server: {
        // Optional: configure your development server if needed
        // For example, setting a specific port or host
        port: 3002,
        strictPort: true,
    }
});