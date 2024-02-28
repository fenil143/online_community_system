'use client'
import { FormEvent, useState } from "react";

import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';
function handleRegistration() {
    console.log('Registration button clicked');
    // ... rest of your registration logic
}

function register() {
    // const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [temp,setImg]=useState(undefined);
    const [githubLink, setGithubLink] = useState('');
    const [githubLinkError, setGithubLinkError] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [linkedinLinkError, setLinkedinLinkError] = useState('');

    const isGithubLinkValid = (link: any) => {
        const githubLinkRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)?$/;
        return githubLinkRegex.test(link);
    };

    const handleGithubLinkChange = (e: any) => {

        const newLink = e.target.value;
        if (isGithubLinkValid(newLink) || newLink === '') {
            setGithubLink(newLink);
            setGithubLinkError('');
        } else {
            setGithubLinkError('Please paste a valid GitHub link.');
        }
    };
    const isLinkedinLinkValid = (link: any) => {
        const linkedinLinkRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
        return linkedinLinkRegex.test(link);
    };

    const handleLinkedinLinkChange = (e: any) => {
        const newLink = e.target.value;
        if (isLinkedinLinkValid(newLink) || newLink === '') {
            setLinkedinLink(newLink);
            setLinkedinLinkError('');
        } else {
            setLinkedinLinkError('Please paste a valid LinkedIn link.');
        }
    };
    
    // function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
       
    //     setLoading(true);
    //     console.log(loading);
    //     event.preventDefault();
        
    //     try{
    //     const formData: { [key: string]: any } = {};
        
    //     const formElements = event.currentTarget.elements as HTMLFormControlsCollection;

    //     for (let i = 0; i < formElements.length; i++) {
    //         const element = formElements[i];
    //         if (element.id) {
    //             formData[element.id] = (element as HTMLInputElement).value;
    //         }
    //     }
    //     const data = new FormData();
    //     if (temp) {
    //         data.append("file", temp);
    //     } else {
    //         console.error("Image is undefined");
    //     }
    //     data.append("upload_preset", "xtf3nszf");
    //     data.append("cloud_name", "da3airmpg");

    //     fetch("https://api.cloudinary.com/v1_1/da3airmpg/image/upload", {
    //         method: "post",
    //         body: data
    //     }).then((res) => res.json()).then((data) => {
    //         console.log(data)
    //         formData["starting_date"] = Date.now().toString();
    //         formData["image"] = data.url;
    //         formData["name"] = formData["firstName"] + " " + formData["lastName"];
    //         console.log(formData);
    //         axios.post('https://online-community-system.onrender.com/storeStudent', formData)
    //             .then(response => {
    //                 console.log(response.data);
    //                 if (response.data.message) {
    //                     alert('Registration successful! Your details will be verified.');
    //                    // router.replace("/landing")
    //                    // history("/landing");
    //                 } else {
    //                     alert(response.data.error);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 alert('Registration failed. Internal Server Error.');
    //             }).finally(()=>{
    //                 setLoading(false);
    //             });

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    //     console.log('User Data:', formData);
    // }
    // catch (error) {
    //     console.error(error);
    //     alert('Registration failed. Internal Server Error.');
    // } finally {
    //     setLoading(false); // Set loading back to false when form submission is complete
    // }
       
    // }
    
    function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
        setLoading(true);
        console.log(loading);
        event.preventDefault();
    
        try {
            const formData: { [key: string]: any } = {};
    
            const formElements = event.currentTarget.elements as HTMLFormControlsCollection;
    
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if (element.id) {
                    formData[element.id] = (element as HTMLInputElement).value;
                }
            }
    
            const data = new FormData();
            if (temp) {
                data.append("file", temp);
            } else {
                console.error("Image is undefined");
            }
            data.append("upload_preset", "xtf3nszf");
            data.append("cloud_name", "da3airmpg");
    
            fetch("https://api.cloudinary.com/v1_1/da3airmpg/image/upload", {
                method: "post",
                body: data
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                formData["starting_date"] = Date.now().toString();
                formData["image"] = data.url;
                formData["name"] = formData["firstName"] + " " + formData["lastName"];
                console.log(formData);
    
                axios.post('https://online-community-system.onrender.com/storeStudent', formData)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.message) {
                            alert('Registration successful! Your details will be verified.');
                            // router.replace("/landing")
                            // history("/landing");
                        } else {
                            alert(response.data.error);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        alert('Registration failed. Internal Server Error.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((err) => {
                console.log(err);
                alert('Image upload failed. Please try again.');
                setLoading(false);
            });
    
            console.log('User Data:', formData);
        } catch (error) {
            console.error(error);
            alert('Registration failed. Internal Server Error.');
            setLoading(false);
        }
    }
    
    return (
        <div className="w-full lg:w-7/12 bg-blue-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none overflow-y-auto mx-auto">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
            <form className="px-4 sm:px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded " onSubmit={handleFormSubmit}>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="md:ml-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white " htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="password"
                        type="password"
                        placeholder="******"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="userImage">
                        User Image
                    </label>
                    {image && (
                        <div className="mt-3">

                            <img
                                src={image}
                                alt="Selected User Image"
                                className="w-full h-auto border rounded"
                            />
                        </div>
                    )}
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="userImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file: any = e.target.files && e.target.files[0];

                            if (file.size > 5 * 1024 * 1024) {
                                alert("Image size should be less than 5MB.");
                            } else {
                                setImg(file);
                                setImage(URL.createObjectURL(file))
                            }
                        }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="experience">
                        Experience
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="experience"
                        type="number"
                        min={0}
                        placeholder="Experience"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="college">
                        University
                    </label>
                    <select required id="university" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">

                        <option value="DDU">Dharmsinh Desai University(DDU)</option>
                        <option value="GTU">Gujarat Technological University(GTU)</option>
                        <option value="Nirma">Nirma University</option>
                        <option value="LJ">LJ University</option>
                        <option value="SOU">Silver Oak University</option>
                        <option value="GU">Gujarat University</option>

                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="college">
                        College
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="college"
                        type="text"
                        placeholder="College"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="skill">
                        Skills (comma-separated)
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="skill"
                        type="text"
                        placeholder="e.g., JavaScript, React, CSS"
                        required
                    />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="cpi">
                            CPI
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                            id="cpi"
                            type="number"
                            min="1"
                            max="10"
                            step="any"
                            placeholder="CPI"
                            required
                        />
                    </div>
                    <div className="md:ml-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="graduationYear">
                            Graduation Year
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                            id="graduation_year"
                            type="number"
                            min="1999" max="2030"
                            placeholder="Graduation Year"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="qualification">
                        Qualification
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="qualification"
                        type="text"
                        placeholder="Qualification"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="linkedin_link">
                        LinkedIn Link
                    </label>
                    <input
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none ${linkedinLinkError ? 'border-red-500' : 'border-blue-300 bg-gray-100'
                            }`}
                        id="linkedin_link"
                        type="text"
                        placeholder="LinkedIn Link"
                        value={linkedinLink}
                        onChange={handleLinkedinLinkChange}
                        required
                    />
                    {linkedinLinkError && <p className="text-red-500 text-xs italic">{linkedinLinkError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="github_link">
                        GitHub Link
                    </label>
                    <input
                        className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none ${githubLinkError ? 'border-red-500' : 'border-blue-300 bg-gray-100'
                            }`}
                        id="github_link"
                        type="text"
                        placeholder="GitHub Link"
                        value={githubLink}
                        onChange={handleGithubLinkChange}
                        required
                    />
                    {githubLinkError && <p className="text-red-500 text-xs italic">{githubLinkError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="description"
                        placeholder="Description"
                        rows={3 as number}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="field">
                        Field *
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="field"
                        type="text"
                        placeholder="Field"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="workingLocation">
                        Working Location *
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="working_location"
                        type="text"
                        placeholder="Working Location"
                    />
                </div>
                <div className="mb-6 text-center">
                    <button
                        className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline border-blue-300'
                            }`}
                        type="submit"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Registering...' : 'Register Account'}
                    </button>

                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="/authentication/loginStudent">
                        Already have an account? Login!
                    </Link>
                </div>
            </form>

        </div>

    );
}
export default register;

function parseString(arg0: number): unknown {
    throw new Error("Function not implemented.");
}