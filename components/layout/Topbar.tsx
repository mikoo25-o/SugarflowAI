"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut, User } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchCurrentProfile } from "@/lib/supabase/queries/profile";

const DEMO_USER = { name: "David Mwangi", role: "Operations Manager" };

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState(DEMO_USER);

  useEffect(() => {
    fetchCurrentProfile().then((profile) => {
      if (profile) {
        setUser({ name: profile.fullName, role: profile.role });
      }
    });
  }, []);

  async function handleLogout() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <button onClick={onMenu} className="text-gray-500 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden text-sm text-gray-400 lg:block">
        {!isSupabaseConfigured && "Demo Mode — connect Supabase for real accounts and data"}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-brand-dark">{user.name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
          <User className="h-4 w-4" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-black/5"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}
