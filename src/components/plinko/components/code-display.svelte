<script lang="ts">
	import ProjectLinks from "$lib/components/project-links.svelte";
	import { CODE_LENGTH, game, reset, submit } from "$lib/stores/game.svelte";
	import { hover } from "$lib/stores/hover.svelte";
	import { settingsDialog } from "$lib/stores/settings.svelte";

	const slots = Array.from({ length: CODE_LENGTH }, (_, i) => i);

	let showHint = $state(false);

	// the value the next ball you drop needs to be
	const nextLetter = $derived(game.target[game.dropped] ?? "");
	const hintAvailable = $derived(game.dropped < CODE_LENGTH);
	// every slot has a settled ball → the code can be submitted
	const ready = $derived(game.entered.every((c) => c !== ""));

	const choose = (e: MouseEvent) => {
		e.stopPropagation(); // don't also release a ball
		showHint = false;
		reset();
	};

	const requestHint = (e: MouseEvent) => {
		e.stopPropagation();
		showHint = true;
	};

	const dismissHint = (e: MouseEvent) => {
		e.stopPropagation();
		showHint = false;
	};

	const onSubmit = (e: MouseEvent) => {
		e.stopPropagation();
		submit();
	};

	const openSettings = (e: MouseEvent) => {
		e.stopPropagation(); // don't also release a ball
		settingsDialog.open = true;
	};

	// Enter submits the code (submit() no-ops unless it's full and still playing)
	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === "Enter") submit();
	};
</script>

<svelte:window onkeydown={onKeydown} />
<div
	class="pointer-events-none fixed inset-0 flex flex-col items-center justify-center gap-8 select-none"
