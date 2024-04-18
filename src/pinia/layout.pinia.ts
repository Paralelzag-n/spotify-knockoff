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

    defaultPartialColor: "#5963ee",
    mainPartialColor: null,
    mainPartialScrolledDown: false,
    timeoutId: null,
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
    getMainPartialColor: (state: ILayoutState): string | null => {
      return state.mainPartialColor;
    },
    getDefaultPartialColor: (state: ILayoutState): string => {
      return state.defaultPartialColor;
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
      const yourLibraryMinWidth = 80;

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
    setMainPartialColor(color: string | null) {
      if (this.timeoutId) clearTimeout(this.timeoutId);

      if (!color) {
        this.timeoutId = setTimeout(() => {
          this.mainPartialColor = null;
          this.timeoutId = null;
        }, 300);
        return;
      }

      this.mainPartialColor = null;
      setTimeout(() => {
        this.mainPartialColor = color;
      }, 0);
    },
    setMainPartialScrolledDown(scrolled: boolean): void {
      this.mainPartialScrolledDown = scrolled;
    },
  },
});
