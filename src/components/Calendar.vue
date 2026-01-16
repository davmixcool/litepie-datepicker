<template>
  <transition-group
    tag="div"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
    class="flex flex-wrap py-1 -m-px"
  >
    <div
      v-for="date in calendar.date()"
      :key="`${date.$d}`"
      :style="{
        width: `calc(100% / ${weeks.length})`
      }"
      class="my-px"
    >
      <div
        class="relative flex justify-center flex-1"
        :class="{ 'litepie-tooltip': asRange && date.duration() }"
        :data-tooltip="`${date.duration()}`"
      >
        <transition
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition-opacity duration-200 ease-out"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <span
            v-if="isBetweenRange(date) || date.hovered()"
            class="absolute bg-litepie-primary-100 dark:bg-litepie-secondary-700 dark:bg-opacity-50"
            :class="betweenRangeClasses(date)"
          ></span>
        </transition>
        <button
          type="button"
          class="relative flex items-center justify-center w-10 h-10 text-xs litepie-datepicker-date lg:w-9 lg:h-9 2xl:text-sm focus:outline-none"
          :class="[
            datepickerClasses(date),
            asRange ? 'transition-all' : 'transition-colors'
          ]"
          :disabled="date.disabled || date.inRange()"
          @click="$emit('update:date', date, asPrevOrNext)"
          @mouseenter="atMouseOver(date)"
          v-text="date.date()"
          :data-date="date.toDate()"
        ></button>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'LitepieCalendar',
  props: {
    asPrevOrNext: Boolean,
    calendar: Object,
    weeks: Array,
    asRange: Boolean
  },
  inheritAttrs: false,
  emits: ['update:date'],
  setup() {
    const isBetweenRange = inject('isBetweenRange');
    const betweenRangeClasses = inject('betweenRangeClasses');
    const datepickerClasses = inject('datepickerClasses');
    const atMouseOver = inject('atMouseOver');

    return {
      isBetweenRange,
      betweenRangeClasses,
      datepickerClasses,
      atMouseOver
    };
  }
});
</script>

<!-- TODO: Tooltip implementasion-->
<!--<style lang="scss">-->
<!--.litepie-tooltip {-->
<!--  &#45;&#45;litepie-datepicker: 0px;-->
<!--  &:hover::before,-->
<!--  &:hover::after {-->
<!--    @apply block;-->
<!--  }-->
<!--  &::before {-->
<!--    content: attr(data-tooltip); /* here's the magic */-->
<!--    @apply absolute tracking-tight bottom-full text-xs hidden whitespace-nowrap px-1.5 py-1 rounded bg-litepie-secondary-700 text-white dark:bg-white dark:text-litepie-secondary-700;-->
<!--  }-->
<!--  &::after {-->
<!--    content: '';-->
<!--    @apply absolute left-2 top-0 w-3 h-3  shadow border border-black border-opacity-5 hidden bg-litepie-secondary-700 dark:bg-white;-->
<!--    transform: translate(50%, -50%) rotate(135deg);-->
<!--    clip-path: polygon(-->
<!--      calc(var(&#45;&#45;litepie-datepicker) * -1) calc(var(&#45;&#45;litepie-datepicker) * -1),-->
<!--      calc(100% + var(&#45;&#45;litepie-datepicker))-->
<!--        calc(var(&#45;&#45;litepie-datepicker) * -1),-->
<!--      calc(100% + var(&#45;&#45;litepie-datepicker))-->
<!--        calc(100% + var(&#45;&#45;litepie-datepicker))-->
<!--    );-->
<!--  }-->
<!--}-->
<!--</style>-->
