import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

//icons
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import { useState } from 'react';
import { Switch } from '@material-ui/core';
// import 'react-pro-sidebar/dist/css/styles.css';

const SideBar = ({ open, setOpen }) => {
	const handleChange = () => {
		setOpen(!open);
	};

	return (
		<div
			style={{
				height: '100vh',
				overflow: 'hidden',
				zIndex: -1,
			}}
		>
			<ProSidebar
				toggled='true'
				onToggle={() => setOpen(true)}
				collapsed={open}
				breakPoint='md'
			>
				<Switch
					defaultChecked
					color='primary'
					checked={open}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'checkbox with default color' }}
				/>
				<Menu iconShape='square'>
					<MenuItem icon={<HomeIcon />}>
						<Link className='sidebar__menu__items' to='/'>
							Dashboard
						</Link>
					</MenuItem>
					<MenuItem icon={<PersonIcon />}>
						<Link className='sidebar__menu__items' to='/profile'>
							Profile
						</Link>
					</MenuItem>

					<SubMenu title='Contacts' icon={<GroupIcon />}>
						<MenuItem icon={<PersonIcon />}>
							<Link className='sidebar__menu__items' to='/profile'>
								Contact List
							</Link>
						</MenuItem>
						<MenuItem icon={<PersonIcon />}>
							<Link className='sidebar__menu__items' to='/profile'>
								Add Contact
							</Link>
						</MenuItem>
					</SubMenu>
				</Menu>
			</ProSidebar>
		</div>
	);
};

export default SideBar;
