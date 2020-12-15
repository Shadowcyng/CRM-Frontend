import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateEvent,
	saveEvent,
	getEvent,
} from '../../Redux/Action/EventAction';
// import moment from 'moment';

const EventPopupForm = (props) => {
	const { slotInfo, onSelectEventHandler, Popup, date } = props;
	// console.log('date', new Date(date.start).toLocaleString());
	const [title, setTitle] = useState(slotInfo?.title ? slotInfo?.title : '');
	const [startDate, setStartDate] = useState(
		slotInfo?.startDate ? slotInfo?.startDate : new Date(date.start.toString())
	);
	const [endDate, setEndDate] = useState(
		slotInfo?.endDate ? slotInfo?.endDate : new Date(date.end.toString())
	);
	const [allDay, setAllDay] = useState(
		slotInfo?.allDay ? slotInfo?.allDay : false
	);
	const [resource, setResource] = useState(
		slotInfo?.resource ? slotInfo?.resource : ''
	);
	const [description, setDescription] = useState(
		slotInfo?.description ? slotInfo?.description : ''
	);

	const eventDetails = useSelector((state) => state.event);
	const dispatch = useDispatch();
	const { error, eventById, events, loading } = eventDetails;
	const handleClose = (e) => {
		Popup.close();

		slotInfo && onSelectEventHandler(slotInfo);
	};

	const handleUpdateEvent = (e) => {
		e.preventDefault();
		const data = {
			title,
			startDate,
			endDate,
			allDay,
			resource,
			description,
		};
		if (slotInfo) {
			console.log('New');
			dispatch(updateEvent(data, slotInfo?.id));
		} else {
			dispatch(saveEvent(data));
			if (window.location.pathname === '/addEvent') {
				window.location.pathname = '/';
			}
			// Popup.close();
		}
	};
	return (
		<div className='popup'>
			<form>
				<div className='form-group'>
					<fieldset>
						<label className='control-label font-weight-bold' htmlFor='Title'>
							Title
						</label>
						<input
							className='form-control input__box-element'
							type='text'
							placeholder='Enter Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						{error?.title && (
							<div style={{ textAlign: 'left' }} className='error__text'>
								{error?.title}
							</div>
						)}
					</fieldset>
				</div>
				<div className='form-group row '>
					<div className='col-sm-10 d-flex event__popup__fieldset'>
						<fieldset>
							<div>
								<label
									className='control-label font-weight-bold'
									htmlFor='StartDate'
								>
									Start Date
								</label>
							</div>
							<DateTimePicker
								className='input__box-element'
								value={startDate ? new Date(startDate) : null}
								onChange={(e) => setStartDate(e)}
							/>
							{error?.startDate && (
								<div style={{ textAlign: 'left' }} className='error__text'>
									{error?.startDate}
								</div>
							)}
						</fieldset>
					</div>
				</div>
				<div className='form-group row '>
					<div className='col-sm-10'>
						<fieldset>
							<div>
								<label
									className='control-label font-weight-bold'
									htmlFor='EndDate'
								>
									End Date
								</label>
							</div>
							<DateTimePicker
								className='input__box-element'
								value={allDay ? null : endDate ? new Date(endDate) : null}
								onChange={(e) => setEndDate(e)}
								disabled={allDay}
							/>
							{error?.endDate && (
								<div style={{ textAlign: 'left' }} className='error__text'>
									{error?.endDate}
								</div>
							)}
						</fieldset>
					</div>
				</div>
				<div className='form-group'>
					<div className='col-sm-10'>
						<input
							type='checkbox'
							// className='custom-control-input'
							defaultChecked={allDay}
							onChange={() => setAllDay(!allDay)}
						/>
						<label
							className='control-label ml-2 font-weight-bold'
							htmlFor='AllDAy'
						>
							All Day Event
						</label>
					</div>
				</div>
				<div className='form-group row '>
					<div className='col-sm-10'>
						<fieldset>
							<label
								className='control-label font-weight-bold'
								htmlFor='Resource'
							>
								Resource
							</label>
							<input
								type='text'
								placeholder='Enter Resource'
								className='form-control input__box-element'
								value={resource}
								onChange={(e) => setResource(e.target.value)}
							/>
						</fieldset>
					</div>
				</div>
				<div className='form-group row '>
					<div className='col-sm-10'>
						<fieldset>
							<label className='control-label font-weight-bold' htmlFor='Desc'>
								Desc
							</label>
							<input
								type='text'
								placeholder='Enter Description'
								className='form-control input__box-element'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</fieldset>
					</div>
				</div>
				<div className='col-sm-10 mt-4 d-flex justify-content-between'>
					{slotInfo && (
						<fieldset>
							<button
								type='button'
								className='btn btn-danger'
								style={{ float: 'right' }}
								onClick={(e) => handleClose(e)}
							>
								Cancel
							</button>
						</fieldset>
					)}
					<fieldset>
						<button
							type='button'
							className='btn btn-success'
							style={{ float: 'right' }}
							onClick={(e) => handleUpdateEvent(e)}
							disabled={!title || !startDate || (!endDate && !allDay)}
						>
							Save
						</button>
					</fieldset>
				</div>
			</form>
		</div>
	);
};

export default EventPopupForm;
