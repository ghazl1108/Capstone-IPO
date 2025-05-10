// src/components/MultiStepForm.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Checkbox } from "./ui/Checkbox";
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { Progress } from "./ui/Progress";

// Form schemas for each step
const registrationSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  registrationNumber: z.string().min(2, { message: "Registration number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const predictionDataSchema = z.object({
  egc: z.string().optional(),
  patRatio: z.string().optional(),
  highTech: z.boolean().optional().default(false),
  age: z.string().optional(),
  year: z.string().optional(),
  nUnderwriters: z.string().optional(),
  sharesOfferedPerc: z.string().optional(),
  investmentReceived: z.string().optional(),
  amountOnProspectus: z.string().optional(),
  commonEquity: z.string().optional(),
  sp2weeksBefore: z.string().optional(),
  blueSky: z.string().optional(),
  managementFee: z.string().optional(),
  bookValue: z.string().optional(),
  totalAssets: z.string().optional(),
  totalRevenue: z.string().optional(),
  netIncome: z.string().optional(),
  roa: z.string().optional(),
  leverage: z.string().optional(),
});

const riskAnalysisSchema = z.object({
  additionalInfo: z.string().optional(),
  uploadPdf: z.boolean().optional().default(false),
});

const formSchemas = [registrationSchema, predictionDataSchema, riskAnalysisSchema];

const steps = [
  {
    title: "Company Registration",
    description: "Create your account and register your company",
  },
  {
    title: "Prediction Data",
    description: "Enter financial and IPO-related information",
  },
  {
    title: "Risk Analysis",
    description: "Additional information for risk assessment",
  },
];

