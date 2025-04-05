import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ThreeBackground from "@/components/three-background";
import CustomCursor from "@/components/custom-cursor";
import useFixedTheme from "@/hooks/use-fixed-theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Apply fixed light theme
  useFixedTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThreeBackground />
      <CustomCursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
