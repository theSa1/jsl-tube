import Link from "next/link";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <nav className="fixed left-0 right-0 z-20 bg-[#161515] px-5 shadow-lg">
        <div className="container mx-auto flex h-14 max-w-6xl items-center">
          <h1 className="text-2xl font-bold text-white">JSL Tube</h1>
        </div>
      </nav>
      <div className="h-14"></div>
      <div className="container mx-auto px-5 py-10">
        <div className="mx-auto max-w-6xl">
          {children}
          <p className="mt-5 text-center text-white">
            Made With ❤️ By{" "}
            <Link
              href="https://sa1.dev/"
              className="font-bold text-[#4fd1c5] underline"
            >
              SA1
            </Link>
          </p>
          <p className="mt-1 text-center text-white">
            Contribute on{" "}
            <Link
              href="https://github.com/theSa1/jsl-tube"
              className="font-bold text-[#4fd1c5] underline"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