export function MultiStepForm({
  onSubmit,
  currentStep,
  setCurrentStep,
}) {
  // Store form data between steps
  const [formData, setFormData] = useState({});
  
  // Create a form for the current step
  const form = useForm({
    resolver: zodResolver(formSchemas[currentStep]),
    defaultValues: formData,
    mode: "onChange" // Validate on change for better user experience
  });
  
  // Update form with existing data when step changes
  useEffect(() => {
    const currentValues = formData;
    Object.keys(form.getValues()).forEach(key => {
      if (currentValues[key] !== undefined) {
        form.setValue(key, currentValues[key]);
      }
    });
  }, [currentStep, form, formData]);

  // Debug logging to help identify issues
  useEffect(() => {
    console.log("Current step:", currentStep);
    console.log("Form data:", formData);
    console.log("Form errors:", form.formState.errors);
  }, [currentStep, formData, form.formState.errors]);

  const handleNext = async () => {
    console.log("Next button clicked");
    
    try {
      // Validate current step
      const result = await form.trigger();
      console.log("Validation result:", result);
      
      if (result) {
        // Get current form values
        const stepData = form.getValues();
        console.log("Step data:", stepData);
        
        // Update form data
        const updatedFormData = { ...formData, ...stepData };
        setFormData(updatedFormData);
        
        // Move to next step or submit
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          console.log("Submitting form with data:", updatedFormData);
          onSubmit(updatedFormData);
        }
      } else {
        console.log("Form validation failed");
        // Show validation errors
        Object.keys(form.formState.errors).forEach(key => {
          console.error(`Field ${key} error:`, form.formState.errors[key]);
        });
      }
    } catch (error) {
      console.error("Error in form handling:", error);
    }
  };

  const handleBack = () => {
    // Save current step data before going back
    const stepData = form.getValues();
    setFormData({ ...formData, ...stepData });
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Save current step data even when skipping
    const stepData = form.getValues();
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(updatedFormData);
    }
  };

  // Helper function to render form error messages
  const ErrorMessage = ({ name }) => {
    const error = form.formState.errors[name];
    return error ? (
      <p className="text-sm text-red-500 mt-1">{error.message}</p>
    ) : null;
  };

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${index === currentStep ? "text-blue-600" : "text-slate-500"}`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-slate-900">{steps[currentStep].title}</h2>
        <p className="text-slate-600">{steps[currentStep].description}</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {currentStep === 0 && (
          <>
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700">
                Company Name
              </label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                {...form.register("companyName")}
                className={form.formState.errors.companyName ? "border-red-500" : ""}
              />
              <ErrorMessage name="companyName" />
            </div>

            <div className="space-y-2">
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-slate-700">
                Registration Number
              </label>
              <Input
                id="registrationNumber"
                placeholder="Enter company registration number"
                {...form.register("registrationNumber")}
                className={form.formState.errors.registrationNumber ? "border-red-500" : ""}
              />
              <ErrorMessage name="registrationNumber" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
                className={form.formState.errors.email ? "border-red-500" : ""}
              />
              <ErrorMessage name="email" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...form.register("password")}
                className={form.formState.errors.password ? "border-red-500" : ""}
              />
              <ErrorMessage name="password" />
            </div>
          </>
        )}

        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="egc" className="block text-sm font-medium text-slate-700">
                EGC Status
              </label>
              <Input
                id="egc"
                placeholder="EGC Status"
                {...form.register("egc")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="patRatio" className="block text-sm font-medium text-slate-700">
                Patent Ratio
              </label>
              <Input
                id="patRatio"
                placeholder="Patent Ratio"
                {...form.register("patRatio")}
              />
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-md">
              <input
                type="checkbox"
                id="highTech"
                {...form.register("highTech")}
                className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="highTech" className="block text-sm font-medium text-slate-700">
                  High-Tech Company
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-slate-700">
                Company Age (Years)
              </label>
              <Input
                id="age"
                placeholder="Company Age"
                {...form.register("age")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="year" className="block text-sm font-medium text-slate-700">
                IPO Year
              </label>
              <Input
                id="year"
                placeholder="IPO Year"
                {...form.register("year")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="nUnderwriters" className="block text-sm font-medium text-slate-700">
                Number of Underwriters
              </label>
              <Input
                id="nUnderwriters"
                placeholder="Number of Underwriters"
                {...form.register("nUnderwriters")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sharesOfferedPerc" className="block text-sm font-medium text-slate-700">
                Shares Offered (%)
              </label>
              <Input
                id="sharesOfferedPerc"
                placeholder="Percentage of Shares Offered"
                {...form.register("sharesOfferedPerc")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalAssets" className="block text-sm font-medium text-slate-700">
                Total Assets ($)
              </label>
              <Input
                id="totalAssets"
                placeholder="Total Assets"
                {...form.register("totalAssets")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalRevenue" className="block text-sm font-medium text-slate-700">
                Total Revenue ($)
              </label>
              <Input
                id="totalRevenue"
                placeholder="Total Revenue"
                {...form.register("totalRevenue")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="netIncome" className="block text-sm font-medium text-slate-700">
                Net Income ($)
              </label>
              <Input
                id="netIncome"
                placeholder="Net Income"
                {...form.register("netIncome")}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <div className="space-y-2">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700">
                Additional Information for Risk Analysis
              </label>
              <Textarea
                id="additionalInfo"
                placeholder="Provide any additional information that might help with risk assessment"
                className="min-h-[150px]"
                {...form.register("additionalInfo")}
              />
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-md">
              <input
                type="checkbox"
                id="uploadPdf"
                {...form.register("uploadPdf")}
                className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="uploadPdf" className="block text-sm font-medium text-slate-700">
                  Upload PDF Documents
                </label>
                <p className="text-sm text-slate-500">
                  Check this if you want to upload additional documents for analysis
                </p>
              </div>
            </div>

            {form.watch("uploadPdf") && (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-slate-500" />
                    <p className="mb-2 text-sm text-slate-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF (MAX. 10MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept=".pdf" />
                </label>
              </div>
            )}
          </>
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <div className="space-x-2">
            {currentStep === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
              >
                Skip
              </Button>
            )}
            
            <Button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}