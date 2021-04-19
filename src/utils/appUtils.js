import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const getHeaderTitle = (route) => {
	//get the route name (or set a default one for the first render)
	const routeName = getFocusedRouteNameFromRoute(route)
		? getFocusedRouteNameFromRoute(route)
		: route.params.type === 'driver'
		? 'My Ride'
		: 'Schedule Rides';

	switch (routeName) {
		case 'My Ride':
			return 'My Ride';
		case 'Schedule Rides':
			return 'Schedule Rides';
		case 'Credits':
			return 'Credits';
		case 'Q&A':
			return 'Q&A';
		case 'Contact Us':
			return 'Contact Us';
	}
};
