"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/login");
  }
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  console.log(session);

  return <>{children}</>;
}
