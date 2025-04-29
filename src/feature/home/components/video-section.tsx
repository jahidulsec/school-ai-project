"use client";

import React from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";

export default function VideoSection() {
  const playVideo = () => {
    const video = document.getElementById("video") as HTMLVideoElement;

    const startVideo = () => {
      navigator.mediaDevices
        ?.getUserMedia({ video: {} })
        .then((stream) => {
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch((err) => console.error(err));
    };

    // load models first
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ]).then(startVideo);
  };

  const handleOnPlay = () => {
    const video = document.getElementById("video") as HTMLVideoElement;

    // create canvus
    const canvus = faceapi.createCanvasFromMedia(video);

    // append canvus
    document.getElementById("video-container")?.appendChild(canvus);

    const displaySize = { width: video.width, height: video.height };

    //
    faceapi.matchDimensions(canvus, displaySize);

    // set interval to detect face at every 100 ms
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);

      // sized detection based on result and display size
      const resizedDetection = faceapi.resizeResults(detections, displaySize);

      // clear canvus before draw
      canvus.getContext("2d")?.clearRect(0, 0, canvus.width, canvus.height);

      // draw canvus with information
      faceapi.draw.drawDetections(canvus, resizedDetection);
      faceapi.draw.drawFaceLandmarks(canvus, resizedDetection);
      faceapi.draw.drawFaceExpressions(canvus, resizedDetection);
    }, 100);
  };

  return (
    <div className=" min-h-svh w-full flex flex-col gap-1 justify-center items-center">
      <Button onClick={playVideo}>Play</Button>
      <div
        id="video-container"
        className="relative w-[720px] h-[560px] flex flex-col justify-center items-center"
      >
        <video
          onPlaying={handleOnPlay}
          id="video"
          className="border rounded-md"
          width={720}
          height={560}
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  );
}
