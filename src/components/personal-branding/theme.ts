export const theme = {
  colors: {
    primary: "#2563EB", // Motion Blue
    accent: "#14B8A6",  // Motion Teal
    background: "#030712", // Very dark navy / almost black for contrast
    surface: "rgba(255, 255, 255, 0.03)", // Glass surface
    surfaceHover: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    text: {
      primary: "#FFFFFF",
      secondary: "#94A3B8", // Slate 400
      accent: "#60A5FA", // Blue 400
    }
  },
  gradients: {
    primary: "linear-gradient(135deg, #2563EB 0%, #14B8A6 100%)",
    glow: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(20,184,166,0) 70%)",
    glass: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
  },
  shadows: {
    glowBlue: "0 0 40px rgba(37,99,235,0.3)",
    glowTeal: "0 0 40px rgba(20,184,166,0.3)",
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  blur: {
    glass: "12px",
    heavy: "40px",
  },
  spacing: {
    section: "8rem", // 128px
    component: "4rem", // 64px
    element: "1.5rem", // 24px
  },
  borderRadius: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    full: "9999px",
  }
};
