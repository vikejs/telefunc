<script context="module">
	export const prerender = true
</script>

<script>
	import TodoList from '$lib/TodoList.svelte'
	import {session} from '$app/stores'
	export let todoItemsInitial
	let userName = $session.user.name
</script>

<svelte:head>
	<title>SvelteKit - Telefunc - Example</title>
</svelte:head>

<section>
	<h1> {userName}'s Todo List </h1>
	<TodoList todoItemsInitial={todoItemsInitial} />
</section>
