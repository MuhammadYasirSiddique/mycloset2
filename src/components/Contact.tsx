import React from "react";
import Link from "next/link";
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Twitter, Facebook, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex justify-center items-center mb-10 mx-10 lg:mx-20 min-h-screen">
      <div className="  text-center md:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="mb-6 md:mb-0 col-span-2 lg:col-span-2">
          <h1 className="font-serif text-2xl">
            My <strong>Closet</strong>
          </h1>
          <br />
          <div className="">
            Small, artisan label that offers a thoughtfully curated collection
            of high-quality everyday essentials made.
          </div>
          <br />
          <div className="flex flex-row gap-x-4 justify-center items-center md:justify-start">
            <Link href="#">
              <div className="bg-slate-200 p-4 rounded-lg">
                <Twitter />
              </div>
            </Link>
            <Link href="#">
              <div className="bg-slate-200 p-4 rounded-lg">
                <Facebook />
              </div>
            </Link>
            <Link href="#">
              <div className="bg-slate-200 p-4 rounded-lg">
                <Linkedin />
              </div>
            </Link>
          </div>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="font-serif text-2xl">Company</h1>
          <br />
          <p>About</p>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>How it Works</p>
          <p>Contact Us</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="font-serif text-2xl">Support</h1>
          <br />
          <p>Support Center</p>
          <p>24h Service</p>
          <p>Quick Chat</p>
        </div>
        <div>
          <h1 className="font-serif text-2xl">Contact</h1>
          <br />
          <p>WhatsApp</p>
          <p>Support</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
