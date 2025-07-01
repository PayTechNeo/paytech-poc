import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  HomeIcon, 
  UsersIcon, 
  CreditCardIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customer', href: '/customer', icon: UsersIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Merchant', href: '/merchant', icon: BuildingStorefrontIcon },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Compliance', href: '/compliance', icon: ShieldCheckIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
]

const bottomNavigation: SidebarItem[] = [
  { name: 'Users & Terms', href: '/users', icon: DocumentCheckIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'auth/logout' })
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 bg-[#0f084b] shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Main Navigation Items */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 768) {
                      onToggle()
                    }
                  }}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#1a0f6b] text-white'
                      : 'text-gray-300 hover:bg-[#1a0f6b] hover:text-white'
                  }`}
                >
                  <span className="mr-3 flex-shrink-0 h-6 w-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Divider */}
          <div className="border-t border-[#1a0f6b] px-2 py-4">
            <div className="h-px bg-[#1a0f6b]"></div>
          </div>

          {/* Bottom Navigation Items */}
          <div className="px-2 py-4 space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 768) {
                      onToggle()
                    }
                  }}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#1a0f6b] text-white'
                      : 'text-gray-300 hover:bg-[#1a0f6b] hover:text-white'
                  }`}
                >
                  <span className="mr-3 flex-shrink-0 h-6 w-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Logout Button */}
          <div className="flex-shrink-0 flex border-t border-[#1a0f6b] p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-md transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar 