import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
const NotFound = ({link}) => {
  const navigate =useNavigate()
  return (
    <div className=' mx-auto flex justify-center items-center h-[100vh] bg-[#e5eaf6]'>
      <div >
        <h2 className='title_NotFound'>Look like you're lost in space</h2>
        <figure><img src={require('../../assets/not_Found.png')} alt='not_found_imageMissing' style={{width:'80%',margin:'0px auto'}}/></figure>
        <Link to={link} className='flex justify-center' >
        <button className='bg-[#012fa7] text-white px-5 py-2 font-medium rounded-lg text-[18px]'>Continue to Website</button>
        </Link>
      </div>
     
    </div>
  )
}

export default NotFound