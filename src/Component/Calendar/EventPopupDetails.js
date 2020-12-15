import React from 'react';
import moment from 'moment';

const EventPopupDetails = ({ slotInfo }) => {
	return (
		<div className='event__details'>
			<div className='event__slot-heading'>
				<div className='event__heading'>Title</div>
				<div className='event__heading'>Start Date</div>
				{slotInfo.allDay ? null : (
					<div className='event__heading'>End Date</div>
				)}
				<div className='event__heading'>All Day</div>
				<div className='event__heading'>Resource</div>
				{slotInfo.description == null ? null : (
					<div className='event__heading'>Desc</div>
				)}
			</div>
			<div className='event__slot-value'>
				<div className='event__value'>{slotInfo.title}</div>
				<div className='event__value'>
					{moment(slotInfo?.startDate).format('DD-MM-YYYY HH:mm:ss A')}
				</div>
				<div className='event__value'>
					{slotInfo.allDay
						? null
						: moment(slotInfo?.endDate).format('DD-MM-YYYY HH:mm:ss A')}
				</div>
				<div className='event__value'>{slotInfo.allDay ? 'Yes' : 'No'}</div>
				<div className='event__value'>{slotInfo.resource}</div>
				<div className='event__value'>{slotInfo.description}</div>
			</div>
		</div>
	);
};

export default EventPopupDetails;
