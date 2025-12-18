import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './OrderConfirmationModal.css';

const greekQuotes = [
    {
        quote: "Excellence is not a gift, but a skill that takes practice.",
        author: "Plato"
    },
    {
        quote: "Quality is not an act, it is a habit.",
        author: "Aristotle"
    },
    {
        quote: "The whole is greater than the sum of its parts.",
        author: "Aristotle"
    },
    {
        quote: "Luxury must be comfortable, otherwise it is not luxury.",
        author: "Coco Chanel"
    },
    {
        quote: "Elegance is the only beauty that never fades.",
        author: "Audrey Hepburn"
    }
];

export default function OrderConfirmationModal({ isOpen, onClose, orderDetails }) {
    const randomQuote = greekQuotes[Math.floor(Math.random() * greekQuotes.length)];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="order-confirmation-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="order-confirmation-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {/* Greek Pattern Border */}
                        <div className="greek-pattern-border" />

                        {/* Success Icon */}
                        <motion.div
                            className="success-icon-wrapper"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <svg
                                className="success-icon"
                                viewBox="0 0 52 52"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <motion.circle
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                />
                                <motion.path
                                    fill="none"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                />
                            </svg>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="modal-title">Order Confirmed</h2>
                            <p className="modal-subtitle">Your order has been placed successfully</p>

                            {/* Order Number */}
                            {orderDetails?.orderNumber && (
                                <div className="order-number-section">
                                    <span className="order-number-label">Order Number</span>
                                    <span className="order-number">{orderDetails.orderNumber}</span>
                                </div>
                            )}

                            {/* Greek Quote */}
                            <div className="quote-section">
                                <div className="quote-mark">"</div>
                                <p className="quote-text">{randomQuote.quote}</p>
                                <p className="quote-author">— {randomQuote.author}</p>
                            </div>

                            {/* Divider with Greek Key Pattern */}
                            <div className="greek-divider">
                                <svg viewBox="0 0 100 10" className="greek-key-pattern">
                                    <path d="M0,5 L10,5 L10,0 L15,0 L15,10 L20,10 L20,5 L30,5 M30,5 L40,5 L40,0 L45,0 L45,10 L50,10 L50,5 L60,5 M60,5 L70,5 L70,0 L75,0 L75,10 L80,10 L80,5 L90,5 M90,5 L100,5" />
                                </svg>
                            </div>

                            {/* Confirmation Message */}
                            <p className="confirmation-message">
                                A confirmation email has been sent to <strong>{orderDetails?.email}</strong>
                            </p>

                            {/* Action Button */}
                            <button className="continue-button" onClick={onClose}>
                                Continue Shopping
                            </button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
