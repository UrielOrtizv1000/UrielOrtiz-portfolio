import type { ComponentType } from "react";
import BookiaPreview from "./BookiaPreview";
import DevProfilePreview from "./DevProfilePreview";
import EcommercePreview from "./EcommercePreview";
import IntercambioPreview from "./IntercambioPreview";
import KubePreview from "./KubePreview";
import NovaPreview from "./NovaPreview";
import type { PreviewProps } from "./shared";

export { BrowserFrame, ScaledStage } from "./shared";

/* Simulated, self-running demo for each project id in data.ts. */
export const previews: Record<string, ComponentType<PreviewProps>> = {
  resilenciaKubernetes: KubePreview,
  bookiaStore: BookiaPreview,
  ecommerceApi: EcommercePreview,
  nova: NovaPreview,
  intercambioMagico: IntercambioPreview,
  devprofile: DevProfilePreview,
};
