"use client";

import React from "react";
import * as faceapi from "face-api.js";
import { Video } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleOnPlay = () => {
    setIsPlaying(true);

    const video = document.getElementById("video") as HTMLVideoElement;

    // create canvus
    const canvus = faceapi.createCanvasFromMedia(video);

    // append canvus
    document.getElementById("video-container")?.appendChild(canvus);

    // get video player size for create canvus
    const displaySize = { width: video.width, height: video.height };

    //
    faceapi.matchDimensions(canvus, displaySize);

    // set interval to detect face at every 100 ms
    setInterval(async () => {
      // detect faces using ai model
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // sized detection based on result and display size
      const resizedDetection = faceapi.resizeResults(detections, displaySize);

      console.log(detections);

      // clear canvus before draw
      canvus.getContext("2d")?.clearRect(0, 0, canvus.width, canvus.height);

      // draw canvus with information
      faceapi.draw.drawDetections(canvus, resizedDetection);
      faceapi.draw.drawFaceLandmarks(canvus, resizedDetection);
      faceapi.draw.drawFaceExpressions(canvus, resizedDetection);
    }, 100);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <div
        id="video-container"
        className="relative w-[720px] h-[560px] flex flex-col justify-center items-center bg-muted/50 overflow-hidden border rounded-md"
      >
        <video
          onPlaying={handleOnPlay}
          id="video"
          className="relative"
          width={720}
          height={560}
          autoPlay
          muted
          playsInline
        />

        {!isPlaying && (
          <div className="absolute top-[50%] flex flex-col items-center gap-1 pointer-events-none text-muted-foreground/75">
            <Video size={100} />
            <h3 className="text-sm">Start video</h3>
          </div>
        )}
      </div>
    </div>
  );
}
