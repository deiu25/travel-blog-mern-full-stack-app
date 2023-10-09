import React from 'react'
import './Home.css'
import loginImg from '../../assets/login.svg'
import { Link } from 'react-router-dom'
import { ShowOnLogout } from '../../components/protect/hiddenLink'

export const Home = () => {
  return (
    <>
    <section className='container hero'>
      <div className='hero-text'>
        <h2>Ultimate MERN Stack Authentication System</h2>
        <p>Learn to create a comprehensive authentication system using React, Node, Express, and MongoDB.</p>
        <p>Develop the necessary skills to implement user registration, login, password reset, social login, user permissions, email notifications, and additional features.</p>
        <p>Take the first step!</p>
        <div className='hero-buttons flex-start'>
        <ShowOnLogout>
            <Link className="btn" to='/auth'>Auth</Link>
        </ShowOnLogout>
        </div>
        </div>
        <div className='hero-image'>
          <img src={loginImg} alt='Login' />
        </div>
    </section>
    </>
  )
}
