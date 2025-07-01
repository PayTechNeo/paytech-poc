import React from 'react';

interface Product {
  name: string;
  icon: React.ReactNode;
}

interface ProductsCardProps {
  products: Product[];
}

const ProductsCard: React.FC<ProductsCardProps> = ({ products }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-4">
    <h3 className="font-semibold mb-2">Products</h3>
    <div className="flex flex-col gap-2">
      {products.map((prod, idx) => (
        <span key={idx} className="flex items-center gap-2 text-base">
          {prod.icon}
          {prod.name}
        </span>
      ))}
    </div>
  </div>
);

export default ProductsCard; 