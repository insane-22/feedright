import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router";

const FormResponseChart = ({ questions, responses }) => {
  const navigate = useNavigate();
  if (!questions.length || !responses.length) return null;

  const handleExport = () => {
    const flatData = responses.map((r) => {
      const row = {};
      questions.forEach((q, index) => {
        row[`Q${index + 1}: ${q.questionText}`] = r.answers[index];
      });
      return row;
    });

    const csv = Papa.unparse(flatData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "form_responses.csv");
  };

  const handleBack = () => {
    navigate("/dashboard")
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Button onClick={handleBack} className="mb-4">
          Back to Dashboard
        </Button>
        <Button onClick={handleExport} className="mb-4">
          Export All Responses (CSV)
        </Button>
      </div>

      {questions.map((q, qIndex) => {
        const answers = responses.map((r) => r.answers[qIndex]);

        if (q.type === "text") {
          return (
            <Card key={qIndex} className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  Question - {qIndex + 1} : {q.questionText}
                </h3>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`text-${qIndex}`}>
                    <AccordionTrigger className="text-sm">
                      View {answers.length} responses
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc ml-5 text-sm space-y-1 text-muted-foreground">
                        {answers.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        }

        if (q.type === "mcq" && q.options) {
          const counts = q.options.map((opt) => ({
            option: opt,
            count: answers.filter((a) => a === opt).length,
          }));

          return (
            <Card key={qIndex} className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  Question - {qIndex + 1} : {q.questionText}
                </h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={counts}>
                      <XAxis dataKey="option" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#4f46e5"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FormResponseChart;
