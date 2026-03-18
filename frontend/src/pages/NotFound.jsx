import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-lg"
            >
                <div className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                    404
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="btn-primary px-8 py-3 rounded-2xl"
                >
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
