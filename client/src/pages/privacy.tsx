export default function Privacy() {
  return (
        <div className="bg-blue-400">
          <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center flex-1 w-0">

                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">The privacy policy is fake as of now.</span>
                  <span className="hidden md:inline">Sorry! The privacy policy page is fake as of now.</span>
                </p>
              </div>
              <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href="/login"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-blue-300 hover:text-white"
                >
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
  )
}