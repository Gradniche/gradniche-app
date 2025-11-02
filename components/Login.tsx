import React, { useState } from 'react';
// FIX: Import the User interface from the data/forums module.
import { User } from '../data/forums';

interface LoginProps {
    onLogin: (user: User) => void;
    onSignup: (newUser: { name: string, username: string, password?: string }) => void;
    onBack: () => void;
    users: User[];
}

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.222,0-9.519-3.487-11.187-8.264l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


const Login: React.FC<LoginProps> = ({ onLogin, onSignup, onBack, users }) => {
    const [viewMode, setViewMode] = useState<'login' | 'signup' | 'forgot'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [resetSent, setResetSent] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleLoginSubmit = () => {
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        if (user) {
            onLogin(user);
        } else {
            setError('Invalid username or password.');
        }
    };

    const handleSignupSubmit = () => {
        const usernameExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
        if (usernameExists) {
            setError('This username is already taken. Please choose another.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&).');
            return;
        }
        
        onSignup({ name: fullName, username, password });
    };
    
    const handleForgotSubmit = () => {
        // In a real app, this would trigger a backend API call.
        // For this demo, we'll just show a confirmation message.
        setResetSent(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (viewMode === 'login') handleLoginSubmit();
        else if (viewMode === 'signup') handleSignupSubmit();
        else if (viewMode === 'forgot') handleForgotSubmit();
    };
    
    const switchView = (newView: 'login' | 'signup' | 'forgot') => {
        setViewMode(newView);
        setError(null);
        setUsername('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
        setResetEmail('');
        setResetSent(false);
    };
    
    const renderLoginView = () => (
        <>
            <h1 className="text-3xl font-bold text-white text-center mb-2">Forum Login</h1>
            <p className="text-center text-gray-400 mb-6">Access the GradNiche community.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g., rohan" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <button type="button" onClick={() => switchView('forgot')} className="text-sm text-gray-400 hover:text-[#F6520C] transition focus:outline-none focus:ring-1 focus:ring-[#F6520C] rounded-sm">Forgot Password?</button>
                    </div>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                {error && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-md text-center">{error}</p>}
                <button type="submit" className="w-full bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]">Login</button>
            </form>

             <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-600"/>
                <span className="mx-4 text-gray-400 text-sm">OR</span>
                <hr className="flex-grow border-gray-600"/>
            </div>

            <button type="button" className="w-full flex items-center justify-center bg-white text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <GoogleIcon />
                Continue with Google
            </button>
            
            <div className="mt-6 border-t border-gray-700 pt-4">
                <h3 className="text-center text-sm font-semibold text-gray-300 mb-2">Demo Credentials</h3>
                <div className="text-xs text-gray-400 space-y-1 text-center bg-gray-800/50 p-3 rounded-md">
                    <p><strong className="font-semibold text-yellow-400">Admin:</strong> admin / adminpassword</p>
                    <p><strong className="font-semibold text-cyan-400">User:</strong> rohan / password123</p>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-6 text-center">
                Don't have an account?
                <button onClick={() => switchView('signup')} className="font-semibold text-[#F6520C] hover:text-orange-400 ml-1">Sign Up</button>
            </p>
        </>
    );

    const renderSignupView = () => (
        <>
            <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>
            <p className="text-center text-gray-400 mb-6">Join the GradNiche community.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g., Rohan Mehta" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g., rohan" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters, with symbols" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                 <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                {error && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-md text-center">{error}</p>}
                <button type="submit" className="w-full bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]">Sign Up</button>
            </form>
             <p className="text-sm text-gray-400 mt-6 text-center">
                Already have an account?
                <button onClick={() => switchView('login')} className="font-semibold text-[#F6520C] hover:text-orange-400 ml-1">Login</button>
            </p>
        </>
    );
    
    const renderForgotView = () => (
        <>
            <h1 className="text-3xl font-bold text-white text-center mb-2">Reset Password</h1>
            {resetSent ? (
                 <div className="text-center text-green-300 bg-green-900/30 p-4 rounded-md">
                    <h2 className="font-semibold">Check Your Email</h2>
                    <p className="text-sm mt-1">If an account exists for {resetEmail}, we've sent a password reset link to it.</p>
                </div>
            ) : (
                <>
                    <p className="text-center text-gray-400 mb-6">Enter your username and we'll send you a link to reset your password.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input type="text" id="reset-email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="e.g., rohan" required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                        </div>
                        {error && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-md text-center">{error}</p>}
                        <button type="submit" className="w-full bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105">Send Reset Link</button>
                    </form>
                </>
            )}
            <p className="text-sm text-gray-400 mt-6 text-center">
                Remember your password?
                <button onClick={() => switchView('login')} className="font-semibold text-[#F6520C] hover:text-orange-400 ml-1">Back to Login</button>
            </p>
        </>
    );

    const renderContent = () => {
        switch (viewMode) {
            case 'login': return renderLoginView();
            case 'signup': return renderSignupView();
            case 'forgot': return renderForgotView();
        }
    }

    return (
        <section className="py-20 bg-[#0a101f] min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-md">
                 <div className="mb-8 text-center">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Back to Home</span>
                    </button>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-[#F6520C]/20">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default Login;