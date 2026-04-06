export default function TopicsPage() {
  return (
    <div className="text-sm">
      <h1 className="text-2xl font-bold mb-4">Research Topics</h1>
      <div className="flex flex-col md:flex-row">
        {/* Topics Form */}
        <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4 shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Add New Topic</h2>
          <form>
            <div className="mb-2">
              <label
                htmlFor="topicName"
                className="block text-sm font-medium text-gray-700"
              >
                Topic Name
              </label>
              <input
                type="text"
                id="topicName"
                placeholder="Topic Name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="topicDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="topicDescription"
                rows={3}
                placeholder="Topic Description"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Topic
            </button>
          </form>
        </div>

        {/* Topics List */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-2">Research Topics</h2>
          <ul className="list-decimal list-inside mt-4 space-y-2">
            <li className="text-blue-600 hover:underline">
              <a href="/topics/budgeting">Budgeting Tips</a>
            </li>
            <li className="text-blue-600 hover:underline">
              <a href="/topics/investing">Investing Basics</a>
            </li>
            <li className="text-blue-600 hover:underline">
              <a href="/topics/saving">Saving Strategies</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
