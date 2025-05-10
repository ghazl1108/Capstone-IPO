// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MultiStepForm } from "../components/MultiStepForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    // In a real application, you would send this data to your backend
    console.log("Form submitted with data:", data);
    
    // Store the data in localStorage for demonstration purposes
    localStorage.setItem("registrationData", JSON.stringify(data));
    
    // Navigate to results page
    navigate("/results");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Register Your Company for IPO Prediction
          </h1>
          <p className="text-lg text-slate-600">Complete the form below to get accurate predictions for your IPO.</p>
        </div>

        <div className="border border-slate-200 rounded-lg shadow-sm p-6">
          <MultiStepForm 
            onSubmit={handleFormSubmit} 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep} 
          />
        </div>
      </div>
    </div>
  );
}