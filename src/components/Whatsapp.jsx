import Link from "next/link";
import { IoArrowBack, IoCheckmarkCircle, IoCopy, IoCheckmark, IoQrCode, IoCard, IoCloudUpload, IoLogoWhatsapp } from "react-icons/io5";

export default function Whatsapp () {
  return (
    <Link target="_blank" href="https://api.whatsapp.com/send/?phone=2349125273293&text=Hello%2C%20I%20saw%20your%20%22Learn%20JavaScript%20Once%2C%20Build%20on%20All%20Platforms%20%2B%20Internship%22%20ad.%20I%20would%20like%20to%20enquire%20about%20the%20program.&type=phone_number&app_absent=0" className="z-10 fixed bottom-10 right-5 text-white px-4 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:shadow-academy-primary/30 flex items-center bg-green-500">
      <IoLogoWhatsapp size="45" className="w-4 h-4"/>
    </Link>
  )
}