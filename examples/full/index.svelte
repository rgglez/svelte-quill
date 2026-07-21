<script>
	import QuillEditor from '@rgglez/svelte-quill';

	let html = $state(`
		<h2>Full editor</h2>
		<p>This example demonstrates all the component's public options.</p>
	`);
	let readOnly = $state(false);
	let editor = $state();
	let lastChange = $state('The content has not changed yet.');

	const toolbar = [
		[{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ color: [] }, { background: [] }],
		[{ script: 'sub' }, { script: 'super' }],
		['blockquote', 'code-block'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ direction: 'rtl' }, { align: [] }],
		['link', 'image', 'video'],
		['clean']
	];

	const formats = [
		'font',
		'size',
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'color',
		'background',
		'script',
		'blockquote',
		'code-block',
		'list',
		'indent',
		'direction',
		'align',
		'link',
		'image',
		'video'
	];

	const modules = {
		history: {
			delay: 1000,
			maxStack: 100,
			userOnly: true
		}
	};

	function handleReady(quill) {
		editor = quill;
	}

	function handleChange(value) {
		lastChange = value || '(empty)';
	}
</script>

<main id="full-editor-example">
	<h1>Editor with the full configuration</h1>

	<label>
		<input type="checkbox" bind:checked={readOnly} />
		Read only
	</label>

	<button type="button" onclick={() => editor?.focus()} disabled={!editor || readOnly}>
		Focus the editor
	</button>

	<QuillEditor
		bind:value={html}
		height="420px"
		theme="snow"
		placeholder="Write here…"
		{readOnly}
		{toolbar}
		{formats}
		{modules}
		options={{ bounds: '#full-editor-example' }}
		onReady={handleReady}
		onChange={handleChange}
	/>

	<h2>Bound HTML</h2>
	<pre>{html}</pre>

	<h2>Latest change</h2>
	<pre>{lastChange}</pre>
</main>

<style>
	main {
		max-width: 960px;
		margin: 2rem auto;
	}

	label,
	button {
		margin: 0 1rem 1rem 0;
	}

	pre {
		overflow-wrap: anywhere;
		white-space: pre-wrap;
	}
</style>
