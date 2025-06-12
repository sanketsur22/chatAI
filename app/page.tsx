"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  MessageSquare,
  Upload,
  Edit3,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { ClientWrapper } from "@/components/client-wrapper";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

function LandingPageContent() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                {user?.username && (
                  <span className="hidden md:inline text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user.username}!
                  </span>
                )}
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Chat with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of conversation. Upload files, edit
              messages, and get intelligent responses powered by advanced AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isLoaded ? (
              <>
                {isSignedIn ? (
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  >
                    Go to Chat <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <SignUpButton mode="modal">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                    >
                      Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </SignUpButton>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Learn More
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 text-lg opacity-75"
                >
                  Loading...
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                  disabled
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`mt-20 grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Smart Conversations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engage in natural, intelligent conversations with our advanced
                AI assistant.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">File Upload</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload documents, images, videos, and more to enhance your
                conversations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                <Edit3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Edit Messages</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Refine your messages and get better responses with our editing
                feature.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-12">Why Choose ChatAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto" />
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant responses with our optimized AI infrastructure.
              </p>
            </div>
            <div className="space-y-4">
              <Shield className="w-8 h-8 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your conversations are encrypted and never stored permanently.
              </p>
            </div>
            <div className="space-y-4">
              <Sparkles className="w-8 h-8 text-purple-500 mx-auto" />
              <h3 className="text-xl font-semibold">Always Improving</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI learns and improves to provide better assistance.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ChatAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChatAI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              Sign In
            </Button>
            <Button disabled>Sign Up</Button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Chat with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of conversation. Upload files, edit
              messages, and get intelligent responses powered by advanced AI.
            </p>
          </div>
          <div className="flex justify-center mt-12">
            <div className="w-16 h-16 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ClientWrapper fallback={<LoadingFallback />}>
      <LandingPageContent />
    </ClientWrapper>
  );
}
