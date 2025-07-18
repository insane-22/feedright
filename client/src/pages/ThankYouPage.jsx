import React from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import thankyou from "@/assets/thankyou.svg";

const ThankYouPage = () => {
  const { width, height } = useWindowSize();
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = state?.form;

  const message = form?.thankyouMessage || "Thanks for your feedback!";
  const title = form?.title || "Form Submitted";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Confetti
        width={width - 20}
        height={height - 20}
        recycle={false}
        numberOfPieces={3000}
      />
      <img
        src={thankyou}
        alt="Thank You"
        className="w-64 mb-8 mx-auto animate-fade-in"
      />
      <h1 className="text-4xl font-bold mb-2 text-foreground">Thank You!</h1>
      <p className="text-muted-foreground text-lg mb-1">
        <span className="font-semibold">{title}</span>
      </p>
      <p className="text-xl max-w-xl text-muted-foreground mt-2">{message}</p>

      <Button className="mt-8" onClick={() => { navigate(`/forms/${form?._id}`)}}>
        Fill another Response
      </Button>
    </div>
  );
};

export default ThankYouPage;
