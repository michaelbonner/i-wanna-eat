import { env } from '$env/dynamic/public';

const METERS_PER_MILE = 1609.34;
const RADIUS = 5 * METERS_PER_MILE;

export async function load({ fetch }) {
	const searchParams = new URLSearchParams({
		maxprice: '2',
		location: '40.4374578,-111.891035',
		radius: RADIUS.toString(),
		type: 'restaurant',
		key: env.PUBLIC_GOOGLE_API_KEY || ''
	});

	let data;

	const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${searchParams}`;

	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				origin: 'http://localhost:5173'
			}
		});
		data = await res.json();
	} catch (error) {
		console.error(error);
	}

	return {
		restaurants: data?.results,
		nextToken: data?.next_page_token
	};
}
