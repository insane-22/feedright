import { useEffect, useState } from "react";
import FormActions from "./formActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const FormTable = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_URL}/form/all`, {
        headers: { Authorization: token },
      });

      setForms(res.data.forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const deleteForm = async (formId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/form/delete/${formId}`, {
        headers: { Authorization: token },
      });
      toast.success("Form deleted!");
      setForms((prev) => prev.filter((f) => f._id !== formId));
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading forms...</p>;
  }

  if (forms.length === 0) {
    return <p className="text-muted-foreground">No forms created yet.</p>;
  }

  return (
    <div className="mt-6">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            {/* <TableHead>Responses</TableHead> */}
            <TableHead>Live Link</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form._id}>
              <TableCell>{form.title}</TableCell>
              <TableCell>
                {new Date(form.createdAt).toLocaleDateString()}
              </TableCell>
              {/* <TableCell>{form.responseCount || 0}</TableCell> */}
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/forms/${form._id}`)}
                >
                  View Form
                </Button>
              </TableCell>
              <TableCell>
                <FormActions
                  formId={form._id}
                  title={form.title}
                  onDelete={deleteForm}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FormTable;
