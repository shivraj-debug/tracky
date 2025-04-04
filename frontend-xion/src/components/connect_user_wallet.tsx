"use client";

import { useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

import { Settings } from "lucide-react";
import Link from "next/link";
import { useGlobalProvider } from "@/lib/globalProvider";
import { useRouter } from "next/navigation";

export default function ConnectUserWallet(): JSX.Element {
  const { user } = useGlobalProvider();
  const router = useRouter();
  const { data: account } = useAbstraxionAccount();
  
  // Use the modal state from Abstraxion
  const [, setShowModal] = useModal();

  useEffect(() => {
    if (user?.loading) return; // Wait until user data is loaded

    if (!user?.walletAddress || !user?.isLogged) {
      setShowModal(true); // Show login modal if wallet is not connected or user is not logged in
      return;
    }

    // Redirect to dashboard if user is logged in
    router.push("/dashboard");
  }, [user, setShowModal, router]);

  return (
    <>
      {account?.bech32Address ? (
        <Link href={"/settings"}>
          <Settings className="w-4 h-4 inline mr-1" />
        </Link>
      ) : (
        <div
          onClick={() => setShowModal(true)}
          className="text-white bg-primary font-semibold p-4 rounded-md cursor-pointer active:scale-95 duration-200"
        >
          Login To Start
        </div>
      )}

      <Abstraxion onClose={() => setShowModal(false)} />
    </>
  );
}
