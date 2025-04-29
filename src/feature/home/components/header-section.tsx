"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Video, X } from "lucide-react";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";

export default function HeaderSection() {
  const [isPlaying, setPlaying] = useState(false);

  const router = useRouter();

  const playVideo = () => {
    const video = document.getElementById("video") as HTMLVideoElement;

    // get video from webcam
    const startVideo = () => {
      navigator.mediaDevices
        ?.getUserMedia({ video: {} })
        .then((stream) => {
          if (video) {
            video.srcObject = stream;
            setPlaying(true);
          }
        })
        .catch((err) => console.error(err));
    };

    // load models first, then start video
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ]).then(startVideo);
  };

  return (
    <header className="flex items-center justify-between gap-5 mb-5">
      {/* left section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">
          Class Attendance - {format(new Date(), "LLL dd, yyyy")}
        </h1>
        <h2 className="text-sm text-muted-foreground">
          Feni Govt. Pilot High School
        </h2>
      </div>

      {!isPlaying ? (
        <Button variant={"default"} onClick={playVideo}>
          <Video /> Start Attendace
        </Button>
      ) : (
        <Button variant={"destructive"} onClick={() => {
          const video = document.getElementById("video") as HTMLVideoElement;

          video.srcObject = null

          navigator.mediaDevices.getUserMedia({video: false})

          setPlaying(false)
        }}>
          <X /> Close
        </Button>
      )}
    </header>
  );
}
