import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url"
import Components from "unplugin-vue-components/vite"; // 自动导入 Vue 组件
import AutoImport from "unplugin-auto-import/vite"; // 自动导入 Vue 相关 API
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from "path";
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression';





export default defineConfig((mode): any => {
    const env = loadEnv(mode.mode, process.cwd());
    return {
        server: {
            host: "0.0.0.0",
            open: true,
            port: +env.VITE_APP_PORT,
            proxy: {
                /** 代理前缀为 /dev-api 的请求  */
                [env.VITE_APP_BASE_API]: {
                    changeOrigin: true,
                    // 接口地址
                    target: "https://vue.youlai.tech", //<你的目标接口地址>
                    rewrite: (path: any) =>
                        path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "/prod-api"), // 重写路径，去掉/api前缀
                },
            },
        },
        plugins: [
            vue(),
            // 提供对旧版浏览器的支持，将现代 JavaScript 编译为旧版浏览器兼容的代码
            legacy({
                targets: ["defaults", "not IE 11"], // 目标是现代浏览器，排除 IE 11
            }),
            // 压缩
            viteCompression({
                algorithm: 'gzip', // 使用 gzip 压缩
                ext: '.gz', // 生成的文件扩展名
                threshold: 10240, // 仅压缩大于 10KB 的文件
                deleteOriginFile: false, // 是否删除原始文件
                compressionOptions: { level: 9 }, // 压缩级别，1-9，越高压缩率越大
            }),
            // svgIcon
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
                // Specify symbolId format
                symbolId: "icon-[dir]-[name]",
            }),

            // 自动导入组件（如 Element Plus 组件）
            Components({
                resolvers: [ElementPlusResolver({ importStyle: "sass" })],
                // 默认只针对src/components目录实现自动导入
                dirs: ["src/components", "src/layout"], // 后面布局组件也有相关的组件期望自动导入
                dts: "./components.d.ts",

            }),
            // 自动导入常用的 Vue API，比如 'ref' 和 'vue-router'
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ["vue", "vue-router"], // 自动导入 Vue 和 Vue Router 的 API
                dts: "./auto-imports.d.ts", // 生成的 TypeScript 声明文件路径 // 生成的全局变量放到此目录下
                eslintrc: {
                    enabled: true, // 启用 ESLint 配置生成
                    filepath: "./.eslintrc-auto-import.json" // 生成的 ESLint 配置文件路径
                }
            }),
            ElementPlus({
                // 导入scss而不是css
                useSource: true
            }),

        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        // vite.config.ts
        css: {
            preprocessorOptions: {
                scss: {
                    // 按需导入自定义主题
                    additionalData: `@use "@/styles/themeVar.scss" as *;`,
                },
            },
        },
    };
});