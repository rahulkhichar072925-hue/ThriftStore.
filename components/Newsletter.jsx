'use client'
import React, { useState } from 'react'
import Title from './Title'

const Newsletter = () => {

  const [email, setEmail] = useState('')

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert('Please enter your email address')
      return
    }

    // simple email format check (optional but good UX)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    alert(
      '🎉 Subscription Successful!\n\nYou will now receive all exclusive deals, discounts, offers, and sales information directly in your email.'
    )

    setEmail('') // clear input after success
  }

  return (
    <div className='flex flex-col items-center mx-4 my-36'>
      <Title
        title="Join Newsletter"
        description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week."
        visibleButton={false}
      />

      <div className='flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200'>
        <input
          className='flex-1 pl-5 outline-none bg-transparent'
          type="email"
          placeholder='Enter your email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubscribe}
          className='font-medium bg-green-500 text-white px-7 py-3 rounded-full hover:scale-103 active:scale-95 transition'
        >
          Get Updates
        </button>
      </div>
    </div>
  )
}

export default Newsletter
