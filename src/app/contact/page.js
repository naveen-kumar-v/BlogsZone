import dynamic from 'next/dynamic';
import styles from './contact.module.css'
import Image from 'next/image';
import {getContactForm} from '@/utils/action.js'

export const metadata = {
  title: "Contact",
  description: "Get in touch with the BlogsZone team. We’re here to answer your questions, provide support, and listen to your feedback. Reach out to us for any inquiries or collaborations.",
};

const page = () => {

  return <div className="flex gap-14 w-full flex-1">
    <div className="flex-1 relative h-[450px] hidden lg:flex">
      <Image src="/contact.png" alt="Contact image" fill className='object-contain' />
    </div>
    <div className="flex-1 ">
      <h1 className='pb-4 text-xl font-semibold text-center w-full'>Contact Form</h1>
      <form action={getContactForm} className="flex flex-col w-full gap-5">
        <input type="text" placeholder="Full name" name="name" className={styles.input} />
        <input type="email" placeholder="Email address" name="email" className={styles.input} />
        <input type="tel" placeholder="Phone number" name="phoneNumber" className={styles.input} />
        <textarea cols="30" rows="6" placeholder="Message" name="message" className={styles.input} ></textarea>
        <button className="bg-[var(--btn)] p-2 rounded text-lg" type='submit'>Submit</button>
      </form>
    </div>
  </div>;
};

export default page;
