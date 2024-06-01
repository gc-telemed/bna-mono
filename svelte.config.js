import { vitePreprocess } from '@astrojs/svelte';

export default {
  preprocess: vitePreprocess({
    compilerOptions: {
      onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') return;
        handler(warning);
      },
    },
  }),
};
