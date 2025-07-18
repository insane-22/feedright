import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const FormActions = ({ onDelete, formId, title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center space-x-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => navigate(`/dashboard/edit/${formId}`)}
      >
        Edit
      </Button>
      <Button size="sm" variant="destructive">
        Delete
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{title}"?</AlertDialogTitle>
            <p>This action cannot be undone.</p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(formId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        size="sm"
        variant="outline"
        onClick={() => navigate(`/dashboard/responses/${formId}`)}
      >
        Responses
      </Button>
    </div>
  );
};

export default FormActions;
