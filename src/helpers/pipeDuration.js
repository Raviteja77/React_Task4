const convertMinsToHrsMins = (minutes) => {
	let hour = Math.floor(minutes / 60);
	let min = minutes % 60;
	hour = hour < 10 ? '0' + hour : hour;
	min = min < 10 ? '0' + min : min;
	return isNaN(hour)
		? minutes
		: hour <= 1
		? `${hour}:${min} hour`
		: `${hour}:${min} hours`;
};

module.exports = { convertMinsToHrsMins };
