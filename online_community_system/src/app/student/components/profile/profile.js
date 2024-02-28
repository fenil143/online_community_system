import { use, useEffect, useState } from "react"
import axios from 'axios';

export default function Profile()
{
    const [student, setStudent] = useState();
const studentId = localStorage.getItem("student");
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [image,setImage]=useState();
    const [college,setCollege]=useState();
    const [university,setUniversity]=useState();
    const [skill,setSkill]=useState([]);
    const [description,setDescription]=useState();
    const [github,setGithub]=useState();
    const [linkedin,setLinkedIn]=useState();

const getStudentDetails = async () => {
  try {
    const requestsDetails = await axios.get(`https://online-community-system.onrender.com/getStudentInfo/${localStorage.getItem("student")}`);
    console.log(requestsDetails.data);
    setStudent(requestsDetails.data);
    setEmail(requestsDetails.data.email);
    setName(requestsDetails.data.name);
    setImage(requestsDetails.data.image);
    setCollege(requestsDetails.data.college);
    setUniversity(requestsDetails.data.university);
    setSkill(requestsDetails.data.skill);
    setDescription(requestsDetails.data.description);
    setGithub(requestsDetails.data.github_link);
    setLinkedIn(requestsDetails.data.linkedin_link);
  } catch (error) {
    console.error('Error fetching student details:', error);
  }
};

useEffect(() => {
  getStudentDetails(); // Call the async function

  // Note: You cannot directly log the `student` state immediately after calling `getStudentDetails`
  // because state updates are asynchronous. You'll see the correct value in the next render.
}, []);

// However, if you want to log the updated state, you can use another useEffect.
useEffect(() => {
  console.log(student);
  console.log(skill)
}, [student]); // Log when `student` state changes

    return (<>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>
        <section>
        <div class="w-full lg:w-10/12 px-4 mx-auto">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
        <div class="px-6">
            <div class="flex flex-wrap justify-center">
                <div class="flex flex-wrap justify-items-center">
                    <div class="w-3/3 px-4 flex justify-items-center mt-3">
                        <div class="flex justify-center">
                            <img alt="..." src={image} class="shadow-xl rounded-lg object-cover h-auto  max-w-xs md:max-w-md"/>
                        </div>
                    </div>
                </div>
            </div><div class="text-center ">
                <h3 class="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  
                </h3>
                <div class="text-sm leading-normal mt-3 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fa fa-user-alt mr-2 text-lg text-blueGray-400"></i>
                  {name}
                </div>
                <div class="flex justify-center mt-2 md:mt-0">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" class="flex p-px pl-2 pb-3 items-center hover:scale-125 transition-transform mr-2 ml-1">
                    <i class="bi bi-linkedin text-xl text-blue-500"></i>
                    <span class=" md:inline-block ml-1">LinkedIn</span>
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" class="flex items-center pl-2 pb-3 hover:scale-125 transition-transform mr-1">
                    <i class="bi bi-github text-xl text-black-500"></i>
                    <span class=" md:inline-block ml-1">GitHub</span>
                </a>
            </div>
                <div class="mb-2 text-blueGray-600 mt-6">
                  <i class="fa fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  {email}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {college},{university}
                </div>
                <div class="mb-2 text-blueGray-600">
                <i className="fa fa-cogs mr-2 text-lg text-blueGray-400"></i>
                {skill.join(', ')}
</div>

                
                
              </div>
              <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                     {description}
                    </p>
                    {/* <a href="javascript:void(0);" class="font-normal text-pink-500">
                      Show more
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer class="relative  pt-8 pb-6 mt-8">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap items-center md:justify-between justify-center">
              <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                <div class="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer> */}
        </section></>)
}