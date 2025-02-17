
import './App.css';
import AppRoutes from './AppRoutes';
import ErrorBoundary from './NotFound/Error Boundry';




function App() {
  return (
    <>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>

    </>

  )
}

export default App
