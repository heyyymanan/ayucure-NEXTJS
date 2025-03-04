"use client"
import Image from 'next/image';
import { useState } from 'react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState("Medium");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl md:p-12 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        <div>
          <Image 
            src="/product-image.jpg" 
            alt="Product Image" 
            width={600} 
            height={600} 
            className="rounded-xl w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Product Name</h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base lg:text-lg">Short description of the product with key features.</p>
          <p className="text-xl lg:text-2xl font-semibold text-lime-500">$99.99</p>
          
          <div className="mt-4">
            <p className="font-semibold mb-2">Choose Specifications:</p>
            <div className="flex gap-2 flex-wrap">
              {['Small', 'Medium', 'Large'].map((spec) => (
                <button 
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`px-4 py-2 rounded-lg transition-all ${selectedSpec === spec ? 'bg-lime-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <button onClick={decreaseQuantity} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">-</button>
            <span className="text-lg lg:text-xl font-semibold">{quantity}</span>
            <button onClick={increaseQuantity} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">+</button>
          </div>
          
          <div className="mt-4 flex gap-4 flex-wrap">
            <button className="bg-lime-500 text-white px-6 py-2 lg:px-8 lg:py-3 rounded-lg hover:bg-lime-600 w-full md:w-auto">
              Add to Cart
            </button>
            <button className="bg-lime-600 text-white px-6 py-2 lg:px-8 lg:py-3 rounded-lg hover:bg-lime-700 w-full md:w-auto">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-12">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Customer Reviews</h2>
        <div className="bg-gray-100 p-4 lg:p-6 rounded-lg">
          <p className="font-semibold">John Doe</p>
          <p className="text-gray-600 text-sm md:text-base">Great product! Highly recommend.</p>
        </div>
        <div className="bg-gray-100 p-4 lg:p-6 rounded-lg mt-4">
          <p className="font-semibold">Jane Smith</p>
          <p className="text-gray-600 text-sm md:text-base">Good quality and fast shipping.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
