// src/pages/ResultsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, Share2 } from 'lucide-react';
import { Button } from "../components/ui/Button";

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [userData, setUserData] = useState(null);

  // Simulate loading data and get user data from localStorage
  useEffect(() => {
    // Get registration data from localStorage
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    // Simulate API call for results
    const timer = setTimeout(() => {
      setResults({
        offerPrice: 42.75,
        day1Close: 58.2,
        riskLevel: 35, // 0-100 scale, lower is better
        riskFactors: [
          "Market volatility in tech sector",
          "Competition from established players",
          "Regulatory challenges in primary markets",
        ],
        recommendations: [
          "Consider a slightly lower initial offer price to ensure strong first-day performance",
          "Highlight growth potential in investor presentations",
          "Emphasize technological advantages over competitors",
        ],
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Data</h2>
          <p className="text-slate-600">Our AI is processing your information to generate accurate predictions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {userData ? `${userData.companyName}'s` : 'Your'} IPO Prediction Results
          </h1>
          <p className="text-lg text-slate-600">
            Based on your company data, our AI has generated the following predictions.
          </p>
        </div>

        {/* Results content here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-center mb-2">Offer Price Prediction</h2>
            <div className="text-center py-6">
              <div className="inline-block rounded-full bg-blue-100 p-6">
                <span className="text-4xl font-bold text-blue-600">${results.offerPrice}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center">Recommended IPO price per share</p>
          </div>

          <div className="border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-center mb-2">Day 1 Close Prediction</h2>
            <div className="text-center py-6">
              <div className="inline-block rounded-full bg-green-100 p-6">
                <span className="text-4xl font-bold text-green-600">${results.day1Close}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center">Expected closing price on first trading day</p>
          </div>

          <div className="border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-center mb-2">Risk Analysis</h2>
            <div className="text-center py-6">
              <div className="inline-block rounded-full bg-amber-100 p-6">
                <span className="text-4xl font-bold text-amber-600">{results.riskLevel}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center">
              {results.riskLevel < 30 ? "Low Risk" : results.riskLevel < 70 ? "Moderate Risk" : "High Risk"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Risk Factors</h2>
            <ul className="space-y-2">
              {results.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 mr-2 text-sm">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Recommendations</h2>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-2 text-sm">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}