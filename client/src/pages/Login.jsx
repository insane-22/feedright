import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { ToastContainer, cssTransition, toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      return toast.error("Invalid Email format ! ", {
        position: "bottom-right",
      });
    }
    if (!validatePassword(formData.password)) {
      return toast.error("Password must be at least 6 characters!", {
        position: "bottom-right",
      });
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      const userData = res.data.admin;
      loginUser(userData);
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful", {
        onClose: () => navigate("/dashboard"),
        position: "bottom-right",
        transition: bounce,
      });
    } catch (error) {
      return toast.error(error.response?.data?.error || "Login failed", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              className="p-3 border border-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              className="p-3 border border-white"
            />
            <Button
              type="submit"
              className="w-full py-3 font-semibold tracking-wide"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
          <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
