export interface cart_Product {
  id: string;
  title: string;
  description: string;
  details: string;
  color: string;
  size: string[];
  image: any;
  price: number;
  category: string;
  user_id: string;
  qty: number;
}

export interface Product {
  qty: number;
  urlForImage: any;
  id: string;
  title: string;
  description: string;
  details: string;
  color: string;
  itemQty: number;
  size: string[];
  image: any;
  price: number;
  category: { category: string };
}
