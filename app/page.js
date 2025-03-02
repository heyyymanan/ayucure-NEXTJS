"use client"
import Hero from "@/components/Hero"
import Category from "@/components/category"
import ProductCard from "@/components/ui/product_card";


const products_trending = [
  {
    id: 1,
    p_img: "/product_jpg/byna_oil2.jpg",
    p_name: "Byna Oil",
    p_cures: "Joint Pain | Inflammation",
    p_price: "1800.00",
    p_rating: "5",
    discount: "Up to 10% off",
    reviews: "320",
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    qty: "10ml | 100ml"
  },
  {
    id: 2,
    p_img: "/product_jpg/byna_tablet2.jpg",
    p_name: "Byna Tablet",
    p_cures: "Joint Pain | Inflammation",
    p_price: "700.00",
    p_rating: "5",
    discount: "Up to 12% off",
    reviews: "455",
    delivery: "Same Day Delivery",
    priceTag: "Limited Offer",
    qty: "10ml | 100ml"
  },
  {
    id: 3,
    p_img: "/product_jpg/byna_syrup2.jpg",
    p_name: "Byna Syrup",
    p_cures: "Joint Pain | Inflammation",
    p_price: "599.00",
    p_rating: "4.5",
    discount: "Flat 15% off",
    reviews: "389",
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    qty: "10ml | 100ml"
  },
  {
    id: 4,
    p_img: "/product_jpg/spruehit_syrup2.jpg",
    p_name: "Spruehit Syrup",
    p_cures: "Diarrhea",
    p_price: "170.00",
    p_rating: "4.5",
    discount: "Up to 5% off",
    reviews: "210",
    delivery: "Express Shipping",
    priceTag: "Special Discount",
    qty: "10ml | 100ml"
  },
  {
    id: 5,
    p_img: "/product_jpg/byna_plus_capsule2.jpg",
    p_name: "Byna Capsule",
    p_cures: "Joint Pain | Inflammation",
    p_price: "180.00",
    p_rating: "4.5",
    discount: "Buy 1 Get 1 Free",
    reviews: "530",
    delivery: "Fast Delivery",
    priceTag: "Exclusive Offer",
    qty: "10ml | 100ml"
  }
];

const products_healthy = [
  {
    id: 6,
    p_img: "/product_jpg/jeevanjyoti.jpg",
    p_name: "Jeevan Jyoti Rasayana",
    p_cures: "Boosts Immunity",
    p_price: "1800.00",
    p_rating: "4.5",
    discount: "Up to 15% off",
    reviews: "380",
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    qty: "10ml | 100ml"
  },
  {
    id: 7,
    p_img: "/product_jpg/be_well_syrup.jpg",
    p_name: "Be Well Syrup",
    p_cures: "Energy Booster",
    p_price: "700.00",
    p_rating: "4.5",
    discount: "Flat 10% off",
    reviews: "290",
    delivery: "Same Day Delivery",
    priceTag: "Limited Offer",
    qty: "10ml | 100ml"
  },
  {
    id: 8,
    p_img: "/product_jpg/jeevan_jyoti_gold.jpg",
    p_name: "Jeevan Jyoti Rasayana Gold",
    p_cures: "Boosts Immunity",
    p_price: "599.00",
    p_rating: "4.5",
    discount: "Up to 12% off",
    reviews: "410",
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    qty: "10ml | 100ml"
  },
  {
    id: 9,
    p_img: "/product_jpg/madhumehnashak_churna.jpg",
    p_name: "Madhumehnashak Churna",
    p_cures: "Diabetes",
    p_price: "170.00",
    p_rating: "4.5",
    discount: "Up to 8% off",
    reviews: "220",
    delivery: "Express Shipping",
    priceTag: "Special Discount",
    qty: "10ml | 100ml"
  },
  {
    id: 10,
    p_img: "/product_jpg/calse_tablet.jpg",
    p_name: "Calse",
    p_cures: "Strong Bones | Calcium Booster",
    p_price: "180.00",
    p_rating: "4.5",
    discount: "Buy 1 Get 1 Free",
    reviews: "490",
    delivery: "Fast Delivery",
    priceTag: "Exclusive Offer",
    qty: "10ml | 100ml"
  }
];

// bg-gradient-to-r from-red-400 to-pink-500

export default function Home() {
  return(
    
      
    <div className=" bg-gradient-to-t from-slate-100 to-[#222831] ">


      <Hero />

      <hr className=" border-t border-gray-500" />

    {/* <Checkout_side_pannel/> */}

      <Category />
      <hr className=" border-t border-gray-400" />


        <h1 className="text-center text-5xl mt-10 font-serif">Trending Products</h1>
        <div className="trending-products flex p-10 justify-evenly">
          {products_trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <h1 className="text-center text-5xl font-serif">Want A Healthy Life?</h1>
        <div className="trending-products-trending flex p-10 justify-evenly">
          {products_healthy.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>




    </div>
      


  );
  }
