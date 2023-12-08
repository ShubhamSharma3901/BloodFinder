import logo from "public/logo.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>
      <div className="w-[100vw] h-[100vh] flex flex-col gap-10 justify-start items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xxl text-center lg:py-10 z-10 flex flex-col gap-10 justify-start items-center">
          <nav className="backdrop-filter backdrop-blur-md fixed w-[70%] border-gray-200 rounded-[3rem] border shadow-lg px-3">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image className="w-10" src={logo} alt={"logo"} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Blood Finder
                </span>
              </a>

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
                      href="#"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 ">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 ">
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
            Be the Lifeline: Find Blood, Save Lives.{" "}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
            At Blood Finder, we streamline the process of locating blood during
            emergencies, eliminating the hassle and establishing a direct
            connection between blood banks and those in need.
          </p>
        </div>
      </div>
    </>
  );
}
