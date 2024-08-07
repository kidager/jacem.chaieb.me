<script setup>
import IconDark from '@/components/icons/theme-switcher/IconDark'
import IconLight from '@/components/icons/theme-switcher/IconLight'
import IconSystem from '@/components/icons/theme-switcher/IconSystem'

const colorModes = ['system', 'light', 'dark']
const components = {
  system: IconSystem,
  light: IconLight,
  dark: IconDark
}

const nextColorMode = (currentColor) => {
  const index = colorModes.findIndex((element) => element == (currentColor ?? 'system'))

  return colorModes[(index + 1) % colorModes.length]
}
</script>

<template>
  <div
    class="color-switcher"
    @click="$colorMode.preference = nextColorMode($colorMode.preference)"
  >
    <component :is="components[$colorMode.preference]" />
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
  transition: all 0.1s ease;

  .dark-theme & {
    background-color: $dark-borders;
    border: 2px solid $dark-borders;
    color: $dark-social-icons-color;
  }
}
</style>
