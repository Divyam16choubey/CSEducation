import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "../api/contactService";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="gradient-bg py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium
                           bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300
                           border border-blue-500/20 mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have suggestions, found an issue, or want to contribute? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Share materials callout */}
            <div className="card border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📤</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Share Study Materials</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    If you want to share study materials, notes, or PYQs, you can send them through this email.
                    Help your fellow students succeed!
                  </p>
                </div>
              </div>
            </div>

            <div className="card space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                                dark:from-blue-500/20 dark:to-indigo-500/20
                                flex items-center justify-center text-lg">📧</div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:cse2023nitmn@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    cse2023nitmn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                                dark:from-blue-500/20 dark:to-indigo-500/20
                                flex items-center justify-center text-lg">🏫</div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-medium text-gray-900 dark:text-white">Computer Science & Engineering</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                                dark:from-blue-500/20 dark:to-indigo-500/20
                                flex items-center justify-center text-lg">💬</div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    👤 Your Name
                  </label>
                  <input type="text" name="name" className="input" placeholder="Enter your name"
                    value={form.name} onChange={handleChange} required disabled={loading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    📧 Your Email
                  </label>
                  <input type="email" name="email" className="input" placeholder="Enter your email"
                    value={form.email} onChange={handleChange} required disabled={loading} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    💬 Message
                  </label>
                  <textarea rows="5" name="message" className="input" placeholder="Write your message or suggestion..."
                    value={form.message} onChange={handleChange} required disabled={loading} />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
