import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginAdmin } from "../api/adminService";
import useDocTitle from "../hooks/useDocTitle";
import toast from "react-hot-toast";
import { IconShield } from "../components/icons";
import Logo from "../components/Logo";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useDocTitle("Admin Login");

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-surface-raised)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <div className="card-static">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo variant="icon" size={48} />
            </div>
            <h1 className="text-h2 text-heading dark:text-heading-dark">Admin Login</h1>
            <p className="text-body-sm text-subtle dark:text-subtle-dark mt-1">
              Sign in to manage resources
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-username" className="input-label">Username</label>
              <input id="admin-username" type="text" className="input" placeholder="Enter username"
                value={username} onChange={(e) => setUsername(e.target.value)}
                required disabled={loading} autoComplete="username" />
            </div>

            <div>
              <label htmlFor="admin-password" className="input-label">Password</label>
              <input id="admin-password" type="password" className="input" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required disabled={loading} autoComplete="current-password" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Logging in…" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
