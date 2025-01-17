import React from 'react'

const Services = () => {
  return (
    <section className='px-4 mx-auto max-w-screen-md'>
      <div className='heading text-center'>Our Services</div>
      <p className='mb-8 lg:mb-16 font-light text-center text__para'>Need assistance or have suggestions about our services? We’re here to help!</p>


      <form
        action='#'
        className='space-y-8'>
        <div>
          <label htmlFor="email" className='form__label'>Your Email</label>
          <input type="email" name="email" id="email"
            placeholder='example@gmail.com'
            className='form__input mt-1'
          />
        </div>

        <div>
          <label htmlFor="subject" className='form__label'>Subject</label>
          <input type="text" name="subject" id="subject"
            placeholder='Let us know how we can help you'
            className='form__input mt-1'
          />
        </div>


        <div className='sm:col-span-2'>
          <label htmlFor="message" className='form__label'>Your Message</label>
          <textarea 
          rows={'6'}
          type="text" name="message" id="message"
            placeholder='Leave a comment...'
            className='form__input mt-1'
          />
        </div>
        <button type='submit' className='btn rounded sm:w-fit'>Submit</button>
      </form>


    </section>
  )
}

export default Services;