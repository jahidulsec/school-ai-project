"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

export default function VideoSection() {
//   useEffect(() => {


//     startVideo();
//   }, []);

  const startVideo = () => {
    const video = document.getElementById("video") as HTMLVideoElement;
    navigator.mediaDevices
      ?.getUserMedia({ video: {} })
      .then((stream) => {
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="min-h-svh w-full flex flex-col gap-5 justify-center items-center">
      <Button onClick={startVideo}>Play</Button>
      <video
        id="video"
        className="border"
        width={720}
        height={560}
        autoPlay
        muted
        playsInline
      />
    </main>
  );
}
