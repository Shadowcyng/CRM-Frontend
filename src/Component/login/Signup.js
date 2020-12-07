import React, { useState, useEffect } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { useSelector, useDispatch }  from 'react-redux'
import { signup, login } from '../../Redux/Action/UserActions'

const Signup = (props) => {

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

       const user = useSelector(state => state.user);
       const dispatch = useDispatch();

       const { loading, userInfo, error } = user;
        

        useEffect(() => {
            if(userInfo){
                console.log('loading', loading)
                props.history.push('/')
            }
        }, [userInfo])


        const handleSubmit =  ( event ) => {
        event.preventDefault();
        dispatch(signup( name, email, password, confirmPassword ))
       }


    return (
        <>
        {
            loading 
            ? 
            <h1>Loading...</h1>
            :
        <div className='login'>
            <div className='login__container container m-auto'>
                <div className='image'>
                    <img className='login__image' src='https://i.pinimg.com/originals/65/dc/a6/65dca69f78972935caf61580e7c17bd9.png' ></img>
                </div>
                <div>
                    <div className='login__heading'>
                        SIGNUP
                    </div>
                <div className='input__box'>
                    <form>       
                    <fieldset className='form__fieldset'>
                        <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="text"  placeholder='Name' className="form-control input__box-element" 
                            id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                        <div className="error__text">{error?.name}</div>

                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="text"  placeholder='Email Address' className="form-control input__box-element" 
                            id="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            <div className="error__text">{error?.email}</div>
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="password"  placeholder='Password' className="form-control input__box-element" 
                            id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <div className="error__text">{error?.password}</div>
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-sm-10">
                            <input type="password" placeholder='Confirm Password' className="form-control input__box-element"
                             id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                             <div className="error__text">{error?.confirmPassword}</div>
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="button" className="btn btn-success button__success" 
                        onClick={e=>handleSubmit(e)}>Signup</button>
                        <div className="error__text">{error&&error.message}</div>

                        </div>
                        </div>
                        
                    </fieldset>
                    </form>
                </div>
                <div className='navigate__link'>
                        <Link to='/login'>
                            <div>Already Have an Account
                        <ArrowRightAltIcon /></div></Link>
                </div>
            </div>
            </div>

        </div>
        }
        </>
    )
}

export default Signup
