import React, { createContext, useContext, useState, useEffect } from "react";
import type { WorkspaceTheme, WorkspaceMember } from "../../types/teamWorkspace";
import { TeamWorkspaceService } from "../../lib/teamWorkspaceService";

interface TeamThemeContextValue {
  theme: WorkspaceTheme;
  setTheme: (newTheme: WorkspaceTheme) => Promise<void>;
}

const TeamThemeContext = createContext<TeamThemeContextValue>({
  theme: "dark",
  setTheme: async () => {}
});

interface TeamThemeProviderProps {
  member?: WorkspaceMember | null;
  children: React.ReactNode;
}

export const TeamThemeProvider: React.FC<TeamThemeProviderProps> = ({ member, children }) => {
  const [theme, setThemeState] = useState<WorkspaceTheme>(() => {
    const saved = localStorage.getItem("motionly_team_theme") as WorkspaceTheme | null;
    if (saved && (saved === "dark" || saved === "white" || saved === "gray")) {
      return saved;
    }
    if (member?.theme && (member.theme === "dark" || member.theme === "white" || member.theme === "gray")) {
      return member.theme;
    }
    return "dark";
  });

  // Sync if member.theme loads from remote and no local override
  useEffect(() => {
    if (member?.theme && !localStorage.getItem("motionly_team_theme")) {
      setThemeState(member.theme);
    }
  }, [member?.theme]);

  const setTheme = async (newTheme: WorkspaceTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("motionly_team_theme", newTheme);
      if (member?.id) {
        await TeamWorkspaceService.updateMember(
          member.id,
          { theme: newTheme },
          { name: member.name, email: member.email }
        );
      }
    } catch (e) {
      console.warn("Failed to persist theme preference:", e);
    }
  };

  return (
    <TeamThemeContext.Provider value={{ theme, setTheme }}>
      <div 
        className={`team-workspace transition-colors duration-200 ${
          theme === "white" ? "team-theme-white" : theme === "gray" ? "team-theme-gray" : "team-theme-dark"
        }`} 
        data-theme={theme}
      >
        {children}
      </div>
    </TeamThemeContext.Provider>
  );
};

export const useTeamTheme = (): TeamThemeContextValue => useContext(TeamThemeContext);
