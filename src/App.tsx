
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarksProvider } from "./hooks/useBookmarks";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./pages/EmployeeDetail";
import Bookmarks from "./pages/Bookmarks";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookmarksProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BookmarksProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
