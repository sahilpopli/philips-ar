"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateProductUrl } from "@/lib/categoryUtils";

interface RedirectPageParams {
  slug: string;
}

export default function RedirectPage({ params }: { params: RedirectPageParams }) {
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // Generate the new URL based on the slug and redirect
    const newUrl = generateProductUrl(slug);
    
    // If it's not the old fallback URL, redirect
    if (newUrl !== `/products/${slug}`) {
      router.replace(newUrl);
    } else {
      // If we can't find the category, redirect to home
      router.replace("/");
    }
  }, [slug, router]);

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}
