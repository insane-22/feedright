import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays } from "date-fns";

const FormResponseOverview = ({ responses }) => {
  const total = responses.length;
  const last7Days = responses.filter(
    (r) => differenceInDays(new Date(), new Date(r.createdAt)) <= 7
  );
  const lastResponseDate = responses.at(-1)?.createdAt
    ? new Date(responses.at(-1).createdAt).toLocaleString()
    : "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Total Responses</h3>
          <p className="text-2xl font-bold">{total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Last 7 Days</h3>
          <p className="text-2xl font-bold">{last7Days.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Last Response</h3>
          <p className="text-2xl font-bold">{lastResponseDate}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormResponseOverview;
