import { createContext, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import reducer from "./reducer/fx.rates.reducer";
import { DEFAULT_MEETING_DATA } from "./constants/meeting.constants";
import AppRoutes from "./routes";
import './App.css'

const queryClient = new QueryClient();
export const MeetingOrganizerContext = createContext();
export const FxRatesDashboardContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, { fxPairData: {} });

  const MeetingOrganizer = { state, dispatch }
  const FxRatesDashboard = { state, dispatch }

  return (
    <MeetingOrganizerContext.Provider value={MeetingOrganizer}>
      <FxRatesDashboardContext.Provider value={FxRatesDashboard}>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <AppRoutes />
          </div>
        </QueryClientProvider>
      </FxRatesDashboardContext.Provider>
    </MeetingOrganizerContext.Provider>
  );
}

export default App;
