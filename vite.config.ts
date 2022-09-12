import { sveltekit } from '@sveltejs/kit/vite';
import { plugin as markdown } from 'vite-plugin-markdown'
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [markdown({ mode: ['html', 'toc'] }), sveltekit()]
};

export default config;
