import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Home } from './screens/home';
import { Toaster } from './components/ui/sonner';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
            <Toaster closeButton />
        </>
    );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);