"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ui/product_card";
import SkeletonCard from "./ui/skeleton-card"; // 👈 your skeleton component
// import { notFound } from "next/navigation"; // used if you ever want to hard 404

export default function ShopAll() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false);

  const limit = 10;

  const initialFilters = {
    remedy_for: searchParams.get("remedy_for") || "",
    price: searchParams.get("price") || "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const fetchProducts = async ({ limit = 10, page = 1, filters }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/general/shop-all?page=${page}&limit=${limit}&remedy_for=${filters.remedy_for}&price=${filters.price}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setNoProducts(false);

      try {
        const { products, totalCount } = await fetchProducts({
          limit,
          page,
          filters,
        });
        setProducts(products);
        setTotalPages(Math.ceil(totalCount / limit));

        // ⚠️ Soft 404 condition
        if (products.length === 0 || !products) {
          setNoProducts(true);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setNoProducts(true);
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
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    setPage(1); // Reset to page 1 when filters change

    // Update URL query params
    const query = new URLSearchParams();
    if (newFilters.remedy_for) query.set("remedy_for", newFilters.remedy_for);
    if (newFilters.price) query.set("price", newFilters.price);
    router.push(`/shop-all?${query.toString()}`);
  };

  const remedyOptions = [
    "PILES / HEMORRHOIDS", "Digestive Health", "Diarrhea (Dast)", "Mouth Ulcers", "Cold Relief",
    "Fever Relief", "Cough Relief", "Respiratory Care", "Joint And Muscle Pain", "Bone Health",
    "Skin Care", "Hair Care", "Liver Care", "Cardiac Health", "Stress And Sleep", "Diabetes Management",
    "Immunity Boosters", "Weight Management", "Sexual Wellness", "Women's Health Tonic", "Baby Health",
    "Menstrual Health", "Men's Health Tonic", "Kidney And Urinary Health", "Dental Care",
    "Detox And Panchakarma", "Rasayana (Rejuvenation)", "General Tonic", "Herbal Tea & Kadha",
    "Beauty And Personal Care", "Wellness Kit & Combo",
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

        {/* 🌀 Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : noProducts ? (
          <>
            {/* 🚫 Soft 404: No Products */}
            <div className="text-center py-10 text-gray-600">
              <p className="text-lg mb-2 font-medium">No products found 😕</p>
              <p>Try changing your filters or check back later.</p>
            </div>

            {/* Add noindex meta tag (optional) */}
            <meta name="robots" content="noindex" />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}
