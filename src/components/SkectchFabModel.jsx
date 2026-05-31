import { useEffect, useRef, useState } from "react";
import SketchFabLoader from "./SketchFabLoader";

export default function SketchFabModel() {
  const iframeRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let apiInstance = null;

    const initSketchfab = () => {
      if (!iframeRef.current || !window.Sketchfab) return;

      // Initialize the Sketchfab viewer on the iframe element
      const client = new window.Sketchfab("1.12.1", iframeRef.current);

      client.init("30523d6505db43a887eed8c040971146", {
        success: (api) => {
          apiInstance = api;
          api.start();

          // Listen for model loading progress (emits factor between 0.0 and 1.0)
          api.addEventListener("modelLoadProgress", (factor) => {
            setProgress(Math.floor(factor * 100));
          });

          // Trigger completion once the viewer is fully loaded and ready
          api.addEventListener("viewerready", () => {
            setProgress(100);
            setActive(false);
          });
        },
        error: (err) => {
          console.error("Sketchfab API error:", err);
          // Set to 100 and inactive to avoid blocking UI if there is a load error
          setProgress(100);
          setActive(false);
        },
        transparent: 1,
        ui_infos: 0,
        ui_controls: 0,
        ui_watermark: 0,
        ui_stop: 0,
        ui_inspector: 0,
        ui_ar: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_vr: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        ui_related: 0,
        ui_hint: 0,
        autostart: 1,
      });
    };

    // Dynamically load the Sketchfab Viewer API script if not already present
    if (window.Sketchfab) {
      initSketchfab();
    } else {
      const script = document.createElement("script");
      script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
      script.async = true;
      script.onload = initSketchfab;
      document.body.appendChild(script);
    }

    return () => {
      // API cleanups if needed
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {/* Show loader only while loading is active */}
      <SketchFabLoader progress={progress} active={active} />

      <div
        className="sketchfab-embed-wrapper"
        style={{
          width: "100%",
          height: "542px",
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <iframe
          ref={iframeRef}
          title="Cozy Isometric Room"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            top: "-50px", 
            bottom:'100px',
            height: "650px",
            border: "none",
            background: "#F9F9FB",
          }}
        />
      </div>
    </div>
  );
}