import TheSongDetailsSidebar from "../../partials/sidebar-partials/TheSongDetailsSidebar.vue";
import TheQueueSidebar from "../../partials/sidebar-partials/TheQueueSidebar.vue";
import { markRaw } from "vue";
import TheFriendActivitySidebar from "../../partials/sidebar-partials/TheFriendActivitySidebar.vue";

export interface ILayoutState {
  yourLibraryWidth: number;
  sidebarWidth: number;
  sidebarItem: ESidebarItem;
}

export enum ESidebarItem {
  SONG_DETAILS_SIDEBAR = markRaw(TheSongDetailsSidebar),
  QUEUE_SIDEBAR = markRaw(TheQueueSidebar),
  FRIEND_ACTIVITY_SIDEBAR = markRaw(TheFriendActivitySidebar),
}
