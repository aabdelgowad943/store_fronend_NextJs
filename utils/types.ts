export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  profileImage: string | null;
  bio: string | null;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  isFeatured: boolean;
  fileUrl: string;
};

export interface RegisterPayload {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface Book {
  id: string;
  title: string;
  fileUrl: string;
  price: number;
}

export interface Cart {
  id: string;
  book: Book; // Include the book details
  quantity: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string; // Optional token in case of successful login
  status: number;
  role?: string;
  sellerId: string;
  id: string;
  email: string;
}
