import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: "📊", href: "/dashboard" },
    { name: "Transactions", icon: "💰", href: "/transactions" },
    { name: "Start Here", icon: "🚀", href: "/start-here" },
    { name: "FAQ", icon: "❓", href: "/faq" },
    { name: "Learning Modules", icon: "📚", href: "/learning-modules" },
    { name: "Rewards", icon: "🏆", href: "/rewards" },
    { name: "Feedback", icon: "📝", href: "/feedback" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 bg-card text-card-foreground shadow-md">
        <div className="p-4 border-b border-border">
          <div className="text-primary text-2xl font-bold border-2 border-primary rounded p-2 text-center">
            Logo
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2 text-muted-foreground uppercase text-xs font-semibold">
            General
          </div>
          {navItems.map((item) => (
            <Link legacyBehavior href={item.href} key={item.name}>
              <a
                className={`flex items-center px-4 py-2 mt-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                  router.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-card text-card-foreground border-b border-border">
          <h1 className="text-2xl font-semibold">
            {router.pathname.slice(1).charAt(0).toUpperCase() +
              router.pathname.slice(2)}
          </h1>
          <div className="flex items-center relative">
            <div className="relative">
              <Image
                src={user?.avatarUrl || "/placeholder.svg?height=32&width=32"}
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
                alt="User avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              <button
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1"
                onClick={() => router.push("/profile")}
              ></button>
            </div>
            {user && (
              <span className="ml-2 text-sm font-medium">{user.name}</span>
            )}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-10 top-full">
                {user ? (
                  <>
                    <Link legacyBehavior href="/profile">
                      <a className="block px-4 py-2 text-sm bg-orange-500 text-white hover:bg-accent hover:text-accent-foreground">
                        Profile
                      </a>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm bg-orange-500 text-white hover:bg-accent hover:text-accent-foreground"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link legacyBehavior href="/login">
                    <a className="block px-4 py-2 text-sm bg-orange-500 text-gray-700 hover:bg-accent hover:text-accent-foreground">
                      Login
                    </a>
                  </Link>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
