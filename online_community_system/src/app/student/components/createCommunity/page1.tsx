// 'use client';

// import axios from "axios";
// import { FormEvent, useState } from "react";
// import { useRouter } from 'next/navigation';

// function handleRegistration() {
//     console.log('Registration button clicked');
// }

// export default function student() {
//     const [image, setImage] = useState(undefined);
//     const router = useRouter();
//     let email = localStorage.getItem("student");

//     if (localStorage.getItem('student') === null) {
//         router.push("/authentication/loginStudent");
//     }

//     function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
//         event.preventDefault();
//         const formData: { [key: string]: any } = {};
//         const formElements = event.currentTarget.elements as HTMLFormControlsCollection;

//         for (let i = 0; i < formElements.length; i++) {
//             const element = formElements[i];
//             if (element.id) {
//                 formData[element.id] = (element as HTMLInputElement).value;
//             }
//         }
//         const data = new FormData();
//         if (image) {
//             data.append("file", image);
//         } else {
//             console.error("Image is undefined");
//         }
//         data.append("upload_preset", "xtf3nszf");
//         data.append("cloud_name", "da3airmpg");

//         fetch("https://api.cloudinary.com/v1_1/da3airmpg/image/upload", {
//             method: "post",
//             body: data
//         }).then((res) => res.json()).then((data) => {
//             console.log(data);
//             formData["owner_email"] = email;
//             formData["image"] = data.url;
//             console.log(formData);
//             axios.post('https://online-community-system.onrender.com/storeCommunity', formData)
//                 .then(response => {
//                     console.log(response.data);
//                     if (response.data.error) {
//                         alert(response.data.error);
//                     } else {
//                         alert("Your community request has been sent");
//                     }
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     alert('Registration failed. Internal Server Error.');
//                 });

//         }).catch((err) => {
//             console.log(err);
//         })

//     }

//     return (
//         <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen flex items-center justify-center px-4">
//             <div className="max-w-md mx-auto shadow-md rounded-lg bg-white p-8">
//                 <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Create Community</h2>

//                 <form action="#" method="POST" className="space-y-6" onSubmit={handleFormSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="community_name" className="block text-sm font-medium text-gray-700 mb-2">
//                             Community Name
//                         </label>
//                         <input
//                             type="text"
//                             id="community_name"
//                             name="community_name"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//                             placeholder="Enter a catchy community name"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label

//                             htmlFor="description"

//                             className="block text-sm font-medium text-gray-700 mb-2">Description</label>


//                         <textarea


//                             id="description"
//                             name="description"
//                             rows={4}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//                             placeholder="Tell us about your community"
//                             required
//                         ></textarea>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
//                         <input
//                             type="file"
//                             id="image"
//                             name="image"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//                             onChange={(e) => {
//                                 const file: any = e.target.files && e.target.files[0];

//                                 if (file.size > 1 * 1024 * 1024) {
//                                     alert("Image size should be less than 1MB.");
//                                 } else {
//                                     setImage(file);
//                                 }
//                             }}
//                             required
//                         />
//                     </div>



//                     <div

//                         className="flex items-center justify-center">


//                         <button


//                             type="submit"


//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300 transition duration-300" onClick={handleRegistration}
//                         >
//                             Create Community
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>



//     );
// }

'use client';
import axios from "axios";
import Cd from "./Create_Community_Lottie";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';

function handleRegistration() {
    console.log('Registration button clicked');
}

export default function student() {
    const [image, setImage] = useState(undefined);
    const router = useRouter();
    const [image1, setImage1] = useState<string | null>(null);
    let email = localStorage.getItem("student");

    if (localStorage.getItem('student') === null) {
        router.push("/authentication/loginStudent");
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const formData: { [key: string]: any } = {};
        const formElements = event.currentTarget.elements as HTMLFormControlsCollection;

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.id) {
                formData[element.id] = (element as HTMLInputElement).value;
            }
        }
        const data = new FormData();
        if (image) {
            data.append("file", image);
        } else {
            console.error("Image is undefined");
        }
        data.append("upload_preset", "xtf3nszf");
        data.append("cloud_name", "da3airmpg");

        fetch("https://api.cloudinary.com/v1_1/da3airmpg/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            formData["owner_email"] = email;
            formData["image"] = data.url;
            console.log(formData);
            axios.post('https://online-community-system.onrender.com/storeCommunity', formData)
                .then(response => {
                    console.log(response.data);
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        alert("Your community request has been sent");
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Registration failed. Internal Server Error.');
                });

        }).catch((err) => {
            console.log(err);
        })

    }

    return (
<div className="w-full font-poppins max-w-md mx-auto hover:scale-105 transition-transform justify-center duration-500 shadow-md bg-white rounded-xl  overflow-hidden md:max-w-3xl lg:max-w-4xl mt-4">
<div className="md:flex md:flex-wrap">
<div className="md:w-2/5 w-auto flex items-center justify-center">
  <Cd /> {/* Replace 32 with your desired fixed height */}
    </div>
    <div className="max-w-md mx-auto shadow-md rounded-lg bg-white p-8">
                 <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Create Community</h2>

                 <form action="#" method="POST" className="space-y-6" onSubmit={handleFormSubmit}>
                     <div className="mb-4">
                         <label htmlFor="community_name" className="block text-sm font-medium text-gray-700 mb-2">
                             Community Name
                         </label>
                         <input
                            type="text"
                            id="community_name"
                            name="community_name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Enter a catchy community name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label

                            htmlFor="description"

                            className="block text-sm font-medium text-gray-700 mb-2">Description</label>


                        <textarea


                            id="description"
                            name="description"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Tell us about your community"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                    {image1 && (
                <div className="mt-3">
                  
                    <img
                        src={image1}
                        alt="Selected User Image"
                        className="w-full h-auto border rounded"
                    />
                </div>
            )}
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                            onChange={(e) => {
                                const file: any = e.target.files && e.target.files[0];

                                if (file.size > 1 * 1024 * 1024) {
                                    alert("Image size should be less than 1MB.");
                                } else {
                                    setImage(file);
                                    setImage1(URL.createObjectURL(file))
                                }
                            }}
                            required
                        />
                    </div>



                    <div

                        className="flex items-center justify-center">


                        <button


                            type="submit"


                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300 transition duration-300" onClick={handleRegistration}
                        >
                            Create Community
                        </button>
                    </div>
                </form>
            </div>
  </div>
</div>

    );
}