<script>
	import { env } from '$env/dynamic/public';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ restaurants } = data);
</script>

<div class="grid gap-8">
	<h1 class="text-3xl lg:text-5xl font-bold">I Wanna Eat</h1>

	<p>There are {restaurants?.length || 0} restaurants in the database.</p>

	<div class="grid lg:grid-cols-3 2xl:grid-cols-5 gap-x-8 gap-y-4">
		<!-- loop over restaurants -->
		{#each restaurants as restaurant}
			<div class="border rounded-xl">
				<a
					href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}
					target="_blank"
				>
					<div class="px-4 py-4">
						<h2 class="text-xl lg:text-2xl font-bold text-gray=700 line-clamp-1">
							{restaurant.name}
						</h2>
					</div>
					{#if restaurant.photos?.length > 0}
						<div
							class="aspect-video bg-cover bg-center rounded-b-xl"
							style={`background-image: url('${`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photos[0].photo_reference}&key=${env.PUBLIC_GOOGLE_API_KEY}`}')`}
						/>
					{/if}
				</a>
			</div>
		{/each}
	</div>
</div>

<!-- <pre>
    {JSON.stringify(restaurants, null, 2)}
</pre> -->
