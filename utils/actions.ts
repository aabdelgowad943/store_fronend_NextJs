"use server";
import { redirect } from "next/navigation";
import {
  LoginPayload,
  LoginResponse,
  Product,
  RegisterPayload,
  RegisterResponse,
  User,
} from "./types";

const apiUrl = "http://localhost:4000";

// src/actions.tsx
export async function fetchUserById(userId: string) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to retrieve user details");
  }
}

export const fetchFeaturedProducts = async (): Promise<[]> => {
  try {
    const response = await fetch(`${apiUrl}/book`); // Replace with your API endpoint
    const result = await response.json();

    if (result.success) {
      return result.data.filter((product: Product) => product.isFeatured);
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching featured products");
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/book`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
// ------------------------------------------------
export const fetchBooksBySellerId = async (sellerId: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/book/sellerId?sellerId=${sellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books for this seller.");
    }

    const data = await response.json();
    return data.data; // Assuming the books are in the 'data' field
  } catch (error) {
    console.error("Error fetching books by seller:", error);
    throw error; // Re-throw to be handled in the calling component
  }
};

// --------------------------------------------------------------------------------------------------
export const createUserAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const requestBody = {
      username: rawData.username,
      email: rawData.email,
      password: rawData.password,
      role: rawData.role,
      profileImage: rawData.profileImage,
    };

    // Replace with the actual endpoint for user creation
    const response = await fetch(`${apiUrl}/user`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    const responseData = await response.json();
    return { message: responseData.message || "User created successfully" };
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return { message: error.message || "An error occurred" };
  }
};
// --------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------
export const fetchSingleProduct = async (productId: string) => {
  try {
    const response = await fetch(`${apiUrl}/book/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product = await response.json();
    // console.log("the response is", product.data);

    if (!product) {
      redirect("/products");
    }

    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    redirect("/products"); // Redirect to the products page on error
    return null;
  }
};
// ---------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
export const createProductAction = async (
  prevState: any,
  formData: FormData,
  sellerId: string
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);

    if (!sellerId) {
      throw new Error("Seller ID is missing. Please log in again.");
    }

    const requestBody = {
      title: rawData.title,
      description: rawData.description,
      price: Number(rawData.price),
      author: rawData.author,
      isFeatured: Boolean(rawData.isFeatured),
      sellerId,
      fileUrl: rawData.fileUrl,
    };

    // Make the API request
    const response = await fetch(`${apiUrl}/book`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product");
    }

    const responseData = await response.json();
    return { message: responseData.message || "Product created successfully" };
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    return { message: error.message || "An error occurred" };
  }
};
// -----------------------------------------------------------------------------------------------------

// -------------------------------------------------delete product--------------------------------------
export const deleteProductAction = async (
  productId: string
): Promise<{ message: string }> => {
  try {
    // Make the DELETE request
    const response = await fetch(`${apiUrl}/book/${productId}`, {
      method: "DELETE",
    });

    // Handle the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete product");
    }

    const responseData = await response.json();
    // console.log("Product deleted successfully:", responseData);
    return { message: responseData.message || "Product deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    return { message: error.message || "An error occurred" };
  }
};
//------------------------------------------------------------------------------------------------------

//-------------------------------------------------get product by id--------------------------------------------------------
export const getProductById = async (productId: any) => {
  try {
    const response = await fetch(`${apiUrl}/book/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();
    // console.log(data.data);

    return data.data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
// ------------------------------------------------get product by id--------------------------------------------------------

// ------------------------------------------------Get All Sellers---------------------------------------------
export const fetchSellers = async (): Promise<User[]> => {
  // console.log("Fetching sellers...");
  try {
    const response = await fetch(`${apiUrl}/user`);
    const result = await response.json();
    // console.log("API response:", result);

    if (result.success) {
      return result.data.filter((user: User) => user.role === "SELLER");
    } else {
      console.error("Fetch failed:", result);
      throw new Error("Failed to fetch sellers");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// -----------------------------------------------Get All Sellers----------------------------------------------

// ----------------------------------------------Get Seller by user name-----------------------------------------------
export const fetchSellerByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const response = await fetch(`${apiUrl}/user`); // Fetch all users from the backend
    const result = await response.json();

    if (!result.success) {
      throw new Error("Failed to fetch sellers");
    }

    // Filter to find the seller by username
    const seller = result.data.find(
      (user: User) => user.role === "SELLER" && user.username === username
    );

    if (!seller) {
      throw new Error("Seller not found");
    }
    return seller;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// ----------------------------------------------Get Seller by user name---------------------------------------------

// ----------------------------------------------Register---------------------------------------------
export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to register user");
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// ----------------------------------------------Register---------------------------------------------

// ----------------------------------------------Login---------------------------------------------
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to log in");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// --------------------------------------------- Login ------------------------------------------------

// --------------------------------------------- fetch all books ------------------------------------------------
export const fetchBooks = async (search: string) => {
  if (!search) {
    // console.log("No search term provided, returning empty list.");
    return [];
  }

  try {
    const fetchUrl = `${apiUrl}/book/search?q=${search}`;
    // console.log("Fetch URL:", fetchUrl); // Debug URL

    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch books: ${errorMessage}`);
    }

    const data = await response.json();
    // console.log("Fetched books:", data); // Log API response
    return Array.isArray(data.data) ? data.data : []; // Ensure it's an array
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
// --------------------------------------------- fetch all books  ------------------------------------------------

// --------------------------------------------- fetch book in the cart------------------------------------------------
export const fetchCartData = async (userId: string) => {
  const response = await fetch(`${apiUrl}/cart/userId?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const data = await response.json();
  if (data.success) {
    // console.log(data.data);

    return data.data; // Return the array of cart items
  } else {
    throw new Error(data.message || "Failed to fetch cart data");
  }
};

// --------------------------------------------- fetch book in the cart------------------------------------------------

// ---------------------------------------------remove item from cart------------------------------------------------
export const removeItemFromCart = async (id: string) => {
  try {
    // Send DELETE request to remove the item from the cart
    const response = await fetch(`${apiUrl}/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }

    const data = await response.json();
    return data.success; // Assuming the success status is in the 'success' field
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error; // Re-throw to be handled in the calling component
  }
};
// ---------------------------------------------remove item from cart------------------------------------------------

