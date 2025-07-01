import React from 'react';

interface Product {
  name: string;
  icon: React.ReactNode;
}

interface ProductsCardProps {
  products: Product[];
}

const ProductsCard: React.FC<ProductsCardProps> = ({ products }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Products</h3>
    <div className="flex flex-col gap-2 sm:gap-3">
      {products.map((prod, idx) => (
        <span key={idx} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          {prod.icon}
          <span className="truncate">{prod.name}</span>
        </span>
      ))}
    </div>
  </div>
);

export default ProductsCard; 