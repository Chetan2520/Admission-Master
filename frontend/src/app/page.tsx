"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TopStudyPlaces from "@/components/home/TopStudyPlaces";
import ExamCategories from "@/components/home/ExamCategories";
import ImageBanner from "@/components/home/ImageBanner"; 
import TopExams from "@/components/home/TopExams";
import AdvancedFeatures from "@/components/home/AdvancedFeatures";
import VIPCounselling from "@/components/home/VIPCounselling";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with RedBus Style Predictor */}
      <HeroSection />

      {/* Spacing for overlapping predictor */}
      <div className="mt-20 md:mt-24">
        <TopStudyPlaces />
        <ExamCategories />
        <TopExams />
      </div>

      {/* Banner Strip 1: After Exams */}
      <ImageBanner 
        image="/banner.jpeg"
        heading="Never Miss an Admission Deadline"
        subtext="Get real-time alerts for form releases, exam dates, and counseling rounds on your WhatsApp."
        ctaText="Get Alerts"
        ctaLink="/alerts"
      />

   

      <AdvancedFeatures />

       

      {/* <VIPCounselling /> */}

      {/* <Testimonials /> */}
      
      <FAQ />
      <FinalCTA />

     
      
    </div>
  );
}
