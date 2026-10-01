import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QuickExitButton } from './QuickExitButton';
import {
  Shield,
  BookOpen,
  FileText,
  AlertCircle,
  Menu,
  X,
  Eye,
  EyeOff,
  FolderLock,
  Layers,
  PhoneCall,
  Lock,
  CheckSquare,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { preferences, toggleDiscreetMode, triggerFakeCall } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDiscreet = preferences.discreetMode;

  const navLinks = isDiscreet
    ? [
        { to: '/home', label: 'Dashboard', icon: CheckSquare },
        { to: '/evidence', label: 'Archived Notes', icon: FolderLock },
        { to: '/refusal', label: 'Document Drafts', icon: FileText },
        { to: '/case/SK-2026-001', label: 'Task Notebook', icon: BookOpen },
        { to: '/support', label: 'Guidance Guides', icon: Layers },
      ]
    : [
        { to: '/home', label: 'Safety Hub', icon: Shield },
        { to: '/sos', label: 'SOS Alert', icon: AlertCircle, highlight: true },
        { to: '/evidence', label: 'Evidence Vault', icon: FolderLock },
        { to: '/refusal', label: 'FIR Refusal', icon: FileText },
        { to: '/case/SK-2026-001', label: 'Case Timeline', icon: BookOpen },
        { to: '/support', label: 'Support Pathways', icon: Layers },
      ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <Link
              to={isDiscreet ? '/home' : '/'}
              className="flex items-center gap-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 group"
              aria-label={isDiscreet ? 'Notes & Reminders Home' : 'Sakshi Platform Home'}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isDiscreet
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-indigo-900 text-indigo-100 shadow-sm'
                }`}
              >
                {isDiscreet ? (
                  <CheckSquare className="w-5 h-5 text-amber-800" />
                ) : (
                  <Shield className="w-5 h-5 text-indigo-200" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900">
                  {isDiscreet ? 'Notes & Reminders' : 'Sakshi'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  {isDiscreet ? 'Personal tasks & continuity' : 'Safety-to-Justice Continuity'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  } ${link.highlight && !isDiscreet ? 'text-rose-700 hover:bg-rose-50' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2">
            {/* Fake call demo trigger */}
            <button
              onClick={triggerFakeCall}
              aria-label="Simulate incoming fake call for safe exit"
              title="Practice / simulate incoming call for discreet exit"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">Fake Call</span>
            </button>

            {/* Discreet Mode Toggle */}
            <button
              onClick={toggleDiscreetMode}
              aria-label={isDiscreet ? 'Disable discreet mode' : 'Enable discreet mode'}
              title={
                isDiscreet
                  ? 'Switch back to standard Sakshi interface'
                  : 'Disguise interface as neutral "Notes & Reminders"'
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg font-medium border transition-colors cursor-pointer ${
                isDiscreet
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isDiscreet ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-800" />
                  <span className="hidden sm:inline">Discreet On</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Discreet Mode</span>
                </>
              )}
            </button>

            {/* Quick Exit */}
            <QuickExitButton />

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                triggerFakeCall();
                closeMobileMenu();
              }}
              className="text-xs text-indigo-700 flex items-center gap-1.5 py-1 px-2 rounded hover:bg-indigo-50"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Demo Fake Call
            </button>
            <Link
              to="/privacy"
              onClick={closeMobileMenu}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Limitations &amp; Privacy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
