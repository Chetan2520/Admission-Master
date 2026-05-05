import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 font-sans text-gray-600 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-2xl tracking-tighter text-gray-900">
                Admission <span className="text-blue-600">Expert</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              India's leading platform for data-driven college predictions and expert admission counselling. Helping 50,000+ students secure their future.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all border border-gray-100">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold text-base mb-8">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: "NEET Predictor", href: "/predictors/neet" },
                { name: "JEE Predictor", href: "/predictors/jee" },
                { name: "Top Colleges", href: "/colleges" },
                { name: "Exam Updates", href: "/exams" },
                { name: "VIP Counselling", href: "/counselling" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-blue-600" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-gray-900 font-bold text-base mb-8">Top Cities</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                "New Delhi",
                "Bangalore",
                "Mumbai",
                "Pune",
                "Hyderabad"
              ].map((city) => (
                <li key={city}>
                  <Link href={`/colleges-in-${city.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600 transition-colors">
                    Colleges in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-gray-900 font-bold text-base mb-8">Get in Touch</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-gray-600 font-medium">
                  123, Education Hub, <br />
                  Sector 62, Noida, UP - 201301
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-gray-600 font-medium">contact@admissionexpert.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-gray-600 font-medium">+91 99999 00000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 ADMISSION EXPERT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
             <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
             <Link href="/sitemap" className="hover:text-gray-900 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
