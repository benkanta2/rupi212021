import moment from 'moment';
import { users } from './users';

export const rides = [
	{
		id: 1,
		shift: { date: moment(), type: 'Evening' },
		driver: users.find((user) => user.userId == 1),
		totalSeats: 4,
		availableSeats: 2,
		passengers: [
			{ userId: 3, status: 'Aprroved' },
			{ userId: 4, status: 'Aprroved' },
		],
	},
	{
		id: 2,
		shift: { date: moment(), type: 'Evening' },
		driver: users.find((user) => user.userId == 2),
		totalSeats: 4,
		availableSeats: 2,
		passengers: [
			{ userId: 3, status: 'Aprroved' },
			{ userId: 4, status: 'Aprroved' },
		],
	},
	{
		id: 3,
		shift: { date: moment().add(1, 'days'), type: 'Evening' },
		driver: users.find((user) => user.userId == 1),
		totalSeats: 4,
		availableSeats: 2,
		passengers: [
			{ userId: 3, status: 'Aprroved' },
			{ userId: 4, status: 'Aprroved' },
		],
	},
	{
		id: 4,
		shift: { date: moment().add(-1, 'days'), type: 'Evening' },
		driver: users.find((user) => user.userId == 2),
		totalSeats: 4,
		availableSeats: 2,
		passengers: [
			{ userId: 3, status: 'Aprroved' },
			{ userId: 4, status: 'Aprroved' },
		],
	},
];
