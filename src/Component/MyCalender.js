// import BigCalendar from 'react-big-  calendar-modify';
import moment from 'moment';
import events from '../events';
import { views } from 'react-big-calendar/lib/utils/constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import React, { Children } from 'react';
import BigCalendar from 'react-big-calendar';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const CurrentDate = Date.now();
const ColoredDateCellWrapper = ({ children, value }) =>
	React.cloneElement(Children.only(children), {
		style: {
			...children.style,
			backgroundColor: value < CurrentDate ? 'lightgreen' : 'lightblue',
		},
	});

const MyCalendar = (props) => {
	const handleSelect = () => {
		alert('ENTER');
	};

	return (
		<div>
			<BigCalendar
				events={events}
				selectable
				localizer={localizer}
				popup={true}
				step={30}
				defaultDate={moment().toDate()}
				popupOffset={{ x: 30, y: 20 }}
				defaultView={views.MONTH}
				startAccessor='start'
				endAccessor='end'
				toolbar={true}
				showMultiDayTimes
				min={new Date(2020, 0, 0, 12, 0, 0)}
				max={new Date(2020, 0, 1, 12, 0, 0)}
				resizable
				tooltipAccessor={() => 'Hey'}
				onSelectEvent={handleSelect}
				onSelectSlot={handleSelect}
				components={{
					dateCellWrapper: ColoredDateCellWrapper,
				}}
			/>
		</div>
	);
};

export default MyCalendar;
