import { ConfigEnv, defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import * as path from "path";
import { createSvgIconsPlugin} from 'vite-plugin-svg-icons'


// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport  => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')]
      })
    ],
  };
};
