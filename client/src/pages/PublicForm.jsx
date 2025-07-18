import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const PublicForm = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`${API_URL}/form/single/${formId}`);
        setForm(res.data.form);
        setAnswers(new Array(res.data.form.questions.length).fill(""));
      } catch (error) {
        toast.error("Failed to load form");
      }
    };
    fetchForm();
  }, [formId]);

  const handleMCQChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleTextChange = (index, e) => {
    const updated = [...answers];
    updated[index] = e.target.value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.some((ans) => ans.trim() === "")) {
      return toast.error("Please answer all questions");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/form/single/${formId}/response`,
        {
          answers,
        }
      );
      toast.success("Response submitted!");
      setAnswers(new Array(form.questions.length).fill(""));
      setTimeout(() => {
        navigate(`/thankyou/${formId}`, { state: { form } });
      }, 1500);
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <p className="text-center mt-10">Loading form...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{form.title}</CardTitle>
          {form.description && (
            <p className="text-muted-foreground text-sm mt-1">
              {form.description}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {form.questions.map((q, index) => (
            <div key={q._id}>
              <Label className="text-base font-medium block mb-2">
                {index + 1}. {q.questionText}
              </Label>

              {q.type === "mcq" ? (
                <RadioGroup
                  value={answers[index]}
                  onValueChange={(value) => handleMCQChange(index, value)}
                >
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem value={opt} id={`${q._id}-${i}`} />
                      <Label htmlFor={`${q._id}-${i}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  rows={3}
                  value={answers[index]}
                  onChange={(e) => handleTextChange(index, e)}
                  placeholder="Type your answer..."
                  className="mt-2"
                />
              )}
            </div>
          ))}

          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicForm;
