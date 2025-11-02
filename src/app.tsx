import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginForm } from './pages/Login';
import { Home } from './pages/Home';
import { SignupForm } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { Validation } from './pages/Validation';
// import { Valid } from './pages/valid'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" font-style='Vazir'>

        <main className="container mx-auto">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signUp' element={<SignupForm />} />
            <Route path='/validation' element={<Validation />} />
            {/* <Route path='/valid' element={<Valid />} /> */}
            <Route path='/profile/:name' element={<Profile />} />
            <Route path='*' element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
                  <p className="text-2xl text-slate-600">صفحه مورد نظر یافت نشد</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
