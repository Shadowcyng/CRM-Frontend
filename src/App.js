import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Calender from './Component/MyCalender';
import Login from './Component/login/Login';
import Signup from './Component/login/Signup';
import Navbar from './Component/Navbar';
import ErrorBoundary from './ErrorBoundary';
import Home from './Component/Home/Home';
import SideBar from './Component/SideBar';
import { useState } from 'react';
import AuthRoute from './Component/AuthRoute';

axios.defaults.baseURL = 'http://localhost:5000/api';

const App = () => {
	const [open, setOpen] = useState(false);
	return (
		<Router>
			<ErrorBoundary>
				<div className='App'>
					<Navbar />
					<div className='root'>
						<div className='sidebar'>
							<SideBar open={open} setOpen={setOpen} />
						</div>
						<div
							className='main scrollbar'
							style={{ margin: '20px', marginLeft: open ? '100px' : '290px' }}
						>
							<Switch>
								<AuthRoute exact path='/' component={Home} />
								<Route exact path='/signup' component={Signup} />
								<Route exact path='/login' component={Login} />
							</Switch>
						</div>
					</div>
				</div>
			</ErrorBoundary>
		</Router>
	);
};

export default App;
