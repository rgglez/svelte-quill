<script>
	import QuillEditor from '@rgglez/svelte-quill';

	let html = $state('<p>Write something in the editor.</p>');
</script>

<h1>Editor with the default configuration</h1>

<QuillEditor bind:value={html} />

<h2>Generated HTML</h2>
<pre>{html}</pre>
