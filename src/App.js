import { createContext, useEffect, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import reducer from "./reducer";
import { DEFAULT_MEETING_DATA } from "./constants/meeting.constants";
import AppRoutes from "./routes";
import './App.css'

const queryClient = new QueryClient();
export const MeetingOrganizerContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_MEETING_DATA);

  const MeetingOrganizer = {
    state, dispatch
  }

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <MeetingOrganizerContext.Provider value={MeetingOrganizer}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AppRoutes />
        </div>
      </QueryClientProvider>
    </MeetingOrganizerContext.Provider>
  );
}

export default App;
