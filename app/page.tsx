import logo from "@/public/logo.png";
import mapCard from "@/public/mapCard.jpg";
import searchCard from "@/public/searchCard.jpg";
import groupCard from "@/public/groupCard.jpg";
import contactImg from "@/public/contactimg.png";
import laptopSnap from "@/public/laptopSnap.png";
import aboutImg from "@/public/aboutImg.png";
import donorImg from "@/public/donorImg.jpg";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-[100vh] sm:h-[150vh] w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>
      <div className="w-[100vw] h-[100vh] sm:h-[150vh] flex flex-col gap-20 justify-start items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xxl text-center lg:py-8  z-10 relative flex flex-col gap-10 justify-start items-center">
          <nav className="backdrop-filter backdrop-blur-xl fixed w-[90%] md:w-[80%] border border-gray-200 rounded-[3rem] shadow-lg px-4 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image className="w-10" src={logo} alt={"logo"} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                    Blood
                  </span>
                  Finder
                </span>
              </a>
              <button
                data-collapse-toggle="#navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky">
                <ul className="flex flex-col bg-transparent md:p-1 mt-4 font-medium border  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-white bg-red-500 rounded md:bg-transparent md:text-red-500 md:p-0 "
                      aria-current="page">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 ">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 ">
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex flex-col justify-center items-center text-center pt-5 gap-1">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
              Be the Lifeline: <br></br>Find Blood,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                Save Lives
              </span>
            </h1>
            <p className="mb-6 text-lg font-normal px-8 py-4 text-gray-500 lg:text-xl sm:py-4 sm:px-16 lg:px-48 sm:mb-8">
              At{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                Blood
              </span>
              Finder, we streamline the process of locating blood during
              emergencies, eliminating the hassle and establishing a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                direct connection between blood banks and those in need.
              </span>
            </p>
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`}>
              <Button
                type="button"
                className="text-white relative z-[100] bg-gradient-to-r cursor-pointer rounded-[3rem] from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  shadow-lg shadow-red-500/50 font-medium text-lg px-5 py-2.5  text-center me-2 mb-2 sm:mb-0 sm:mt-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative top-[-8rem] sm:top-[-12rem]">
          <Image
            className="w-full max-w-[150vh]"
            src={laptopSnap}
            alt={"laptopSnap"}
          />
        </div>
      </div>
      <div id="" className="h-[50vh]">
        <div className=" inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] shadow-inner">
          <div className="text-center sm:text-left sm:flex sm:flex-row sm:justify-between sm:items-center sm:py-12 sm:px-[6rem] pt-[2.5rem]">
            <div>
              <h2 className=" text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Are you a donor?{" "}
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-500 px-2">
                Join our blood donor community and be a life-saving hero!
                <br></br> Your blood donation can make a significant impact,
                providing hope and saving lives.<br></br> Our supportive
                community is dedicated to making a positive difference.<br></br>{" "}
                Join us in this noble cause, and together, let&apos;s create a
                healthier, happier future.{" "}
              </p>
              <h4>
                <a href="https://forms.gle/nGjZiDkFg7Tw5dYw7">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 mt-2 sm:mt-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Fill this form to join us!{" "}
                    </span>
                  </button>
                </a>
              </h4>
            </div>
            <div>
              <Image
                className="collapse sm:visible sm:w-[60vh]"
                src={donorImg}
                alt={"donorImg"}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="h-[50vh]">
        <div className=" inset-0 h-[50vh] w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] ">
          {" "}
          <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:px-[6rem] sm:text-right">
            <div>
              <Image
                className="sm:w-[50vh] w-0 collapse sm:visible"
                src={aboutImg}
                alt={"aboutImg"}
              />
            </div>
            <div className="pt-[3.5rem] sm:pt-0 text-center sm:text-left">
              <h2 className=" text-3xl leading-4 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                About Us{" "}
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-500 px-4 sm:px-0">
                <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                  Blood
                </span>
                Finder is an application that ensures swift access to <br></br>
                required blood groups, especially during emergency situations.
                <br></br> With{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                  Blood
                </span>
                Finder we can ease blood procurement process, <br></br>by
                directly connecting with the nearby blood banks,
                <br></br>
                thus eliminating the need for donor coordination.
              </p>
              <h3 className="text-lg text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br mt-5">
                Life-saving app: Instant help, zero panic.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full  top-0 left-0 z-[-1]">
          <div
            className=" text-center h-[10vh] text-4xl font-bold tracking-tight text-neutral-800 pt-[3rem]"
            id="services">
            <h1>
              Features of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                Blood
              </span>
              Finder
            </h1>
          </div>
          <div className="grid grid-cols-1  justify-center md:grid-cols-3 gap-5 p-[4rem] h-[220vh] md:h-[90vh]">
            <div className="h-100 w-100 relative cursor-pointer mb-5">
              <div className="absolute inset-0 transform hover:skew-y-12 transition duration-300">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                    <Image className="" src={searchCard} alt={"searchCard"} />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Locate Blood Banks{" "}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Efficient search options for locating nearby blood banks
                      based on location and blood.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-50 w-50 relative cursor-pointer mb-5">
              <div className="absolute inset-0 transform hover:skew-y-12 transition duration-300">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                    <Image className="" src={mapCard} alt={"mapCard"} />{" "}
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Smooth Blood Procurement
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Directly connect with nearest blood banks, eliminating the
                      need for donor coordination.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-50 w-50 relative cursor-pointer mb-5">
              <div className="absolute inset-0 transform hover:skew-y-12 transition duration-300">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                    <Image className="" src={groupCard} alt={"groupCard"} />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Certified Donor Group{" "}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      We boast a diverse community of certified blood donors
                      representing all blood groups.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="h-[50vh]">
        <div className=" inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] shadow-inner">
          <div className="text-center sm:text-left sm:flex sm:flex-row sm:justify-between sm:items-center sm:py-12 sm:px-[6rem] pt-[2.5rem]">
            <div>
              <h2 className=" text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Contact Us
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-500">
                Thank you for visiting our website! Whether you have questions,
                <br></br> want to share feedback, or need assistance, <br></br>
                please don&apos;t hesitate to reach out.<br></br>We&apos;re
                committed to ensuring your experience is seamless<br></br>and
                are here to assist you every step of the way.
              </p>
              <h4 className="mt-3 leading-10 flex flex-col justify-center items-center sm:items-start">
                <div className="flex flex-row gap-2  items-center">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                  <a
                    href="mailto:support@bloodfinder.com"
                    className="font-medium text-red-400 hover:underline">
                    {" "}
                    support@bloodfinder.com
                  </a>
                </div>
                <div className="flex flex-row gap-2  items-center">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  </svg>
                  <a
                    className="font-medium text-red-400 hover:underline"
                    href="tel:9414xxxx">
                    +91-9414xxxx
                  </a>
                </div>
              </h4>
            </div>
            <div>
              <Image
                className="collapse sm:visible sm:w-[60vh]"
                src={contactImg}
                alt={"contactImg"}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className=" bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <div className="bg-gradient-to-b from-transparent to-blue-50 w-full h-full  top-0 left-0 z-[-1]">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 md:py-8">
            <div className="md:flex md:justify-between md:gap-2">
              <div className="mb-10 md:mb-0 text-center sm:text-left">
                <a
                  href=""
                  className="flex justify-center items-center sm:justify-start sm:items-start">
                  <Image className="w-10" src={logo} alt={"logo"} />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                      Blood
                    </span>
                    Finder
                  </span>
                </a>
                <h3 className="text-lg text-gray-600 mt-4">
                  Life-saving app: Instant help, zero panic.
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2 text-center sm:text-left">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a href="" className="hover:underline ">
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="" className="hover:underline">
                        Discord
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <div className="flex flex-col justify-center items-center sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center ">
                © 2023{" "}
                <a href="" className="hover:underline">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r  from-red-400 via-red-500 to-red-600 transition hover:bg-gradient-to-br">
                    Blood
                  </span>
                  Finder™
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center items-center sm:mt-5">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19">
                    <path
                      fillRule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17">
                    <path
                      fillRule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
