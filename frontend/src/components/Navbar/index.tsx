import Logo from "../../assets/logo.svg";

export default function Navbar() {
  return (
    <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
      <div className="flex items-center">
        <img src={Logo} /> ProvAÍ
      </div>
      <a href="/" className="py-2 px-4 text-white bg-black rounded-3xl">
        Home
      </a>
    </nav>
  );
}
