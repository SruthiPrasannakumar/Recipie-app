import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchRecipe } from '../Redux/recipeSlice'


const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  return (
    <nav className='bg-info d-flex align-items-center justify-content-between px-5 py-2'>
        <Link style={{textDecoration:'none'}} to={'/'} className='fw-bolder fs-3 text-white'><i class="fa-solid fa-bowl-rice"></i>  HotBowl </Link>
        {
            insideHome &&
            <input onChange={e=>dispatch(searchRecipe(e.target.value.toLowerCase()))} style={{width:'15rem'}} type="text" placeholder='Search by cuisine' className='form-control fw-semibold' />
        }
    </nav>
  )
}

export default Header