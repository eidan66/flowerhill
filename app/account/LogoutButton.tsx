"use client";

import { logoutAction } from "@/app/actions/auth";
import { useTransition } from "react";

interface Props {
  labels: { logout: string; loggingOut: string };
}

export default function LogoutButton({ labels }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={() => { startTransition(async () => { await logoutAction(); }); }}>
      <button type="submit" disabled={isPending}
        className="text-sm text-gray-600 hover:text-red-600 border border-gray-300 hover:border-red-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
        {isPending ? labels.loggingOut : labels.logout}
      </button>
    </form>
  );
}
