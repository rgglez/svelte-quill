import { mount } from 'svelte';
import App from './index.svelte';
import './style.css';

mount(App, {
	target: document.getElementById('app')
});
