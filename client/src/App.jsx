import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/ui/theme-provider";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import PublicForm from "./pages/PublicForm";
import ThankYouPage from "./pages/ThankYouPage";
import Responses from "./pages/Responses";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create" element={<CreateForm />} />
        <Route path="/forms/:formId" element={<PublicForm />} />
        <Route path="/thankyou/:formId" element={<ThankYouPage />} />
        <Route path="/dashboard/responses/:formId" element={<Responses />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
