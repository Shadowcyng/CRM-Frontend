// import BigCalendar from 'react-big-  calendar-modify';
import moment from 'moment';
import { views } from 'react-big-calendar/lib/utils/constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import React, { Children, useEffect } from 'react';
import BigCalendar from 'react-big-calendar';
import Popup from 'react-popup';
import './popup.scss';
import EventPopupForm from './EventPopupForm';
import EventPopupDetails from './EventPopupDetails';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getEvent } from '../../Redux/Action/EventAction';
import { ViewTypes } from 'react-big-scheduler';

const localizer = BigCalendar.momentLocalizer(moment);
const CurrentDate = Date.now();
const ColoredDateCellWrapper = ({ children, value }) =>
	React.cloneElement(Children.only(children), {
		style: {
			...children.style,
			zIndex: -1,
			backgroundColor:
				value.getDate() == new Date(CurrentDate).getDate()
					? 'yellow'
					: value < CurrentDate
					? 'lightgreen'
					: 'lightblue',
			border: '.5px solid gray',
		},
	});

const MyCalendar = (props) => {
	const eventState = useSelector((state) => state.event);
	const dispatch = useDispatch();
	const { events, eventById, loading, message, error } = eventState;
	useEffect(() => {
		if (window.location.pathname === '/addEvent') {
			onSelectEventSlotHandler();
		} else {
			dispatch(getEvent());
			Popup.close();
		}
	}, [eventById, message]);

	const handleDeleteEvent = async (slotInfo) => {
		await dispatch(deleteEvent(slotInfo.id));
		Popup.close();
		// Popup.alert(message);
	};
	console.log('hey');
	const onSelectEventHandler = async (slotInfo) => {
		Popup.create({
			title: 'Event Details',
			content: <EventPopupDetails slotInfo={slotInfo} />,
			buttons: {
				left: [
					{
						text: 'Cancel',
						className: 'danger',
						action: function () {
							Popup.close();
						},
					},
				],
				right: [
					{
						text: 'Edit',
						key: 'ctrl+enter',
						action: function () {
							Popup.close();
							Popup.create(
								{
									title: 'Update Event',
									content: (
										<EventPopupForm
											slotInfo={slotInfo}
											onSelectEventHandler={onSelectEventHandler}
											Popup={Popup}
											eventById={eventById}
											dispatch={dispatch}
											error={error}
										/>
									),
								},
								true
							);
						},
					},
					{
						text: 'Delete',
						className: 'success',
						action: function () {
							handleDeleteEvent(slotInfo);
						},
					},
				],
			},
		});
	};
	const onSelectEventSlotHandler = (date) => {
		Popup.create({
			title: 'Create Event',
			content: <EventPopupForm date={date} Popup={Popup} />,
		});
	};

	const getEventStyle = (event, start, end, isSelected) => {
		let style;
		// console.log('event', event);
		if (start.getDate() === new Date().getDate()) {
			style = {
				backgroundColor: '#E86D24',
				color: 'white',
			};
		}

		if (end < new Date() && !event.allDay) {
			style = {
				backgroundColor: 'purple',
				color: 'white',
				textDecoration: 'line-through',
			};
		}

		if (start < new Date() && end > new Date()) {
			style = {
				backgroundColor: 'green',
				color: 'white',
				fontWeight: 'bold',
			};
		}
		// if (isSelected) {
		// 	style = {
		// 		backgroundColor: 'blue',
		// 		color: 'white',
		// 		opacity: '0.8',
		// 	};
		// }
		return {
			style: style,
		};
	};

	return (
		<>
			{loading && !events ? (
				<h1>loading</h1>
			) : (
				<div>
					<Popup />
					<BigCalendar
						events={
							events
								? events.map((event) => ({
										id: event.id,
										title: event.title.toUpperCase(),
										startDate: new Date(event.startDate),
										endDate: event.endDate ? new Date(event.endDate) : null,
										allDay: event.allDay,
										resource: event.resource.toUpperCase(),
										description: event.description,
								  }))
								: []
						}
						selectable
						localizer={localizer}
						step={30}
						defaultDate={moment().toDate()}
						// drilldownView={'Week'}
						// onShowMore={(event) => console.log('event', event)}
						popupOffset={{ x: 10, y: 10 }}
						defaultView={views.MONTH}
						startAccessor='startDate'
						endAccessor='endDate'
						toolbar={true}
						getNow={() => new Date()}
						min={new Date()}
						tooltipAccessor={() => 'Hey'}
						onSelectEvent={(slotinfo) => onSelectEventHandler(slotinfo)}
						onSelectSlot={(date) => onSelectEventSlotHandler(date)}
						eventPropGetter={(event, start, end, isSelected) =>
							getEventStyle(event, start, end, isSelected)
						}
						components={{
							dateCellWrapper: ColoredDateCellWrapper,
						}}
					/>
				</div>
			)}
		</>
	);
};

export default MyCalendar;
