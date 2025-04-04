import ConnectUserWallet from "@/components/connect_user_wallet";

export default function Home() {
  return (
    <>
      <h1 className="text-primary text-6xl min-w-[100svw] h-screen flex items-center justify-center">
        <ConnectUserWallet />
      </h1>
    </>
  );
}