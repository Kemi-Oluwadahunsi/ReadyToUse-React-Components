import { Route, Routes } from "react-router-dom";
import "./App.css";
import FloatingActionButton from "./components/FloatingActionButton";
import InteractiveStepper from "./components/InteractiveStepper";
import ScrollAwareNavbar from "./components/ScrollAwareNavbar";
import Home from "./Home";
import Accordion from "./components/Accordion";
import HoverRevealCard from "./components/HoverRevealCard";
import TimeLine from "./components/TimeLine";
import MultiSelectTagInput from "./components/MultiSelectTagInput";
import CommandPalette from "./components/VirtualList";
import ScrollCarousel from "./components/ScrollCarousel";
import Page from "./components/darkMode/Page";
import NotificationPage from "./components/Notification-bell/NotificationPage";
import ResizableSidebar from "./components/ResizableSidebar";
import DarkModePage from "./components/darkMode/DarkModePage";
import KanbanBoard from "./components/KanbanBoard";
import FilterableGallery from "./components/FilterableGallery";
import CustomToggleSwitch from "./components/CustomToggleSwitch";
import ProgressBarSteps from "./components/ProgressBarSteps";
import PricingCards from "./components/PricingCards";
import ToastNotificationDemo from "./components/ToastNotification";
import SearchBarSuggestions from "./components/SearchBar";
import FilterComponent from "./components/FilterComponent";
import VirtualList from "./components/VirtualList";


function App() {
  return (
    <div className="pt-5">
      <DarkModePage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fab" element={<FloatingActionButton />} />
        <Route path="/stepper" element={<InteractiveStepper />} />
        <Route path="/scroll-navbar" element={<ScrollAwareNavbar />} />
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/hover-reveal" element={<HoverRevealCard />} />
        <Route path="/timeline" element={<TimeLine />} />
        <Route path="/multi-select" element={<MultiSelectTagInput />} />
        <Route path="/virtual-list" element={<VirtualList />} />
        <Route path="/carousel" element={<ScrollCarousel />} />
        <Route path="/darkmode" element={<Page />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/sidebar" element={<ResizableSidebar />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/gallery" element={<FilterableGallery />} />
        <Route path="/toggle" element={<CustomToggleSwitch />} />
        <Route path="/progress-bar" element={<ProgressBarSteps />} />
        <Route path="/pricing-cards" element={<PricingCards />} />
        <Route path="/toast" element={<ToastNotificationDemo />} />
        <Route path="/search-bar" element={<SearchBarSuggestions />} />
        <Route path="/filtering" element={<FilterComponent />} />
      </Routes>
    </div>
  );
}

export default App;
