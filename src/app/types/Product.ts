export interface cart_Product {
  _id: string;
  title: string;
  unitPrice: number;
  qty: number;
  productPrice: number;
  size: string;
  image: any;
  user_id: string;
}

export interface Product {
  user_id: string;
  qty: number;

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

export interface SignedUpUser {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  // Add other fields as needed
}
