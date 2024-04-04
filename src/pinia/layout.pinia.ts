import { defineStore } from "pinia";
import { ESidebarItem, ILayoutState } from "../ts/pinia/layout.types.ts";

export const useLayoutStore = defineStore("layout", {
  state: (): ILayoutState => ({
    yourLibraryWidth: 360,
    sidebarWidth: 360,
    sidebarItem: ESidebarItem.SONG_DETAILS_SIDEBAR,

    mainPartialColor: "#5963ee",
  }),
  getters: {
    getYourLibraryWidth: (state: ILayoutState): number => {
      return state.yourLibraryWidth;
    },
    getSidebarWidth: (state: ILayoutState): number => {
      return state.sidebarWidth;
    },
    getSelectedSidebarItem: (state: ILayoutState): ESidebarItem => {
      return state.sidebarItem;
    },
    getMainPartialColor: (state: ILayoutState): string => {
      return state.mainPartialColor;
    },
  },
  actions: {
    adjustSidebarWidth(delta: number): void {
      const sidebarMaxWidth = 450;
      const sidebarMinWidth = 300;

      const newWidth = this.sidebarWidth - delta;
      this.sidebarWidth = Math.max(
        sidebarMinWidth,
        Math.min(sidebarMaxWidth, newWidth)
      );
    },
    adjustYourLibraryWidth(delta: number): void {
      const yourLibraryMaxWidth = 450;
      const yourLibraryMinWidth = 80;

      const newWidth = this.yourLibraryWidth + delta;
      this.yourLibraryWidth = Math.max(
        yourLibraryMinWidth,
        Math.min(yourLibraryMaxWidth, newWidth)
      );
    },
    setYourLibraryWidth(width: number): void {
      this.yourLibraryWidth = width;
    },
    setSidebarItem(sidebar: ESidebarItem): void {
      this.sidebarItem = sidebar;
    },
    setMainPartialColor(color: string | null): void {
      color
        ? (this.mainPartialColor = color)
        : (this.mainPartialColor = "#5963ee");
    },
  },
});
