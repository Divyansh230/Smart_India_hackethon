import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Landing() {
  return (
    <>
    <div class="relative">
      {/* Background Image */}
      <img class="absolute inset-0 w-full h-full object-cover -z-10" src="src/4661676.jpg" alt="background" />
      
      {/* Header Section */}
      <div class="flex justify-evenly items-center py-4">
        <Link to="/login">
        <button class="border-2 px-4 py-2 rounded-xl hover:text-white text-xl mt-4 ml-3 opacity-75 text-black
         bg-white hover:bg-black inline transition ease-in-out delay-150
           hover:-translate-y-1 hover:scale-110  duration-300 ...  hover:opacity-100 ">Login</button>
        </Link>
        <p class="italic font-bold text-3xl text-gray-700">Captcha Replacement</p>
        <Link to="/signup">
          <button class="text-black border-2 px-4 py-2 rounded-xl text-xl opacity-75 bg-white hover:bg-black
           hover:text-white hover:opacity-100 hover:scale-110 transition transform duration-300">Sign up</button>
        </Link>
      </div>
      
      {/* Main Content */}
      <div class="flex flex-col items-center text-center pt-28">
        <h1 class="text-6xl px-20 hover:scale-110 transition transform duration-300">Want to evolve the captcha system of old Generation?</h1>
        <p class="mx-20 pt-10 text-gray-500 text-xl">
          Evolving a new CAPTCHA system is an exciting challenge, especially if you're aiming for an innovative, user-friendly, and secure solution.
        </p>
        <Link to="/signup">
          <button class="border-2 text-xl font-bold bg-black text-white px-8 py-4 rounded-full mt-10 hover:bg-white hover:text-black hover:opacity-75 transition duration-300">Sign up free</button>
        </Link>
      </div>

      {/* Additional Images */}
      <img class="absolute w-full top-[537px] -z-10" src="src/4661676.jpg" alt="background" />
      <img class="h-[737px] w-[714px] mx-auto pt-40" src="src/Untitled_design__2_-removebg-preview.png" alt="example" />
      
      {/* How It Works Section */}
      <div class="text-center font-bold text-4xl pt-20">Here's how it works</div>
      <div class="text-center text-2xl pt-5 text-gray-600">More privacy, Less risk.</div>
      
      <div class="flex justify-between pt-32 mx-20">
        <div class="flex flex-col w-1/3 text-center">
          <div class="text-2xl font-bold">Display Captcha</div>
          <p class="text-gray-600 text-xl px-10">Captcha is displayed on the screen, and the user needs to draw it on the whiteboard.</p>
        </div>
        <div class="flex flex-col w-1/3 text-center">
          <div class="text-2xl font-bold">Takes Input</div>
          <p class="text-gray-600 text-xl px-10">When the user draws the captcha, it checks if it’s correct.</p>
        </div>
        <div class="flex flex-col w-1/3 text-center">
          <div class="text-2xl font-bold">Differentiate Between User and Bot</div>
          <p class="text-gray-600 text-xl px-10">If the captcha is imperfect, it's likely a human; otherwise, it's a bot.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div class="flex justify-center pt-10">
        <button class="border-2 text-xl font-bold bg-black text-white px-8 py-4 rounded-full hover:bg-red-400 transition duration-300">Sign Identification</button>
      </div>

      {/* Footer */}
      <footer class="text-center pt-36">
        <p class="italic font-bold text-3xl text-gray-700">Captcha Replacement</p>
        <p class="text-gray-700 pt-5">Get Connected and Start Now</p>
        <div class="flex justify-center pt-7 space-x-5">
          <a href="#" class="text-gray-700">About</a>
          <a href="#" class="text-gray-700">Privacy</a>
          <a href="#" class="text-gray-700">Terms</a>
          <a href="#" class="text-gray-700">Contact</a>
        </div>
        <p class="text-gray-700 pt-7">© 2024 Captcha Replacement. All rights reserved.</p>
      </footer>
    </div>







    <div class="">
      <div class="flex justify-evenly">
      <img class="block w-full absolute flex-wrap flex -z-10" src="src/4661676.jpg"></img>
      
      <button class="border-2 px-4 py-2 rounded-xl hover:text-white text-xl mt-4 ml-3 opacity-75 bg-white hover:bg-black inline transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...  hover:opacity-100 ">Login</button>
      <p class="text-center italic font-bold text-3xl pt-4 text-gray-700">Captcha Replacement</p>
        
      <button class="border-2 opacity-75 bg-white px-4 py-2 rounded-xl hover:text-white text-xl mt-4 ml-3  hover:bg-black inline transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:opacity-100  duration-300 ...  ">Sign up</button>
        </div>

      <div class="flex justify-center">
      <img class=" opacity-25 h-44 " src="src/WhatsApp Image 2024-08-28 at 14.30.03_b25c67a5.jpg"></img>
        </div>

      
      
      <div class="flex flex-col justify-center">
      <div class="text-center text-6xl pt-10 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ... px-80">
        Want to evolve the captcha system <br/> of old Generation?
      </div>
      <div class="mx-80 pt-10 text-gray-500 text-xl text-center">
      Evolving a new CAPTCHA system is an exciting challenge, especially if you're aiming for an innovative, user-friendly, and secure solution. Would you like to dive deeper into any specific area, such as blockchain integration, or the development of machine learning models for CAPTCHA?
      </div>
        <div class="flex justify-center pt-10">
      <button class="border-2 text-xl font-bold bg-black text-white px-8 py-4 rounded-full hover:bg-white hover:opacity-75 hover:text-black">Sign up free</button>
          </div>
      </div>
      
        <img class="w-full mt-[537px] absolute -z-10" src="src/4661676.jpg"></img>
        <img class="h-[737px] w-[714px] ml-80 pt-40" src=""></img>
      <div class="flex justify-center font-bold text-4xl pt-20">Here's how it works</div>
      <div class="flex justify-center text-2xl pt-5 text-gray-600">More privacy, Less risk.</div>
      <div class="flex pt-32 justify-between">
        <div class="flex flex-col w-1/3">
        <div class="text-2xl font-bold text-center">
          Display Captcha
        </div>
        <div class="text-gray-600 text-xl text-center px-20">
          Captcha is displayed on the screen and user need to draw the captcha on the white board.       
        </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="text-2xl font-bold text-center">
            Takes Input
          </div>
          <div class="text-gray-600 text-xl text-center px-20">
            When user draws th captcha it checks if the captcha drawn is perfect or not.       
          </div>
          </div>
        <div class="flex flex-col w-1/3">
          <div class="text-2xl font-bold text-center">
            Differentiate Between user and bot
          </div>
          <div class="text-gray-600 text-xl text-center px-20">
            When it detect that captcha drawn is not perfect then it mean it is a human and continue otherwise it detects bot.        
          </div>
          </div>
      </div>
      <div class="flex justify-center pt-10">
      <button class="border-2 text-xl font-bold bg-black text-white px-8 py-4 rounded-full hover:bg-red-400">Sign Identification</button>
      </div>
       <p class="text-center italic font-bold text-3xl pt-36 text-gray-700">Captcha Replacement</p>
      <div class="text-center pt-5 text-gray-700 ">Get Connected and Start Now</div>
      <div class="flex justify-center pt-7">
      <div class=""> 
        <a class="pr-5" href="">About
        </a>
        <a href="" class="pr-5">Privacy</a>
         <a href="" class="pr-5">Terms</a>
         <a href="" class="pr-5">Contact</a>
      </div>
        </div>
      <div class="text-center text-gray-700 pt-7">© 2024 Captcha Replacement. All rights reserved.
      </div>
       
    
    </div>
    </>
  );
}

export default Landing;
