export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>
              <span className="font-semibold text-lg text-white">LinkerAI</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">AI Automation Marketplace</p>
            <p className="text-sm text-gray-400 max-w-md">
              Connect with top AI automation professionals and transform your business with cutting-edge solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            © 2025 LinkerAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
