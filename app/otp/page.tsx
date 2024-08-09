"use client";

import { auth } from "@/firebase"; 
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import React, { useEffect, FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResentCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResentCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    try {
      const verifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
      verifier.render().then((widgetId) => {
        console.log("RecaptchaVerifier initialized with widgetId:", widgetId);
      });
      setRecaptchaVerifier(verifier);
    } catch (error) {
      console.error("Error initializing RecaptchaVerifier:", error);
    }

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, [auth]);

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResentCountdown(60);
    startTransition(async () => {
      setError('');
      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier is not initialized");
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully.");
      } catch (err: any) {
        setResentCountdown(0);
        if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please try again");
          console.log("error is:", err);
        } else if (err.code === "auth/too-many-requests") {
          setError("Too many requests. Please try again later");
          console.log("error is:", err);
        } else {
          setError("Failed to send OTP. Please try again");
          console.log("error is:", err);
        }
      }
    });
  };

  const loadingIndicator = (
    <Loader2 className="animate-spin" />
  );

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div id="recaptcha-container" />
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            className=""
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs py-2">
            Please enter your number with country code
          </p>
        </form>
      )}
      <Button
        disabled={!phoneNumber || isPending || resendCountdown > 0}
        onClick={() => requestOtp()}
        className="mt-5"
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}`
          : isPending
          ? "Sending OTP"
          : "Send OTP"
        }
      </Button>
      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      {isPending && loadingIndicator}
    </div>
  );
};

export default OTPLogin;
