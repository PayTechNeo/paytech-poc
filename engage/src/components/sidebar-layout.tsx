import React, { useState } from 'react'

interface SidebarLayoutProps {
  navbar: React.ReactNode
  sidebar: React.ReactNode
  children: React.ReactNode
}

interface MobileSidebarProps {
  open: boolean
  close: () => void
  children: React.ReactNode
}

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true" className="h-6 w-6">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true" className="h-6 w-6">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function MobileSidebar({ open, close, children }: MobileSidebarProps) {
  if (!open) return null

  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 transition-opacity z-40"
        onClick={close}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-100 rounded-md"
              aria-label="Close navigation"
            >
              <CloseMenuIcon />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SidebarLayout({ navbar, sidebar, children }: SidebarLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="relative isolate flex min-h-screen w-full bg-white max-lg:flex-col lg:bg-gray-100">
      {/* Sidebar on desktop */}
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden bg-white shadow-lg">
        {sidebar}
      </div>

      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar on mobile */}
      <header className="flex items-center px-4 lg:hidden bg-white border-b">
        <div className="py-2.5">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
            aria-label="Open navigation"
          >
            <OpenMenuIcon />
          </button>
        </div>
        <div className="min-w-0 flex-1 ml-4">
          {navbar}
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:border lg:border-gray-200">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SidebarLayout 