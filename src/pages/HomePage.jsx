// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, BarChart3, LineChart, TrendingUp, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                Predict Your IPO Success with Confidence
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl">
                AI-powered predictions for Offer Price, Day 1 Close, and Risk Analysis.
              </p>
              <div className="pt-4">
                <Link to="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Your Company Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              {/* Using absolute path to the image in public folder */}
              <img 
                src="/images/hero-illustration.png" 
                alt="IPO Prediction Illustration" 
                className="w-full h-auto rounded-lg shadow-md" 
                onError={(e) => {
                  console.error("Hero image failed to load");
                  e.target.style.display = 'none';
                  e.target.parentNode.style.minHeight = '300px';
                  e.target.parentNode.style.backgroundColor = '#f1f5f9';
                  e.target.parentNode.style.borderRadius = '0.5rem';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Service */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Our IPO Prediction Service</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              IPO pricing and risk assessment have traditionally been challenging and uncertain. Our AI-powered solution
              changes that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Reduce Uncertainty</h3>
              <p className="text-slate-600">
                Our AI models analyze hundreds of data points to provide accurate predictions, reducing the guesswork in
                IPO planning.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Plan Pricing Better</h3>
              <p className="text-slate-600">
                Optimize your IPO pricing strategy with data-driven insights that maximize capital raised while ensuring
                market success.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Improve Success Rate</h3>
              <p className="text-slate-600">
                Companies using our predictions have seen a 40% higher success rate in meeting their IPO goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your HomePage component... */}
    </div>
  );
}