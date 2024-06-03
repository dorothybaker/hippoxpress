import { IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

function Footer() {
  return (
    <footer className="bg-black/80 text-white font-light">
      <section className="flex items-start justify-between max-w-7xl w-full mx-auto px-4 py-10 gap-5 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-primary text-lg">Hippoxpress</h1>
          <p className="text-sm whitespace-nowrap">
            Where taste and speed matters!
          </p>
          <p className="text-sm w-full">
            Our mission is to satisfy your cravings and elevate your dinning
            experience, one deliciuos meal at a time!
          </p>
          <div className="flex items-center gap-4 text-white/80 mt-2">
            <IoLogoFacebook size={26} />
            <IoLogoTwitter size={26} />
            <IoLogoLinkedin size={26} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="title">COMPANY</h2>
          <ul className="text-sm text-white/80 flex flex-col gap-1 whitespace-nowrap">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery options</li>
            <li>Privacy policy and terms</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="title">USEFUL LINKS</h2>
          <ul className="text-sm text-white/80 flex flex-col gap-1 whitespace-nowrap">
            <li>My Account</li>
            <li>Terms and conditions</li>
            <li>MSA Statement</li>
            <li>Work with us</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="title">GET IN TOUCH</h2>
          <ul className="text-sm flex flex-col gap-1">
            <li>+123 - 456 - 7890</li>
            <li>hippoxpresssupport@gmail.com</li>
            <li></li>
          </ul>
        </div>
      </section>
      <div className="bg-white/20 w-full h-[2px]" />
      <p className="px-4 py-5 text-center">
        Copyright &copy; 2024 hippoxpress.com
      </p>
    </footer>
  );
}

export default Footer;
