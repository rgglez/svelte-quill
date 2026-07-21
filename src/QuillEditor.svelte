<script>
	// @ts-nocheck
	// Configurable Svelte 5 wrapper for Quill 2. HTML content is exposed via bind:value.
	// Quill is imported lazily in onMount (it needs the DOM); the theme CSS is loaded
	// dynamically to match `theme`. All Quill options are overridable through props with
	// opinionated defaults; `options` is a raw escape hatch applied last.
	import { onMount } from 'svelte';

	// Opinionated default toolbar: semantic formatting that {@html} renders without Quill CSS.
	const DEFAULT_TOOLBAR = [
		[{ header: [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['blockquote', 'code-block'],
		['link'],
		['clean']
	];

	let {
		value = $bindable(''),
		height = '260px',
		theme = 'snow',
		placeholder = '',
		readOnly = false,
		toolbar = DEFAULT_TOOLBAR,
		formats = undefined,
		modules = {},
		options = {},
		onReady = undefined,
		onChange = undefined
	} = $props();

	let el;
	let quill;
	let internal = ''; // last HTML emitted by the editor (to tell external changes apart)

	function normalize(html) {
		return html === '<p><br></p>' ? '' : html;
	}

	onMount(async () => {
		// Load the matching theme CSS. bubble/snow ship their own; anything else → snow.
		if (theme === 'bubble') {
			await import('quill/dist/quill.bubble.css');
		} else {
			await import('quill/dist/quill.snow.css');
		}

		const Quill = (await import('quill')).default;
		const cfg = {
			theme,
			placeholder,
			readOnly,
			modules: { toolbar, ...modules }, // modules override/extend
			...(formats ? { formats } : {}),
			...options // escape hatch, applied last (may replace modules/formats)
		};
		quill = new Quill(el, cfg);

		if (value) {
			quill.clipboard.dangerouslyPasteHTML(value);
			internal = value;
		}
		quill.on('text-change', () => {
			internal = normalize(quill.root.innerHTML);
			value = internal;
			onChange?.(internal);
		});

		onReady?.(quill);
	});

	// Content arriving/changing from outside (e.g. edit form loaded async after mount).
	$effect(() => {
		if (quill && value !== internal) {
			internal = value;
			quill.clipboard.dangerouslyPasteHTML(value || '');
		}
	});

	// Reactive read-only toggle.
	$effect(() => {
		const enabled = !readOnly;
		if (quill) quill.enable(enabled);
	});
</script>

<div class="svelte-quill">
	<div bind:this={el} style="height:{height}"></div>
</div>

<style>
	.svelte-quill :global(.ql-container) {
		font-size: 1rem;
	}
</style>
