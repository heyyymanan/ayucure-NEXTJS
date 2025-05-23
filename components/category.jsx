import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const Categories = [
  {
    src: "/jointpain.png",
    alt: "Joint Pain",
    title: "Joint Pain",
    link: "/shop-all?remedy_for=Joint+And+Muscle+Pain&price=low",
  },
  {
    src: "/acne.png",
    alt: "Acne",
    title: "Skin Care",
    link: "/shop-all?remedy_for=Skin+Care&price=low",
  },
  {
    src: "/hairfall.png",
    alt: "Hair Health",
    title: "Hair Health",
    link: "/shop-all?remedy_for=Hair+Care&price=low",
  },
  {
    src: "/stomachache.png",
    alt: "Digestion",
    title: "Digestion",
    link: "/shop-all?remedy_for=Digestive+Health&price=low",
  },
];

export default function HealthCategories() {
  const categoryRefs = useRef([]);

  useEffect(() => {
    const elements = categoryRefs.current; // snapshot the refs

    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1, // optional: makes animation feel nicer
      }
    );

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div className="flex justify-center p-4 gap-x-5 2xl:gap-15 lg:gap-10 lg:mt-5 lg:mb-7">
      {Categories.map((category, index) => (
        <Link href={category.link} key={index}>
          <div
            ref={(el) => (categoryRefs.current[index] = el)}
            className="flex flex-col items-center text-center hover:cursor-pointer"
          >
            <div>
              <Image
                src={category.src}
                alt={category.alt}
                width={175}
                height={175}
                className="size-160 hover:shadow-2xl rounded-full"
              />
            </div>
            <p className="lg:mt-2 lg:text-2xl text-[12px] mt-2 font-semibold text-white">
              {category.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
