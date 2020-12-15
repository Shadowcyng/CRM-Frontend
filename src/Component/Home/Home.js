import React from 'react';
import MyCalendar from '../Calendar/MyCalendar';
import '../../App.scss';

const Home = () => {
	return (
		<div>
			<div>
				{window.location.pathname === '/addEvent' ? (
					<MyCalendar addEvent={true} />
				) : (
					<MyCalendar />
				)}
				{/* <div>
					<div className='colorbox'></div>
				</div> */}
			</div>
		</div>
	);
};

export default Home;
