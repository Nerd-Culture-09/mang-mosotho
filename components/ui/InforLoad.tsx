"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
    
    
    
    
    

const loadingStates = [
    {
        "text": "Search by name for their phone or email."
      },
      {
        "text": "Search by phone for their name or email."
      },
      {
        "text": "Search by email for their name or phone."
      },
      {
        "text": "Enter a name to get contact details."
      },
      {
        "text": "Enter a phone number for name or email."
      },
      {
        "text": "Enter an email to get name and phone."
      }
];

export function Inforload() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
