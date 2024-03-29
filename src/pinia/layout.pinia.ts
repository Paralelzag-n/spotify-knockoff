import { defineStore } from "pinia";
import { ILayoutState } from "../ts/pinia/layout.types.ts";

export const useLayoutStore = defineStore("layout", {
  state: (): ILayoutState => ({
    yourLibraryWidth: 360,
    sidebarWidth: 360,
    selectedSidebarItem: "",
  }),
  getters: {
    getYourLibraryWidth: (state: ILayoutState): number => {
      return state.yourLibraryWidth;
    },
    getSidebarWidth: (state: ILayoutState): number => {
      return state.sidebarWidth;
    },
  },
  actions: {
    adjustSidebarWidth(delta: number): void {
      const sidebarMaxWidth = 600;
      const sidebarMinWidth = 300;

      const newWidth = this.sidebarWidth - delta;
      this.sidebarWidth = Math.max(
        sidebarMinWidth,
        Math.min(sidebarMaxWidth, newWidth),
      );
    },
    adjustYourLibraryWidth(delta: number): void {
      const yourLibraryMaxWidth = 600;
      const yourLibraryMinWidth = 125;

      const newWidth = this.yourLibraryWidth + delta;
      this.yourLibraryWidth = Math.max(
        yourLibraryMinWidth,
        Math.min(yourLibraryMaxWidth, newWidth),
      );
    },
  },
});
