'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-radial-purple dark:bg-radial-black text-white px-2" id="contact-us">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Get in Touch and Policies - Left side on desktop */}
          <div className="md:col-span-5 md:col-start-1 md:col-end-6 order-3 md:order-1">
            <div className="grid grid-cols-3 gap-8">
              {/* Get in Touch Column - 2/3 width */}
              <div className="col-span-2">
                <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium">Address :</p>
                    <p>Signify Innovations India Limited,</p>
                    <p>c/o Mangalam Business Center,</p>
                    <p>22, Camac Street, Block B, 6th</p>
                    <p>Floor, Kolkata - 700016,</p>
                    <p>West Bengal, India.</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone :</p>
                    <p>1800 120 800 008 (Toll Free)</p>
                  </div>
                  <div>
                    <p className="font-medium">Email :</p>
                    <p>customercare_ecolinklighting@signify.com</p>
                  </div>
                </div>
              </div>

              {/* Policies Column - 1/3 width */}
              <div className="col-span-1">
                <h3 className="text-xl font-medium mb-4">Policies</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="https://www.signify.com/en-in/privacy-notice" target="_blank" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-use" className="hover:underline">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.signify.com/global/product-security" target="_blank" className="hover:underline">
                      Product Security
                    </Link>
                  </li>
                  <li>
                    <Link href="/store-locator" className="hover:underline">
                      Store Locator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logo and Social Icons - Middle on desktop, top on mobile */}
          <div className="md:col-span-2 md:col-start-6 md:col-end-8 order-1 md:order-2 flex flex-col items-center lg:mt-[-60px]">
            <div className="mb-6  rounded-lg p-4">
              <Image 
                src="/logo.svg" 
                alt="EcoLink Logo" 
                width={200} 
                height={80} 
                className="w-auto"
              />
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Link href="https://www.facebook.com/people/EcoLink-India/100066838484524/" target="_blank" aria-label="Facebook">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaFacebook className="text-[#4A2570] text-xl" />
                </div>
              </Link>
              <Link href="https://www.instagram.com/ecolinkindia/" target="_blank" aria-label="Instagram">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaInstagram className="text-[#4A2570] text-xl" />
                </div>
              </Link>
              <Link href="https://www.youtube.com/@EcoLinkLightingIndia?app=desktop" target="_blank" aria-label="Twitter">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaYoutube className="text-[#4A2570] text-xl" />
                </div>
              </Link>
            </div>
          </div>

          {/* Product Menus - Right side on desktop */}
          <div className="md:col-span-5 md:col-start-8 md:col-end-13 order-2 md:order-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-center md:text-left">
              <div>
                <h4 className="text-lg font-semibold mb-3">BLDC Ceiling Fans</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/ceiling-fans/airoelevate" className="hover:underline">AiroElevate</Link></li>
                  <li><Link href="/ceiling-fans/airoquad" className="hover:underline">AiroQuad</Link></li>
                  <li><Link href="/ceiling-fans/airojewel" className="hover:underline">AiroJewel</Link></li>
                  <li><Link href="/ceiling-fans/airogeometry" className="hover:underline">AiroGeometry</Link></li>
                  <li><Link href="/ceiling-fans/stardustbldc" className="hover:underline">Stardust</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Smart Fans</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/smart-fans/airojewelsmart" className="hover:underline">AiroJewel Smart</Link></li>
                  <li><Link href="/smart-fans/airogeometrysmart" className="hover:underline">AiroGeometry Smart</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Decorative Fans</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/decorative-fans/airozephyr" className="hover:underline">AiroZephyr</Link></li>
                  <li><Link href="/decorative-fans/airoserenade" className="hover:underline">AiroSerenade</Link></li>
                  <li><Link href="/decorative-fans/airosleek" className="hover:underline">AiroSleek</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Economy Fans</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/economy-fans/vayuprohs" className="hover:underline">VayuPro</Link></li>
                  <li><Link href="/economy-fans/vayuultra" className="hover:underline">VayuUltra</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-center border-t border-white/20">
        <p className="text-sm">© 2018-2026 Signify Holding. All rights reserved.</p>
      </div>
    </footer>
  );
} 