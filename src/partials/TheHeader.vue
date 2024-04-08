<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, nextTick, ref, watch } from "vue";
import userProfilePicture from "../assets/img/user_pfp_temporary.png";
import { useLayoutStore } from "../pinia/layout.pinia.ts";
import { useUserStore } from "../pinia/user.pinia.ts";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const searchInput = ref<string>("");
const searchInputRef = ref<any>(null);
const SearchInputFocused = ref<boolean>(false);

const layoutStore = useLayoutStore();

const computedHomeColor = computed(() => {
  return route.path === "/home" && { color: "#ffffff" };
});

const computedSearchColor = computed(() => {
  if (SearchInputFocused.value) return { color: "#ffffff" };
});

const computedLibraryColor = computed(() => {
  return route.path === "/search" && { color: "#ffffff" };
});

function setFocusState(focused: boolean) {
  SearchInputFocused.value = focused;
}

function routeToSearch() {
  router.push({ name: "search" });
}

function routeToNotifications() {
  router.push({ name: "notifications" });
}

function routeToProfile() {
  router.push({ name: "profile" });
}

function forwardsPage() {
  router.forward();
}

function lastPage() {
  router.back();
}

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName !== "search") {
      searchInput.value = "";
      setFocusState(false);

      if (searchInputRef.value) {
        nextTick(() => {
          searchInputRef.value.blur();
        });
      }
    }
  },
);
</script>

<template>
  <div class="h-16 flex justify-between items-center px-2">
    <div class="flex items-center gap-2 w-40">
      <div class="home-link-button link-icon" @click="lastPage">
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-chevron-left home-link-icon" />
      </div>
      <div class="home-link-button link-icon" @click="forwardsPage">
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-chevron-right home-link-icon" />
      </div>
    </div>
    <div class="flex justify-center items-center gap-2">
      <router-link
        :style="computedHomeColor"
        :to="{ name: 'home' }"
        class="home-link-button link-icon"
      >
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-house home-link-icon" />
      </router-link>
      <div
        :class="{
          'border-br-card-gray': SearchInputFocused,
          ' border-transparent': !SearchInputFocused,
        }"
        class="h-10 bg-card-gray rounded-full flex items-center border hover:border-br-card-gray duration-100 transition-all px-3"
        @click="routeToSearch"
      >
        <i
          :style="computedSearchColor"
          class="fa-solid fa-magnifying-glass link-icon pe-2.5"
        />
        <input
          ref="searchInputRef"
          v-model="searchInput"
          class="bg-transparent outline-0 text-white w-80"
          placeholder="What do you want to play?"
          type="text"
          @blur="setFocusState(false)"
          @focus="setFocusState(true)"
        />
        <div class="h-2/3 w-[1px] bg-br-card-gray" />
        <i
          :style="computedLibraryColor"
          class="fa-solid fa-record-vinyl link-icon ps-3"
        />
      </div>
    </div>
    <div class="flex items-center gap-2 justify-end w-40">
      <div class="home-link-button link-icon" @click="routeToNotifications">
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-bell home-link-icon" />
      </div>
      <div
        class="home-link-button link-icon"
        @click="layoutStore.setSidebarItem('FRIEND_ACTIVITY_SIDEBAR')"
      >
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-users home-link-icon" />
      </div>
      <div class="user-pfp-container" @click="routeToProfile">
        <img
          :src="userStore?.user?.photoURL ?? userProfilePicture"
          alt="user_profile_picture"
          class="w-8 h-8 shadow-card rounded-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-link-button {
  @apply relative flex justify-center items-center w-10 h-10;

  &:hover .home-link-button-bg {
    transform: scale(1.05);
  }
}

.home-link-icon {
  @apply duration-100 transition-all hover:text-white z-20;
}

.link-icon {
  @apply duration-100 transition-all cursor-pointer text-white/40 hover:text-white;
}

.home-link-button-bg {
  @apply absolute w-10 h-10 bg-card-gray rounded-full left-0 top-0 duration-100 transition-all z-10;
  &:hover {
    transform: scale(1.05);
  }
}

.user-pfp-container {
  @apply w-12 h-12 rounded-full bg-card-gray flex justify-center items-center hover:scale-105 cursor-pointer;
}
</style>
