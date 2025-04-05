"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";



const quantityOptions = [
  "30 ML",
  "60 ML",
  "100 ML",
  "200 ML",
  "10x10",
  "15x10",
  "100 GM",
  "500 GM",
  "1 KG"
];

const remedyForOptions = [
  "Digestive Health",
  "Respiratory Care",
  "Joint & Bone Health",
  "Skin & Hair Care",
  "Liver Care",
  "Cardiac Health",
  "Stress & Sleep",
  "Diabetes Management",
  "Immunity Boosters",
  "Weight Management",
  "Sexual Wellness",
  "Women's Health",
  "Men's Health",
  "Kidney & Urinary Health",
  "Dental Care",
  "Detox & Panchakarma",
  "Rasayana (Rejuvenation)",
  "Daily Tonic",
  "Herbal Tea & Kadha",
  "Beauty & Personal Care",
  "Wellness Kit & Combo",
];

const TypeOptions = [
  "Tablet / Vati",
  "Powder / Churna",
  "Syrup / Arishta / Asava",
  "Oil / Tailam",
  "Cream & Ointment / Balm",
  "Capsule",
  "Decoction / Kashayam",
  "Bhasma / Pishti"
];



export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    sku: "",
    price: "",
    stock: "",
    size: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: send formData to backend API
    console.log("Submitted:", formData);
  };

  return (
    <div className="w-screen-md grid grid-cols-3 h-screen ml-0 bg-lime-300 items-center">


      {/* <div className="sidebar"> </div> */}

      <Card className="w-3/4 h-max col-span-2  bg-[#222831] text-white p-4">


        <CardContent className="">


          <form onSubmit={handleSubmit} className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 gap-6">
            <div>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input name="image" value={formData.image} onChange={handleChange} required />
            </div>
            <div>
              <Label>Product Is An Remedy For, And Its Category Is :</Label>
              <select name="size" value={formData.size} onChange={handleChange} required className="w-full p-2 rounded border">
                <option value="">Select Remedy</option>
                {remedyForOptions.map((size) => (
                  <option key={size} value={size}>{size.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Product Type Is :</Label>
              <select name="size" value={formData.size} onChange={handleChange} required className="w-full p-2 rounded border">
                <option value="">Select Type</option>
                {TypeOptions.map((size) => (
                  <option key={size} value={size}>{size.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>SKU</Label>
              <Input name="sku" value={formData.sku} onChange={handleChange} />
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </div>
            <div>
              <Label>Size</Label>
              <select name="size" value={formData.size} onChange={handleChange} required className="w-full p-2 rounded border">
                <option value="">Select Size</option>
                {quantityOptions.map((size) => (
                  <option key={size} value={size}>{size.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
               
    </div>
  );
}
