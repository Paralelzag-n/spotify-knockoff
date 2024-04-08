import { defineStore } from "pinia";
import {
  ILayoutState,
  sidebarComponentMap,
  SidebarItemKey,
} from "../ts/pinia/layout.types.ts";

export const useLayoutStore = defineStore("layout", {
  state: (): ILayoutState => ({
    yourLibraryWidth: 360,
    sidebarWidth: 360,
    sidebarItem: "SONG_DETAILS_SIDEBAR",

    mainPartialColor: "#5963ee",
    mainPartialScrolledDown: false,
  }),
  getters: {
    getYourLibraryWidth: (state: ILayoutState): number => {
      return state.yourLibraryWidth;
    },
    getSidebarWidth: (state: ILayoutState): number => {
      return state.sidebarWidth;
    },
    getSidebarComponent: (state: ILayoutState): any => {
      return sidebarComponentMap[state.sidebarItem];
    },
    getMainPartialColor: (state: ILayoutState): string => {
      return state.mainPartialColor;
    },
    getMainPartialScrolledDown: (state: ILayoutState): boolean => {
      return state.mainPartialScrolledDown;
    },
  },
  actions: {
    adjustSidebarWidth(delta: number): void {
      const sidebarMaxWidth = 400;
      const sidebarMinWidth = 300;

      const newWidth = this.sidebarWidth - delta;
      this.sidebarWidth = Math.max(
        sidebarMinWidth,
        Math.min(sidebarMaxWidth, newWidth),
      );
    },
    adjustYourLibraryWidth(delta: number): void {
      const yourLibraryMaxWidth = 400;
      const yourLibraryMinWidth = 120;

      const newWidth = this.yourLibraryWidth + delta;
      this.yourLibraryWidth = Math.max(
        yourLibraryMinWidth,
        Math.min(yourLibraryMaxWidth, newWidth),
      );
    },
    setYourLibraryWidth(width: number): void {
      this.yourLibraryWidth = width;
    },
    setSidebarItem(sidebarKey: SidebarItemKey): void {
      this.sidebarItem = sidebarKey;
    },
    setMainPartialColor(color: string | null): void {
      color
        ? (this.mainPartialColor = color)
        : (this.mainPartialColor = "#5963ee");
    },
    setMainPartialScrolledDown(scrolled: boolean): void {
      this.mainPartialScrolledDown = scrolled;
    },
  },
});
