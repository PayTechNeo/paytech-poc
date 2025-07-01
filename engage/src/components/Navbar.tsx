import React from 'react'
import { BellIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
import Logo from '../assets/images/Logo.png'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center h-16 px-4">
        {/* Left side - Mobile menu button and logo */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div className="flex-shrink-0 ml-4 md:ml-0">
            <img 
              src={Logo} 
              alt="NeoEngage Logo" 
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Right side - Navigation options, notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* Navigation options */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Resources
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Help
              </a>
            </div>
          </div>

          {/* Notifications bell */}
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Profile picture */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors duration-200 cursor-pointer">
              <UserIcon className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 