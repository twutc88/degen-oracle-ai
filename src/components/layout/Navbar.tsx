import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, ChartBarIcon, MagnifyingGlassIcon, StarIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AlertSettingsModal from '../modals/AlertSettingsModal';
import { AlertSettings } from '../../types';

const initialAlertSettings: AlertSettings = {
  priceChange: true,
  volumeChange: true,
  holdersChange: true,
  enablePriceAlerts: true,
  enableVolumeAlerts: true,
  enableHoldersAlerts: true,
  priceChangeThreshold: 10,
  volumeChangeThreshold: 100,
  holdersChangeThreshold: 20,
  maxAlertsPerDay: 50,
  alertCooldownMinutes: 30,
  notificationChannels: {
    telegram: true,
    email: false
  }
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(initialAlertSettings);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSaveAlertSettings = (newSettings: AlertSettings) => {
    setAlertSettings(newSettings);
    setIsAlertModalOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Trends', icon: ChartBarIcon },
    { path: '/discovery', label: 'Discovery', icon: MagnifyingGlassIcon },
    { path: '/watchlist', label: 'Watchlist', icon: StarIcon }
  ];

  return (
    <nav className="bg-[#111111] border-b border-[#333333] sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex items-center h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-[#88D693] bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-200">
                <span className="text-[#88D693] font-bold text-xl">D</span>
              </div>
              <span className="text-[#88D693] font-bold text-xl tracking-tight hidden md:block">
                DEGEN ORACLE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === path
                    ? 'text-[#88D693] bg-[#1A1A1A]'
                    : 'text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section: Search + Settings */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Search Box - Hidden on mobile */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tokens..."
                className="w-64 bg-[#1A1A1A] text-gray-300 placeholder-gray-500 pl-10 pr-4 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#88D693] focus:ring-1 focus:ring-[#88D693]"
              />
            </div>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50 transition-all duration-200"
            >
              <BellIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#88D693] text-black text-xs font-medium rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Alert Settings - Hidden on mobile */}
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="hidden md:block p-2 rounded-lg text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50 transition-all duration-200"
            >
              <Cog6ToothIcon className="w-6 h-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tokens..."
                  className="w-full bg-[#1A1A1A] text-gray-300 placeholder-gray-500 pl-10 pr-4 py-2 rounded-lg border border-[#333333] focus:outline-none focus:border-[#88D693] focus:ring-1 focus:ring-[#88D693]"
                />
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? 'text-[#88D693] bg-[#1A1A1A]'
                      : 'text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Mobile Settings */}
              <button
                onClick={() => {
                  setIsAlertModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-[#88D693] hover:bg-[#1A1A1A]/50 transition-all duration-200"
              >
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alert Settings Modal */}
      <AlertSettingsModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        settings={alertSettings}
        onSave={handleSaveAlertSettings}
      />
    </nav>
  );
};

export default Navbar;
