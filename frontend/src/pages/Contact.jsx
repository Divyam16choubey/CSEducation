import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "../api/contactService";
import toast from "react-hot-toast";
import { IconUpload, IconMail, IconBuilding, IconClock } from "../components/icons";

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
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* Header */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="max-w-narrow mx-auto text-center"
        >
          <span className="badge badge-primary mb-6 inline-flex">
            Get In Touch
          </span>
          <h1 className="text-h1 md:text-display text-heading dark:text-heading-dark mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-body text-subtle dark:text-subtle-dark max-w-2xl mx-auto">
            Have suggestions, found an issue, or want to contribute? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Share materials callout */}
            <div className="card-bordered">
              <div className="flex items-start gap-3">
                <div className="icon-container-sm flex-shrink-0">
                  <IconUpload size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-heading dark:text-heading-dark mb-1">Share Study Materials</h3>
                  <p className="text-body-sm text-subtle dark:text-subtle-dark leading-relaxed">
                    If you want to share study materials, notes, or PYQs, you can send them through this email.
                    Help your fellow students succeed!
                  </p>
                </div>
              </div>
            </div>

            <div className="card-static space-y-5">
              <div className="flex items-center gap-3">
                <div className="icon-container-sm">
                  <IconMail size={18} />
                </div>
                <div>
                  <p className="text-body-sm text-subtle dark:text-subtle-dark">Email</p>
                  <a href="mailto:cse2023nitmn@gmail.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium text-body-sm">
                    cse2023nitmn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="icon-container-sm">
                  <IconBuilding size={18} />
                </div>
                <div>
                  <p className="text-body-sm text-subtle dark:text-subtle-dark">Department</p>
                  <p className="font-medium text-heading dark:text-heading-dark text-body-sm">Computer Science & Engineering</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="icon-container-sm">
                  <IconClock size={18} />
                </div>
                <div>
                  <p className="text-body-sm text-subtle dark:text-subtle-dark">Response Time</p>
                  <p className="font-medium text-heading dark:text-heading-dark text-body-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="card-static">
              <h2 className="text-h3 text-heading dark:text-heading-dark mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="input-label">Your Name</label>
                  <input type="text" name="name" className="input" placeholder="Enter your name"
                    value={form.name} onChange={handleChange} required disabled={loading} />
                </div>

                <div>
                  <label className="input-label">Your Email</label>
                  <input type="email" name="email" className="input" placeholder="Enter your email"
                    value={form.email} onChange={handleChange} required disabled={loading} />
                </div>

                <div>
                  <label className="input-label">Message</label>
                  <textarea rows="5" name="message" className="input" placeholder="Write your message or suggestion..."
                    value={form.message} onChange={handleChange} required disabled={loading} />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