>
	{#if game.status !== "playing"}
		<!-- result replaces the input content in place -->
		<div class="flex flex-col items-center gap-4">
			<ProjectLinks />
			{#if game.status === "success"}
				<div class="flex flex-col items-center gap-4">
					<span class="text-4xl md:text-5xl font-pixel tracking-widest text-green drop-shadow-md uppercase text-center">Access Granted</span>
					<span class="text-lg text-text-primary/80 font-mono text-center">
						You can now return to the home page or play again
					</span>
				</div>
				<div class="flex flex-col sm:flex-row gap-3">
					<button
						class="pointer-events-auto mt-2 min-w-40 cursor-pointer rounded-lg bg-green px-10 py-3 font-pixel text-sm uppercase text-surface transition-colors hover:bg-green/80 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none"
						onclick={() => window.location.href = '/'}
					>
						Return to Home
					</button>
					<button
						class="pointer-events-auto mt-2 min-w-40 cursor-pointer rounded-lg border-2 border-text-primary/30 bg-surface px-10 py-3 font-pixel text-sm uppercase text-text-primary transition-colors hover:border-text-primary hover:bg-surface-dim shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none"
						onclick={choose}
					>
						Play again
					</button>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-4">
					<span class="text-4xl md:text-5xl font-pixel tracking-widest text-red drop-shadow-md uppercase text-center">Access denied</span>
					<span class="text-lg text-text-primary/80 font-mono text-center">
						You entered <span class="text-red font-bold bg-red/20 px-2 py-1 rounded"> {game.entered.join("")} </span> — the code was <span class="text-primary font-bold bg-primary/20 px-2 py-1 rounded"> {game.target} </span>
					</span>
				</div>
				<div class="flex flex-col sm:flex-row gap-3">
					<button
						class="pointer-events-auto mt-2 min-w-40 cursor-pointer rounded-lg bg-text-primary px-10 py-3 font-pixel text-sm uppercase text-surface transition-colors hover:bg-text-primary/80"
						onclick={choose}
					>
						Play again
					</button>
				</div>
			{/if}
		</div>
	{:else if showHint}
		<div class="flex flex-col items-center gap-4">
			<div class="flex flex-col items-center gap-2">
				<span class="text-xs font-pixel tracking-[0.2em] text-text-primary/40 uppercase">Hint</span>
				<span class="text-xl font-pixel text-text-primary/70">
					{#if hintAvailable}
						Your next letter is {nextLetter}
					{:else}
						Please submit your code
					{/if}
				</span>
			</div>
			<button
				class="pointer-events-auto min-w-40 cursor-pointer rounded-lg bg-text-primary px-10 py-3 font-pixel text-sm uppercase text-surface"
				onclick={dismissHint}
			>
				OK
			</button>
		</div>
	{:else}
		<!-- the code the player has to reproduce, with the project links tucked above -->
		<div class="flex flex-col items-center gap-3">
			<ProjectLinks />

			<!-- Big themed box wrapping everything -->
			<div class="flex flex-col items-center gap-5 bg-surface/80 backdrop-blur-md border border-highlight-med rounded-2xl px-6 py-5 shadow-[6px_6px_0_rgba(0,0,0,0.3)]">

				<!-- Code label + target letters -->
				<div class="flex flex-col items-center gap-2">
					<span class="text-xs font-pixel tracking-[0.1em] sm:tracking-[0.2em] text-primary/90 drop-shadow-sm uppercase text-center">Enter the following code to go to home page</span>
					<div class="flex gap-2 text-2xl font-pixel tracking-[0.2em] text-text-primary drop-shadow-md">
						{#each game.target.split("") as letter}
							<span>{letter}</span>
						{/each}
					</div>
				</div>

				<!-- the player's entry -->
				<div class="flex flex-col gap-3">
					<!-- inputs in a row; the submit drops to its own full-width row below them
						 on very narrow (xs) screens, where they no longer fit on one line -->
					<div class="flex flex-col gap-3 xs:flex-row">
						<div class="flex gap-3">
							{#each slots as i}
								{@const correct = game.entered[i] !== "" && game.entered[i] === game.target[i]}
								<div
									class="flex h-16 w-12 items-center justify-center rounded-xl border text-2xl font-pixel text-text-primary transition-colors
									{correct ? 'border-primary/50' : i === game.dropped ? 'border-text-primary/60' : 'border-text-primary/20'}
									{correct ? 'bg-primary/20' : hover.slot === i ? 'bg-text-primary/10' : ''}"
								>
									{game.entered[i] ?? ""}
								</div>
							{/each}
						</div>

						<!-- submit: looks like a faint input until every slot is settled, then
							 fills solid primary with surface icon -->
						<button
							aria-label="Submit code"
							disabled={!ready}
							onclick={onSubmit}
							class="pointer-events-auto flex h-12 w-full items-center justify-center rounded-xl border transition-colors xs:h-16 xs:w-12
								{ready
								? 'cursor-pointer border-primary bg-primary text-surface'
								: 'cursor-default border-text-primary/20 bg-transparent text-text-primary/30'}"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-6 w-6"
							>
								<path d="M5 12h14M13 6l6 6-6 6" />
							</svg>
						</button>
					</div>
					<div class="flex items-center justify-between gap-4">
						<p class="text-sm text-text-muted">
							Stuck? Try a
							<button
								class="pointer-events-auto cursor-pointer text-primary underline hover:text-primary/80 transition-colors"
								onclick={choose}
							>
								new code
							</button>
							<!-- no next letter to reveal once every slot is filled -->
							{#if hintAvailable}
								or request a
								<button
									class="pointer-events-auto cursor-pointer text-primary underline hover:text-primary/80 transition-colors"
									onclick={requestHint}
								>
									hint
								</button>
							{/if}
						</p>

						<!-- opens the display/assist toggles -->
						<button
							class="pointer-events-auto shrink-0 cursor-pointer text-sm text-primary underline bg-primary/10 px-2 py-1 rounded hover:text-primary/80 hover:bg-primary/20 transition-colors"
							onclick={openSettings}
						>
							Settings
						</button>
					</div>
				</div>

			</div>
		</div>
	{/if}
</div>
