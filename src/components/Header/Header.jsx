import React from 'react'
import {useSelector} from 'react-redux';
import {Container, LogoutBtn, Logo} from '../index';
import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
    const authStatus= useSelector((state)=>state.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'signup',
            slug: 'signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Posts',
            slug: '/add-posts',
            active: authStatus
        }

    ]
  return (
    <header className='py-3 shadow bg-green-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {
                        navItems.map((item)=>{
                            if(item.active){
                                return <li key={item.name}>
                                    <button onClick={()=>navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                                </li>
                            }
                            return null;
                        })
                    }
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}
