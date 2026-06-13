'use client';
 
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
 
export default function BottomNav() {
  const pathname = usePathname();
 
  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      label: 'Statistik',
      href: '/hasil',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    },
    {
      label: 'Pengaturan',
      href: '/pengaturan',
      icon: (active: boolean) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
        </svg>
      )
    }
  ];

  const activeIndex = Math.max(0, navItems.findIndex((item) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  }));
 
  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-nav)] border-t border-[var(--border-nav)] backdrop-blur-lg safe-bottom md:hidden transition-colors duration-300">
        <div className="max-w-[720px] mx-auto grid grid-cols-3 py-2 px-4 relative">
          {/* Sliding Pill Indicator */}
          <div
            className="absolute top-2 bottom-2 left-4 right-4 grid grid-cols-3 pointer-events-none z-0"
            style={{ '--active-index': activeIndex } as React.CSSProperties}
          >
            <div
              className="h-full w-full bg-accent/8 border border-accent/15 rounded-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transform: `translateX(calc(var(--active-index) * 100%))`
              }}
            />
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
 
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative z-10 flex flex-col items-center gap-1 py-1 px-3 rounded-2xl active:scale-95 transition-all text-xs font-semibold ${
                  isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="p-1.5 rounded-xl transition-all">
                  {item.icon(isActive)}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
 
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:bottom-0 md:w-sidebar bg-[var(--bg-nav)] border-r border-[var(--border-nav)] backdrop-blur-lg py-8 px-4 z-40 justify-between transition-colors duration-300">
        <div className="flex flex-col gap-8">
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <img src="/icon-192.png" alt="Hondana Logo" className="w-8 h-8 rounded-lg object-contain shrink-0" />
            <span className="text-lg font-black bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              Hondana
            </span>
          </div>
 
          {/* Nav Items List */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
 
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 py-3 px-4 rounded-2xl active:scale-[0.98] transition-all text-sm font-bold border border-transparent ${
                    isActive
                      ? 'bg-accent/10 text-accent border-accent/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <div className={`transition-all ${isActive ? 'text-accent' : 'text-text-secondary'}`}>
                    {item.icon(isActive)}
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
 

      </aside>
    </>
  );
}
