import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const CreateForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", type: "text", options: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === "type" && value === "text") {
      updated[index].options = []; 
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(optIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    if (questions.length >= 5) {
      toast.warn("Maximum 5 questions allowed");
      return;
    }
    setQuestions([...questions, { questionText: "", type: "text", options: [] }]);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 3) {
      toast.warn("Minimum 3 questions required");
      return;
    }
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.length < 3) {
      return toast.error("Add at least 3 questions");
    }

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login required");

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/form/create`,
        { title, questions },
        {
          headers: {
            Authorization: token, 
          },
        }
      );

      toast.success("Form created!", {
        onClose: () => navigate(`/dashboard`),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <ToastContainer />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Create Feedback Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Form Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {questions.map((q, index) => (
              <div key={index} className="p-4  rounded-md border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Question {index + 1}</h4>
                  {questions.length > 3 && (
                    <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <Input
                  type="text"
                  placeholder="Enter question text"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
                  required
                />

                <Select
                  value={q.type}
                  onValueChange={(value) => handleQuestionChange(index, "type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                  </SelectContent>
                </Select>

                {q.type === "mcq" && (
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex gap-2 items-center">
                        <Input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeOption(index, optIndex)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => addOption(index)} size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4">
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Create Form"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateForm;
