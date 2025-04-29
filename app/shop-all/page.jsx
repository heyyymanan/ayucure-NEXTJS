"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/product_card"; // adjust path as needed

export default function ShopAll() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 8; // items per page
  const [filters, setFilters] = useState({ remedy_for: "", price: "" }); // Example filters

  const fetchProducts = async ({ limit = 8, page = 1, filters }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/general/shop-all?page=${page}&limit=${limit}&remedy_for=${filters.remedy_for}&price=${filters.price}`
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { products, totalCount } = await fetchProducts({
          limit,
          page,
          filters,
        });
        setProducts(products);
        setTotalPages(Math.ceil(totalCount / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, filters]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const remedyOptions = [
    "PILES / HEMORRHOIDS",
    "Digestive Health",
    "Diarrhea (Kabz)",
    "Mouth Ulcers",
    "Cold Relief",
    "Fever Relief",
    "Cough Relief",
    "Respiratory Care",
    "Joint & Bone Health",
    "Joint & Muscle Pain",
    "Skin Care",
    "Hair Care",
    "Liver Care",
    "Cardiac Health",
    "Stress & Sleep",
    "Diabetes Management",
    "Immunity Boosters",
    "Weight Management",
    "Sexual Wellness",
    "Women's Health Tonic",
    "Baby Health",
    "Menstrual Health",
    "Men's Health Tonic",
    "Kidney & Urinary Health",
    "Dental Care",
    "Detox & Panchakarma",
    "Rasayana (Rejuvenation)",
    "Daily Tonic",
    "Herbal Tea & Kadha",
    "Beauty & Personal Care",
    "Wellness Kit & Combo",
  ];

  return (
    <div className="p-4 md:p-8 flex flex-wrap">
      {/* Left Sidebar (Filter Panel) */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-50 p-4 rounded-lg shadow-md mb-6 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* remedy_for Filter */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Remedy</label>
          <select
            name="remedy_for"
            value={filters.remedy_for}
            onChange={handleFilterChange}
            className="w-full p-2 mt-2 border rounded"
          >
            <option value="">Select Remedy (All)</option>
            {remedyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <select
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            className="w-full p-2 mt-2 border rounded"
          >
            <option value="">All Prices</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-2xl font-bold mb-6 text-center">Shop All Products</h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
