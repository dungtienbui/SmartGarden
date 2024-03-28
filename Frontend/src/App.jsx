import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout;
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Layout children={<Page />} />} />;
                    })}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
