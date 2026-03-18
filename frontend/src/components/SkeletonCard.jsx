import { motion } from "framer-motion";

export default function SkeletonCard({ count = 4 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-md"
                >
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
                        <div className="h-2 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 rounded-full w-full mt-4" />
                    </div>
                </motion.div>
            ))}
        </>
    );
}
