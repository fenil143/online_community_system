'use client'
import { FormEvent } from "react";

function handleRegistration() {
    console.log('Registration button clicked');
    // ... rest of your registration logic
}

function register() {
    function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
        // throw new Error("Function not implemented.");
    }

    return (
        <div className="w-full lg:w-7/12 bg-blue-50 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none overflow-y-auto">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded " onSubmit={handleFormSubmit}>
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
                        placeholder="******************"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="address"
                        type="text"
                        placeholder="Address"
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
                        type="text"
                        placeholder="Experience"
                        required
                    />
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
                            id="graduationYear"
                            type="number"
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
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="objective">
                        Objective
                    </label>
                    <textarea
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="objective"
                        placeholder="Objective"
                        rows={3 as number}
                        required
                    ></textarea>
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
                        Field
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="field"
                        type="text"
                        placeholder="Field"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="hobbies">
                        Hobbies
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="hobbies"
                        type="text"
                        placeholder="Hobbies"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="workingLocation">
                        Working Location
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline border-blue-300 bg-gray-100"
                        id="workingLocation"
                        type="text"
                        placeholder="Working Location"
                    />
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline border-blue-300"
                        type="submit" onClick={handleRegistration}
                    >
                        Register Account
                    </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                        Already have an account? Login!
                    </a>
                </div>
            </form>

        </div>

    );
}
export default register;

