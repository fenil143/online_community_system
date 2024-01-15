'use client';

export default function student() {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md mx-auto shadow-md rounded-lg bg-white p-8">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Create Community</h2>

                <form action="#" method="POST" className="space-y-6">
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
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Paste the URL of your community image"
                            required
                        />
                    </div>



                    <div

                        className="flex items-center justify-center">


                        <button


                            type="submit"


                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
                        >
                            Create Community
                        </button>
                    </div>
                </form>
            </div>
        </div>



    );
}