// ------------------------------------------- add to cart--------------------------------------------------
export const addToCart = async (
  userId: string,
  bookId: string,
  quantity: number
) => {
  try {
    const response = await fetch(`${apiUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, bookId: bookId, quantity }),
    });

    const data = await response.json();
    // console.log("Add to cart API response:", data);

    if (response.ok) {
      return data; // return the response data on success
    } else {
      return { success: false, message: data.message || "Failed to add item" }; // return error response
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    return { success: false, message: "Network error" }; // return a network error message
  }
};

// ------------------------------------------ add to cart---------------------------------------------------

// ------------------------------------------- fetch statistics --------------------------------------------------
export async function fetchStatistics() {
  const endpoint = `${apiUrl}/statistics`; // Backend endpoint

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch statistics: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Unknown error occurred");
    }

    return data.data; // Return the statistics data
  } catch (error: any) {
    console.error("Error fetching statistics:", error.message);
    throw error;
  }
}
// ------------------------------------------- fetch statistics --------------------------------------------------

// ---------------------------------------------------------------------------
export const createVoucherAction = async (
  prevState: any,
  formData: FormData,
  sellerId: string
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);

    if (!sellerId) {
      throw new Error("Seller ID is missing. Please log in again.");
    }

    const { code, discount, expiration, bookId } = rawData as Record<
      string,
      string
    >;

    // Validation
    if (!code || !bookId || !expiration || !discount) {
      throw new Error("All fields are required. Please check your input.");
    }

    const parsedDiscount = parseFloat(discount);
    const parsedExpiration = new Date(expiration);

    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 1) {
      throw new Error("Discount must be a number between 0 and 1.");
    }

    if (isNaN(parsedExpiration.getTime())) {
      throw new Error("Expiration date is invalid.");
    }

    const requestBody = {
      code,
      discount: parsedDiscount,
      expiration: parsedExpiration,
      bookId,
      sellerId,
    };

    // API request
    const response = await fetch(`${apiUrl}/voucher`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create voucher.");
    }

    const responseData = await response.json();
    return { message: responseData.message || "Voucher created successfully." };
  } catch (error: any) {
    console.error("Error creating voucher:", error.message);
    return {
      message: error.message || "An error occurred during voucher creation.",
    };
  }
};
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
export const fetchVouchersBySellerId = async (sellerId: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/voucher/sellerId?sellerId=${sellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vouchers for this seller.");
    }

    const data = await response.json();
    // console.log("data");

    return data.data; // Assuming the books are in the 'data' field
  } catch (error) {
    console.error("Error fetching books by seller:", error);
    throw error; // Re-throw to be handled in the calling component
  }
};
// ------------------------------------------------------------------------------

export const fetchStatisticsBySellerId = async (sellerId: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/statistics/sellerId?sellerId=${sellerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch statistics for this seller.");
    }

    const data = await response.json();
    return data.data; // Assuming the books are in the 'data' field
  } catch (error) {
    console.error("Error fetching statistics by seller:", error);
    throw error; // Re-throw to be handled in the calling component
  }
};

export const checkVoucherCode = async (code: any) => {
  const response = await fetch(`${apiUrl}/voucher`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return response.json(); // Expected: { isValid: boolean }
};
// ----------------------------------------------------------------------
// export const getCurrentUser = async () => {
//   try {
//     const email = localStorage.getItem("email"); // Ensure this key matches how it's stored
//     return email || null;
//   } catch (error) {
//     console.error("Error retrieving user email from localStorage:", error);
//     return null;
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     if (typeof window !== "undefined") {
//       const email = localStorage.getItem("email");
//       return email || null;
//     } else {
//       console.warn("localStorage is not available on the server.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error retrieving user email from localStorage:", error);
//     return null;
//   }
// };

// actions.ts

import axios from "axios";

// Function to update cart quantity
export const updateCartQuantity = async (id: string, quantity: number) => {
  try {
    const response = await axios.patch(`${apiUrl}/cart/${id}`, {
      quantity,
    });

    if (response.status === 200) {
      return {
        success: true,
        data: response.data, // The updated cart item data
      };
    } else {
      return {
        success: false,
        message: "Failed to update quantity",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the cart quantity",
    };
  }
};
