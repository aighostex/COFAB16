const Footer = () => {
  return (
    <footer className="bg-[#1F2E49] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">CONFERENCE OF FAITHFUL AMBASSADORS</h3>
            <p>The Rise of VIPs - 23rd August 2025</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400">Terms</a>
            <a href="#" className="hover:text-indigo-400">Privacy</a>
            <a href="#" className="hover:text-indigo-400">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-white text-sm">
          © {new Date().getFullYear()} The CONFAB16. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;