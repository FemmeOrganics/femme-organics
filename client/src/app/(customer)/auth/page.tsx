"use client";
import { Leaf, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "./components/sign-up";
import { SignInForm } from "./components/sign-in";

const AuthScreen = () => {
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 text-pink-600  to-teal-50 dark:from-gray-900 dark:via-lime-900/20 dark:to-emerald-900/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-lime-400/30 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-lime-400/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-lime-400/15 to-emerald-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-lime-400/40 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="lg:w-1/2 bg-gradient-to-br from-lime-500 via-lime-600 to-emerald-600 p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-300/20 rounded-full blur-lg"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white text-xl font-bold">Femme Organics</h3>
                    <p className="text-lime-100 text-sm">
                      From Nature, with Love
                    </p>
                  </div>
                </div>

                <h1 className="hidden md:block text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Welcome to
                  <span className="bg-gradient-to-r from-white via-lime-100 to-emerald-100 bg-clip-text text-transparent block">
                    Nature&apos;s Haven
                  </span>
                </h1>

                <p className="text-lime-100 text-lg mb-8 leading-relaxed">
                  Connect with sustainable living and discover eco-friendly
                  solutions that make a difference in your lifestyle.
                </p>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-lime-100">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">100% Organic</span>
                  </div>
                  <div className="flex items-center text-lime-100">
                    <Leaf className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Eco-Friendly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="lg:w-1/2 p-4 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-gray-700 p-1 rounded-2xl h-auto">
                    <TabsTrigger
                      value="signin"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-lime-600 dark:data-[state=active]:text-lime-400 data-[state=active]:shadow-lg rounded-xl py-3 font-medium transition-all duration-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-lime-600 dark:data-[state=active]:text-lime-400 data-[state=active]:shadow-lg rounded-xl py-3 font-medium transition-all duration-300"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  {/* Sign In Tab */}
                  <TabsContent value="signin">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader className="text-center pb-6 px-0">
                        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                          Welcome Back!
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Sign in to continue your shopping experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0 space-y-4">
                        <SignInForm />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Sign Up Tab */}
                  <TabsContent value="signup">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader className="text-center pb-6 px-0">
                        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                          Join Us
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Shop with us today
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0 space-y-4">
                        <SignUpForm />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center hidden md:block">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Join over 10,000+ eco-conscious users
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center border border-lime-200 dark:border-lime-800"
                      >
                        <Leaf className="w-4 h-4 text-lime-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;