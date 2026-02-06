import { Link, useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useApp();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login delay
        setTimeout(() => {
            login();
            navigate('/dashboard');
        }, 500);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your account and wishlist
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl shadow-xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground placeholder-muted-foreground transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <Link to="#" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground placeholder-muted-foreground transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
                        >
                            Sign in
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button className="flex items-center justify-center w-full px-4 py-2 bg-secondary/50 border border-input rounded-lg shadow-sm text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                                <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                Google
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="#" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
