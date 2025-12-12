'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Chrome, Facebook, Zap } from 'lucide-react';

export default function LoginPage() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();

const mockLogin = () => {
console.log("Mock Login: Success");
router.push('/dashboard'); 
};

const handleLogin = (e: React.FormEvent) => {
e.preventDefault();
if (username && password) {
mockLogin();
}
};

const InputField = ({ Icon, placeholder, type, value, onChange }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
            placeholder={placeholder}
            className="flex h-12 w-full rounded-full border border-gray-200 bg-gray-100 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-colors"
            type={type}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
            
            {/* Left Side: Login Form (White Panel) - p-16 padding for space */}
            <div className="w-1/2 p-16 flex flex-col justify-center">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">LOGIN</h2>
                    <p className="text-sm text-gray-500">How to get started lorem ipsum dolor sit?</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleLogin}>
                    <InputField
                        Icon={User}
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        Icon={Lock}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button
                        className="inline-flex items-center justify-center rounded-full text-base font-medium transition-colors h-12 w-full bg-primary text-white hover:bg-primary/90 shadow-md"
                        type="submit"
                    >
                        Login Now
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-500 font-semibold">
                            Login with Others
                        </span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                    <button
                        className="inline-flex items-center justify-center rounded-full text-sm font-medium h-10 px-4 py-2 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Chrome className="h-5 w-5 mr-3 text-red-500" /> Sign in with Google
                    </button>
                    <button
                        className="inline-flex items-center justify-center rounded-full text-sm font-medium h-10 px-4 py-2 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Facebook className="h-5 w-5 mr-3 text-blue-600" /> Sign in with Facebook
                    </button>
                </div>
            </div>

            {/* Right Side: Illustration (Purple Panel) */}
            <div className="w-1/2 relative flex items-center justify-center p-10 bg-purple-700-custom">
                <div className="absolute w-6 h-6 rounded-full bg-white opacity-50 top-10 left-10"></div>
                <div className="absolute w-12 h-12 rounded-full bg-white opacity-50 bottom-10 right-10"></div>
                
                <div className="w-4/5 p-4 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center h-48">
                    <p className="text-center text-sm text-gray-600">
                        Map Builder Access
                    </p>
                    <Zap className="h-10 w-10 text-yellow-400 my-2" />
                    <p className="text-lg font-semibold text-gray-800">
                        Start your project now!
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}
