"use client";

import { useState, useEffect } from "react";
import { HeroSwiper } from "@/components/hero/HeroSwiper";
import { DesktopHeroSwiper } from "@/components/hero/DesktopHeroSwiper";
import { ProductCard } from "@/components/fans/ProductCard";
import { DigiShieldSection } from "@/components/DigiShieldSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { CatalogSection } from "@/components/CatalogSection";
import { Footer } from "@/components/footer/Footer";
import { FAQItem } from "@/components/FAQItem";
import { HomeSchema } from "@/components/schema/HomeSchema";
import { 
  bldcFans, 
  smartbldcFans, 
  decorativeFans, 
  economyFansPro, 
  economyFansHS 
} from "@/lib/categoryUtils";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // const features = [
  //   {
  //     icon: "/home/icons/premium.svg",
  //     text: "PREMIUM AESTHETIC",
  //   },
  //   {
  //     icon: "/home/icons/air.svg",
  //     text: "SUPERIOR AIR DELIVERY",
  //   },
  //   {
  //     icon: "/home/icons/motor.svg",
  //     text: "100% COPPER MOTOR",
  //   },
  // ];

  const heroSlides = [
    {
      desktopBg: "/home/sliders/desktop/01.png",
      mobileBg: "/home/sliders/mobile/01.png?v=1",
      subheading: "",
      heading: "",
      buttonText: "",
      buttonLink: "/ceiling-fans/airoquad",
      features: null,
    },{
      desktopBg: "/home/sliders/desktop/02.png",
      mobileBg: "/home/sliders/mobile/02.png?v=4",
      subheading: "",
      heading: "",
      buttonText: "",
      buttonLink: "/ceiling-fans/airoelevate",
      features: null,
    },{
      desktopBg: "/home/sliders/desktop/03.png",
      mobileBg: "/home/sliders/mobile/03.png?v=1",
      subheading: "",
      heading: "",
      buttonText: "",
      buttonLink: "/ceiling-fans/airogeometry",
      features: null,
    },{
      desktopBg: "/home/sliders/desktop/04.png",
      mobileBg: "/home/sliders/mobile/04.png?v=1",
      subheading: "",
      heading: "",
      buttonText: "",
      buttonLink: "/ceiling-fans/airojewel",
      features: null,
    }
  ];

  const productFeatures = [
    {
      icon: "/home/icons/bldc.svg",
      text: "BLDC Technology",
    },
    {
      icon: "/home/icons/inverter.svg",
      text: "Premium Aesthetic",
    },
    {
      icon: "/home/icons/asthetics.svg",
      text: "2 Way Rotation",
    },
    {
      icon: "/home/icons/reverse.svg",
      text: "2 Way Rotation",
    },
  ];

  const decorativeproductFeatures = [
    {
      icon: "/home/icons/air-delivery.svg",
      text: "Superior Air Delivery",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/aluminium-blades.svg",
      text: "Aluminium Blades",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  const VayuProFeatures = [
    {
      icon: "/home/icons/effic-performence.svg",
      text: "Efficient Performance",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  const VayuHSFeatures = [
    {
      icon: "/home/icons/high-spped-fan.svg",
      text: "High Speed Fan",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  const productFeaturesList = [
    {
      icon: "/home/icons/rotation.svg",
      title: "2-WAY ROTATION FOR SUMMER AND WINTER",
    },
    {
      icon: "/home/icons/point.svg",
      title: "POINT ANYWHERE RF REMOTE",
    },
    {
      icon: "/home/icons/turbo.svg",
      title: "TURBO MODE",
    },
    {
      icon: "/home/icons/timer.svg",
      title: "BUILT IN TIMER FOR 2, 4 AND 6 HOUR",
    },
    {
      icon: "/home/icons/copper.svg",
      title: "100% COPPER WINDING",
    },
    {
      icon: "/home/icons/speed.svg",
      title: "6 SPEED AIR FLOW",
    },
    {
      icon: "/home/icons/led.svg",
      title: "UNIQUE LED DISPLAY",
    },
    {
      icon: "/home/icons/energy.svg",
      title: "UP TO 50% ENERGY SAVING WITH BLDC MOTOR",
    },
  ];
 
  const faqs = [
    {
      "question": "Q1: What types of fans are available?",
      "answer": "<ul><li>Ceiling Fans: Ideal for large rooms and living areas.</li><li>Pedestal Fans: Perfect for medium-sized rooms and portability.</li><li>Table Fans: Compact and great for small spaces like desks or bedside tables.</li><li>Wall-Mounted Fans: Space-saving and ideal for rooms with limited floor space.</li><li>Exhaust Fans: Designed for ventilation in kitchens, bathrooms, and other enclosed spaces.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q2: What size of ceiling fan is suitable for my room?",
      "answer": "<p>Refer to the table below for recommended ceiling fan sizes based on room size:</p><table><thead><tr><th>Sweep Size (mm/inches)</th><th>Room Size</th></tr></thead><tbody><tr><td>600 mm (24\")</td><td>Up to 36 sq. ft.</td></tr><tr><td>900 mm (36\")</td><td>36–64 sq. ft.</td></tr><tr><td>1200 mm (48\")</td><td>65–100 sq. ft.</td></tr><tr><td>1400 mm (56\")</td><td>&gt;101 sq. ft.</td></tr></tbody></table>",
      "isOpen": false
    },
    {
      "question": "Q3: How do energy-efficient fans help save on electricity bills?",
      "answer": "<p>Energy-efficient fans, such as those with BLDC (Brushless Direct Current) motors (BLDC Ceiling fans), consume significantly less power than conventional induction fans. BLDC ceiling fans offer up to 55% energy savings. Ceiling fans with BLDC motors contain permanent magnets to generate EMF, whereas induction motors use electromagnetic induction. Permanent magnets use less energy compared to electromagnetic induction, making BLDC ceiling fans more efficient.</p><table><thead><tr><th>PARAMETER</th><th>BLDC FAN</th><th>NON-STAR RATED FAN</th></tr></thead><tbody><tr><td>Power Consumption</td><td>35W</td><td>78W</td></tr><tr><td>Power Consumption/Day</td><td>@16 Hours/Day: 560 Wh</td><td>@16 Hours/Day: 1248 Wh</td></tr><tr><td>Units of Electricity Consumed/Month</td><td>17 Units</td><td>37 Units</td></tr><tr><td>Electricity Cost/Month</td><td>@₹6/- Per Unit: ₹101</td><td>@₹6/- Per Unit: ₹225</td></tr><tr><td>Electricity Cost for 2 years</td><td>₹2420</td><td>₹5390</td></tr></tbody></table><p>Actual saving depends upon the usage of fan & cost of electricity</p>",
      "isOpen": false
    },
    {
      "question": "Q4: What is BLDC technology?",
      "answer": "<p>BLDC stands for Brushless Direct Current. In BLDC ceiling fans, the PCB (the brain of the fan) converts AC current to DC current. Unlike induction motors that use electromagnetic induction for generating EMF, BLDC fans use a permanent magnet to generate EMF. This reduces power consumption, heat loss, and wear and tear, making BLDC ceiling fans more energy-efficient and durable.</p>",
      "isOpen": false
    },
    {
      "question": "Q5: How is BLDC technology different from older induction technology?",
      "answer": "<p>BLDC motors contain permanent magnets to generate EMF, whereas induction motors use electromagnetic induction. Permanent magnets generate less heat and use less energy compared to electromagnetic induction, making BLDC fans more efficient, quieter, and longer-lasting.</p>",
      "isOpen": false
    },
    {
      "question": "Q6: Are BLDC ceiling fans noiseless?",
      "answer": "<p>Induction fans usually make a humming sound because of friction. In contrast, BLDC ceiling fans are less noisy due to no friction and are known for their silent running. However, they are not completely noise-free, as all fans produce some air-cutting sound during operation.</p>",
      "isOpen": false
    },
    {
      "question": "Q7: What are the benefits of BLDC technology?",
      "answer": "<p>BLDC technology offers several benefits:</p><ul><li>Energy Efficiency: Consumes up to 55% less electricity than induction motors.</li><li>Durability: BLDC ceiling fans generate less heat, reducing strain on the motor and prolonging its lifespan.</li><li>Quiet Operation: Reduced noise compared to induction fans.</li><li>Eco-Friendly: Lower power consumption contributes to energy savings.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q8: How much electricity does a BLDC motor save compared to an induction motor?",
      "answer": "<p>EcoLink BLDC fans can save up to 55% electricity compared to induction motors, making them a cost-effective and energy-efficient choice.</p>",
      "isOpen": false
    },
    {
      "question": "Q9: Can BLDC fans be controlled with a regulator?",
      "answer": "<p>No, BLDC fans cannot be controlled with traditional regulators. They are designed to work with their dedicated remote controls, mobile apps, or voice control.</p>",
      "isOpen": false
    },
    {
      "question": "Q10: Why does BLDC fan jerk when it starts?",
      "answer": "<p>A slight jerk during startup is normal for BLDC fans since the magnet aligns itself initially. This ensures correct alignment of the magnetic fields during operation. This does not affect the fan's performance or longevity.</p>",
      "isOpen": false
    },
    {
      "question": "Q11: Can I operate different ceiling fans with the same remote?",
      "answer": "<p>No, each remote is paired with a specific ceiling fan to avoid interference. Using the same remote for multiple fans may cause operational issues.</p>",
      "isOpen": false
    },
    {
      "question": "Q12: What is Turbo Mode?",
      "answer": "<p>Turbo Mode is a feature that increases the ceiling fan's speed to its maximum level, providing instant high airflow when needed.</p>",
      "isOpen": false
    },
    {
      "question": "Q13: Do BLDC fans have lower air delivery compared to normal ceiling fans?",
      "answer": "<p>No, BLDC fans are designed to deliver the same or even better airflow compared to traditional ceiling fans while consuming significantly less power.</p>",
      "isOpen": false
    },
    {
      "question": "Q14: Do BLDC fans have a capacitor?",
      "answer": "<p>No, BLDC ceiling fans do not require a capacitor as they use electronic circuitry to control the motor's speed and operation.</p>",
      "isOpen": false
    },
    {
      "question": "Q15: My area has voltage fluctuations. Will a BLDC ceiling fan function properly?",
      "answer": "<p>Yes, BLDC ceiling fans are designed to handle voltage fluctuations efficiently, ensuring consistent performance even in areas with an unstable power supply. The voltage range for BLDC fans is 125V to 290V.</p>",
      "isOpen": false
    },
    {
      "question": "Q16: My area has power cut issues. Will a BLDC fan work with a generator?",
      "answer": "<p>Yes, BLDC fans can operate with a generator, provided the generator supplies stable power within the ceiling fan's operating voltage range.</p>",
      "isOpen": false
    },
    {
      "question": "Q17: Are BLDC fans star-rated?",
      "answer": "<p>Yes, BLDC fans are star-rated for energy efficiency. The star rating is certified by relevant authorities, ensuring their energy-saving capabilities.</p>",
      "isOpen": false
    },
    {
      "question": "Q18: How do I connect my EcoLink AiroGeometry/ AiroJewel smart BLDC fan to Google Home or Alexa?",
      "answer": "<p>Download the Wiz Connected Mobile app on your smart phone. Follow the instructions in the WiZ App:</p><ul><li>Go to Settings &gt; Help Center &gt; FAQ &gt; Alexa or Google Home.</li><li>Follow the pairing process to integrate your fan with your smart home system.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q19: What functions can be controlled through Google Home or Alexa?",
      "answer": "<p>You can control the smart ceiling fan's speed and power ON/OFF using Google Home or Alexa.</p>",
      "isOpen": false
    },
    {
      "question": "Q20: What is Breeze Mode in the WiZ App?",
      "answer": "<p>Breeze Mode simulates a natural breeze:</p><ul><li>Summer Breeze: Speed cycles between 1 and 5.</li><li>Winter Breeze: Speed cycles between 1 and 3 in reverse direction.</li></ul><p>(Note: Speed control is disabled in Breeze Mode.)</p>",
      "isOpen": false
    },
    {
      "question": "Q21: How to pair the ceiling fan with the WiZ app if the product is not visible for pairing in the app?",
      "answer": "<p>If the product is not visible in the WiZ App even after switching the ceiling fan ON during the pairing process, follow the force pairing method:</p><ul><li>Tap and hold the Sleep button for 5 seconds on the remote.</li><li>You will see a \"Device found\" pop-up on the WiZ app screen.</li><li>Follow the standard pairing process after that.</li></ul>",
      "isOpen": false
    },
  ];

  

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <HomeSchema />
      <main className="mt-[-75px]">
        <div className="relative">
          {isMobile ? (
            <HeroSwiper slides={heroSlides} />
          ) : (
            <DesktopHeroSwiper slides={heroSlides} />
          )}
        </div>

        {/* BLDC Fans Section */}
        <section className="container mx-auto px-4 py-16" id="products">
          <h2 className="text-3xl md:text-4xl font-bold section-heading  mb-8 text-center">
            Explore our BLDC Ceiling Fans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bldcFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                badgeImage="/home/icons/badge.svg"
                productImage={fan.image}
                slug={fan.slug}
                category={fan.category}
              />
            ))}
          </div>
        </section>

         {/* BLDC Fans Section */}
         <section className="container mx-auto px-4 py-16" >
          <h2 className="text-3xl md:text-4xl font-bold section-heading  mb-8 text-center">
            Explore our Smart Ceiling Fans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {smartbldcFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                badgeImage="/home/icons/badge.svg"
                productImage={fan.image}
                slug={fan.slug}
                category={fan.category}
              />
            ))}
          </div>
        </section>

        {/* Decorative Fans Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading mb-8 text-center">
            Explore our Decorative Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {decorativeFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={decorativeproductFeatures}
                price={fan.price}
                badgeImage="/home/icons/1-star-badge.svg"
                productImage={fan.image}
                slug={fan.slug}
                category={fan.category}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading mb-8 text-center">
            Explore our Economy Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {economyFansHS.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={VayuHSFeatures}
                price={fan.price}
                badgeImage="/home/icons/1-star-badge.svg"
                productImage={fan.image}
                slug={fan.slug}
                category={fan.category}
              />
            ))}
            {economyFansPro.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={VayuProFeatures}
                price={fan.price}
                badgeImage="/home/icons/1-star-badge.svg"
                productImage={fan.image}
                slug={fan.slug}
                category={fan.category}
              />
            ))}
          </div>
        </section>

        <WhyChooseSection features={productFeaturesList} />

        <CatalogSection />

        <DigiShieldSection />

       

        <section className="my-8 px-8 max-w-[1000px] mx-auto faq-wrapper">
          <h4 className="dark:text-white/90 text-[#3C3A53] text-center text-3xl font-bold mb-8 ">
            Answers to the frequently asked questions.
          </h4>

          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openFaqIndex === index}
              onClick={() => handleFaqClick(index)}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
