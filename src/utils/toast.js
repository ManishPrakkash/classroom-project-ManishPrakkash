import toast from 'react-hot-toast';

// Custom toast styles matching Lunoré color scheme
const toastStyles = {
    success: {
        style: {
            background: 'rgba(26, 26, 26, 0.95)', // noir-900 with transparency
            color: '#fafaf8', // ivory
            border: '1px solid #c9a96e', // gold-500
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(201, 169, 110, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        iconTheme: {
            primary: '#c9a96e', // gold-500
            secondary: '#fafaf8', // ivory
        },
        duration: 3000,
    },
    error: {
        style: {
            background: 'rgba(26, 26, 26, 0.95)', // noir-900 with transparency
            color: '#fafaf8', // ivory
            border: '1px solid #ef4444', // red
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        iconTheme: {
            primary: '#ef4444',
            secondary: '#fafaf8',
        },
        duration: 3000,
    },
    loading: {
        style: {
            background: 'rgba(26, 26, 26, 0.95)', // noir-900 with transparency
            color: '#f5f5f5', // pearl-300
            border: '1px solid #6a6a6a', // noir-700
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        iconTheme: {
            primary: '#c9a96e', // gold-500
            secondary: '#1a1a1a', // noir-900
        },
    },
};

// Custom toast functions
export const showSuccessToast = (message) => {
    toast.success(message, toastStyles.success);
};

export const showErrorToast = (message) => {
    toast.error(message, toastStyles.error);
};

export const showLoadingToast = (message) => {
    return toast.loading(message, toastStyles.loading);
};

export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

// Specific toast messages for common actions
export const toastMessages = {
    loginRequired: () => showErrorToast('Please login to add items to cart'),
    addedToCart: (productName) => showSuccessToast(`${productName} added to cart`),
    removedFromCart: (productName) => showSuccessToast(`${productName} removed from cart`),
    cartUpdated: () => showSuccessToast('Cart updated successfully'),
    cartCleared: () => showSuccessToast('Cart cleared'),
    addedToWishlist: (productName) => showSuccessToast(`${productName} added to wishlist`),
    removedFromWishlist: (productName) => showSuccessToast(`${productName} removed from wishlist`),
    loginSuccess: () => showSuccessToast('Welcome back!'),
    logoutSuccess: () => showSuccessToast('Logged out successfully'),
    registrationSuccess: () => showSuccessToast('Account created successfully!'),
    error: (message) => showErrorToast(message || 'Something went wrong'),
};

export default toast;
