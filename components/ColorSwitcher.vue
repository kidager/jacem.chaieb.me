<script>
import IconDark from '@/components/icons/IconDark'
import IconLight from '@/components/icons/IconLight'
import IconSystem from '@/components/icons/IconSystem'

export default {
  methods: {
    currentThemeIcon() {
      switch (useColorMode().preference) {
        case "dark":
          return IconDark;
        case "light":
          return IconLight;
        default:
          return IconSystem;
      }
    },
    nextTheme() {
      switch (useColorMode().preference) {
        case "system":
          return "light";
        case "light":
          return "dark";
        default:
          return "system";
      }
    }
  }
}
</script>

<template>
  <div
    class="color-switcher"
    @click="$colorMode.preference = nextTheme()"
  >
    <component :is="currentThemeIcon()" />
  </div>
</template>

<style lang="scss" scoped>
.color-switcher {
  position: absolute;
  top: 1dvw;
  right: 1dvw;

  padding: 5px;
  margin: 0;

  cursor: pointer;
  border-radius: 5px;

  background-color: $borders;
  border: 2px solid $borders;
  color: $social-icons-color;
  .dark-theme & {
    background-color: $dark-borders;
    border: 2px solid $dark-borders;
    color: $dark-social-icons-color;
  }

  transition: all 0.1s ease;
}
</style>
