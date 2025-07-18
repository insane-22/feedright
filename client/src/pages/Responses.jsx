import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FormResponseOverview from "@/components/formResponseOverview";
import FormResponseChart from "@/components/formResponseChart";
// import FormResponseChart from "@/components/responses/FormResponseChart";
// import ResponseList from "@/components/responses/ResponseList";
// import ExportCSVButton from "@/components/responses/ExportCSVButton";

const API_URL = import.meta.env.VITE_API_URL;

const Responses = () => {
  const { formId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_URL}/form/single/${formId}/responses`,
        {
          headers: { Authorization: token },
        }
      );
      setData(res.data);
    };
    fetchResponses();
  }, [formId]);

  if (!data) return <div className="p-6 text-muted-foreground">Loading...</div>;
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold">{data.form.title} - Responses</h1>
      <p className="text-muted-foreground">{data.form.description}</p>

      <FormResponseOverview responses={data.responses} />
      <FormResponseChart
        questions={data.form.questions}
        responses={data.responses}
      />
    </div>
  );
};

export default Responses;
