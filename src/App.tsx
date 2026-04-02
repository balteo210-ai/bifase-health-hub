import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import ExplorePage from "./pages/ExplorePage";
import BiPremiaPage from "./pages/BiPremiaPage";
import BiPremiaAdmin from "./pages/BiPremiaAdmin";
import PerProfessionisti from "./pages/PerProfessionisti";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/esplora" element={<ExplorePage />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<CitizenDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/bipremia" element={<BiPremiaPage />} />
          <Route path="/bipremia/admin" element={<BiPremiaAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
