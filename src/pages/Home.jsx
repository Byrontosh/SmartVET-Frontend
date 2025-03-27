import logoDarkMode from '../assets/dark.png'
import logoDogCatMain from '../assets/dogmain.png'
import AppStoreImage from '../assets/appstore.png'
import GooglePlayImage from '../assets/googleplay.png'
import logoDog from '../assets/dog-hand.webp'
import { Link } from 'react-router'
import { MdDashboard } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaCommentSms } from "react-icons/fa6";
import { TbDog } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


export const Home = () => {
    return (
        <>
            <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
                <h1 className='font-bold text-2xl my-2 text-amber-700'>Smart<span className='text-black'>VET</span></h1>
                <ul className='flex gap-5 justify-center my-4 flex-wrap'>
                    <li><a href="#" className='font-bold hover:text-amber-700 hover:underline'>Home</a></li>
                    <li><a href="#" className='font-bold hover:text-amber-700 hover:underline'>About US</a></li>
                    <li><a href="#" className='font-bold hover:text-amber-700 hover:underline'>Services</a></li>                    <li><a href="#" className='font-bold hover:text-amber-700 hover:underline'>Contact</a></li>
                </ul>
                <ul className='flex justify-center items-center gap-5 my-4'>
                    <li><img src={logoDarkMode} alt="logo" width={35} height={35} />
                    </li>
                </ul>
            </header>



            <main className='text-center py-6 px-8 bg-red-50  md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                <div className=''>
                    <h1 className='font-lato font-extrabold text-amber-800 uppercase text-4xl my-4 md:text-6xl'>Intelligent software</h1>

                    <p className='font-bold text-left my-8 md:text-2xl underline'>Powered by</p>

                    <p className='text-2xl my-6 font-sans'>Artificial intelligence, Payment gateway, Realtime chat and much more...</p>

                    <Link to="/login" href="#" className='block bg-amber-800 w-40 py-2 mx-auto text-white rounded-2xl text-center sm:mx-0 hover:bg-amber-700'>Get started</Link>

                    <p className='font-bold text-left my-4 md:text-2xl'>Find us</p>

                    <div className="flex justify-center gap-4">
                        <a href="#">
                            <img src={AppStoreImage} alt="App Store" />
                        </a>
                        <a href="#">
                            <img src={GooglePlayImage} alt="Google Play" />
                        </a>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <img src={logoDogCatMain} alt="smart" />
                </div>
            </main>


            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>ABOUT US</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>

                    <div className='sm:w-1/2'>
                        <img src={logoDog} alt="App Store" className='w-full h-full object-cover' />
                    </div>

                    <div className='px-10 sm:w-1/2'>
                        <p className='my-4'>SmartVET is the first software on the market that includes
                        </p>
                        <ul className='space-y-4'>
                            <li>
                                <MdDashboard className='inline text-2xl mr-2' />Administrative Dashboard
                            </li>
                            <li>
                                <FaRobot className='inline text-2xl mr-2' />
                                Artificial intelligence
                            </li>
                            <li>
                                <BsCashCoin className='inline text-2xl mr-2' />
                                Payment gateway
                            </li>
                            <li>
                                <FaCommentSms className='inline text-2xl mr-2' />
                                Realtime chat
                            </li>
                            <li>
                                <TbDog className='inline text-2xl mr-2' />
                                Management Patients
                            </li>
                            <li>
                                <FaUserDoctor className='inline text-2xl mr-2' />
                                Management Veterinarians
                            </li>
                            <li>
                                <GiMedicines className='inline text-2xl mr-2' />
                                Management Treatments
                            </li>
                        </ul>
                        <p className='my-4'>And other features that leverage the modern technologies</p>
                    </div>

                </div>

            </section>


            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SERVICES</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex justify-between flex-wrap gap-5'>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaUserDoctor className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Management Veterinarians</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>


                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-red-50 sm:flex-1">
                        <TbDog className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Management Patients</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-red-50 sm:flex-1">
                        <GiMedicines className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Management Treatments</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaCommentSms className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Realtime Chat</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>
                </div>
            </section>


            <footer className='text-center bg-red-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>

                <div className='flex justify-between items-center'>
                    <div className='text-3xl font-extrabold text-amber-800'>Contact US</div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                        <p className='font-bold my-2'>Email: admin@vet.com</p>
                        <p className='font-bold'>Phone: 0995644186</p>
                    </div>
                    <div className='flex-1 sm:max-w-1/2'>
                        <form action="#" className='w-full p-4'>
                            <fieldset className='border-2 border-amber-900 p-4 rounded-sm '>
                                <legend className='bg-amber-950 w-full text-left text-white pl-2 py-2'>Subcribe our newsletter</legend>
                                <div className='flex justify-between gap-4'>
                                    <input type="email" placeholder="Enter your email" className='sm:flex-1 border border-gray-300 rounded-md focus:outline-none px-2' />
                                    <button className='flex-1 sm:max-w-40 border bg-amber-950 p-1 rounded-lg text-white'>Send</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

                <hr className='border-1 border-amber-800' />

                <p className='font-semibold'>
                    copyright - © - BYRONTOSH
                </p>
            </footer>

        </>
    )
}

