import FormTable from "@/components/formTable";
import { Separator } from "@/components/ui/separator";
import StatCard from "@/components/ui/statCard";
import axios from "axios";
import { BarChart3, FileText, ClipboardCheck, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        return toast.error("Login required", {
          onClose: () => navigate("/login"),
        });

      const res = await axios.get(`${API_URL}/form/admin/stats`, {
        headers: {
          Authorization: token,
        },
      });
      setStats(res.data.stats);
    } catch (error) {
      console.error("Error fetching stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) return <ToastContainer />;

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground text-lg">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="p-6 mx-20 space-y-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your form activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Forms"
          value={stats.totalForms}
          icon={FileText}
          color="text-purple-600"
        />
        <StatCard
          title="Responses"
          value={stats.totalResponses}
          icon={BarChart3}
          color="text-green-600"
        />
        <StatCard
          title="Most Active form"
          value={stats.mostActiveForm}
          icon={Star}
          color="text-yellow-500"
        />
        <StatCard
          title="Last Created"
          value={stats.recentResponsesCount}
          icon={ClipboardCheck}
          color="text-indigo-600"
        />
      </div>

      <Separator />
      <FormTable />
    </div>
  );
};

export default Dashboard;
