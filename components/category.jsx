import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Categories = [
  { src: "/jointpain.png", alt: "Joint Pain", title: "Joint Pain" },
  { src: "/acne.png", alt: "Acne", title: "Acne" },
  { src: "/hairfall.png", alt: "Hair Health", title: "Hair Health" },
  { src: "/stomachache.png", alt: "Digestion", title: "Digestion" }
];

export default function HealthCategories() {
  const categoryRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      categoryRefs.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      ""
    );

    return () => {
      gsap.killTweensOf(categoryRefs.current);
    };
  }, []);

  return (
    <div className="flex justify-center p-4 gap-x-5 lg:gap-10 lg:mt-9 lg:mb-7">
      {Categories.map((category, index) => (
        <div
          key={index}
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
          <p className="lg:mt-2 lg:text-2xl text-base mt-2 font-semibold text-white">{category.title}</p>
        </div>
      ))}
    </div>
  );
}
