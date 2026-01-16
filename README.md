<p align="center">
    <a href="#" target="_blank">
      <img alt="Litepie Datepicker" width="100" style="border-radius: 100%;" src="https://scontent.fcgk25-1.fna.fbcdn.net/v/t1.0-9/22281628_485014348533434_6964733013244745390_n.png?_nc_cat=100&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeFPh0ZaX75opOYLZ_0XkEfD6fapV0TUimDp9qlXRNSKYC_E1nO4VqI9_mOQl_k7XrHF02aqGUdTU9CnhlgaETgY&_nc_ohc=BA2LGeQXOGIAX966oAc&_nc_ht=scontent.fcgk25-1.fna&oh=aed478f71f4f4cce98453c74e0ca9703&oe=60669475">
    </a><br><br>
    Litepie Datepicker is a date range picker component for Vue.js and Tailwind CSS, dependent on day.js.
</p>

---

## Features

- Date range picker or single date picker
- Customizable shortcuts
- Dark mode support
- Tailwind CSS styling
- Vue 2.7 Composition API support
- Customizable date formatting via day.js
- Disable specific dates
- Multiple value formats (Array, Object, String)

## Requirements

- Vue 2.7+
- Tailwind CSS 2.x
- day.js 1.10+

## Installation

```bash
npm install @davmixcool/litepie-datepicker
# or
yarn add @davmixcool/litepie-datepicker
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install vue@^2.7.0 dayjs@^1.10.4 tailwindcss@^2.0.4
```

## Configuration

### Tailwind CSS Configuration

Add the datepicker to your `tailwind.config.js` content/purge configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your other content paths
    './node_modules/@davmixcool/litepie-datepicker/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for the datepicker
        'litepie-primary': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        'litepie-secondary': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    }
  }
};
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <litepie-datepicker v-model="dateValue" />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);

    return {
      dateValue
    };
  }
};
</script>
```

### With Custom Formatter

```vue
<template>
  <div>
    <litepie-datepicker
      :formatter="formatter"
      v-model="dateValue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);
    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    });

    return {
      dateValue,
      formatter
    };
  }
};
</script>
```

### Single Date Picker

```vue
<template>
  <div>
    <litepie-datepicker
      as-single
      v-model="dateValue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref('');

    return {
      dateValue
    };
  }
};
</script>
```

### With Custom Shortcuts

```vue
<template>
  <div>
    <litepie-datepicker
      :shortcuts="customShortcuts"
      v-model="dateValue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';
import dayjs from 'dayjs';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);

    const customShortcuts = () => {
      return [
        {
          label: 'Today',
          atClick: () => {
            const today = dayjs();
            return [today, today];
          }
        },
        {
          label: 'Last 7 days',
          atClick: () => {
            const today = dayjs();
            return [today.subtract(6, 'day'), today];
          }
        },
        {
          label: 'This month',
          atClick: () => {
            const today = dayjs();
            return [today.startOf('month'), today.endOf('month')];
          }
        }
      ];
    };

    return {
      dateValue,
      customShortcuts
    };
  }
};
</script>
```

### Disable Specific Dates

```vue
<template>
  <div>
    <litepie-datepicker
      :disable-date="disableDates"
      v-model="dateValue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';
import dayjs from 'dayjs';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);

    // Disable all past dates
    const disableDates = (date) => {
      return dayjs(date).isBefore(dayjs(), 'day');
    };

    return {
      dateValue,
      disableDates
    };
  }
};
</script>
```

### Using Object Value Format

```vue
<template>
  <div>
    <litepie-datepicker v-model="dateValue" />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref({
      startDate: '',
      endDate: ''
    });

    return {
      dateValue
    };
  }
};
</script>
```

### With Manual Apply Button

```vue
<template>
  <div>
    <litepie-datepicker
      :auto-apply="false"
      v-model="dateValue"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);

    return {
      dateValue
    };
  }
};
</script>
```

### With Custom Slot

```vue
<template>
  <div>
    <litepie-datepicker v-model="dateValue">
      <template #default="{ value, placeholder }">
        <button class="custom-button">
          {{ value || placeholder }}
        </button>
      </template>
    </litepie-datepicker>
  </div>
</template>

<script>
import { ref } from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

export default {
  components: {
    LitepieDatepicker
  },
  setup() {
    const dateValue = ref([]);

    return {
      dateValue
    };
  }
};
</script>
```

## Nuxt 2 Usage

### Installation

```bash
npm install @davmixcool/litepie-datepicker
```

### Create a Plugin

Create a plugin file `plugins/litepie-datepicker.js`:

```js
import Vue from 'vue';
import LitepieDatepicker from '@davmixcool/litepie-datepicker';

Vue.component('LitepieDatepicker', LitepieDatepicker);
```

### Register the Plugin

Add the plugin to your `nuxt.config.js`:

```js
export default {
  // ...
  plugins: [
    { src: '~/plugins/litepie-datepicker.js', mode: 'client' }
  ],
  build: {
    transpile: ['@davmixcool/litepie-datepicker']
  }
};
```

### Configure Tailwind CSS

Update your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your other content paths
    './node_modules/@davmixcool/litepie-datepicker/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'litepie-primary': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        'litepie-secondary': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    }
  }
};
```

### Usage in Components

Use in your Vue components with `client-only` wrapper:

```vue
<template>
  <div>
    <client-only>
      <litepie-datepicker
        :formatter="formatter"
        v-model="dateValue"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateValue: [],
      formatter: {
        date: 'DD MMM YYYY',
        month: 'MMM'
      }
    };
  }
};
</script>
```

### Using with Composition API in Nuxt 2

If you want to use the Composition API syntax in Nuxt 2:

```vue
<template>
  <div>
    <client-only>
      <litepie-datepicker
        :formatter="formatter"
        v-model="dateValue"
      />
    </client-only>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const dateValue = ref([]);
    const formatter = ref({
      date: 'DD MMM YYYY',
      month: 'MMM'
    });

    return {
      dateValue,
      formatter
    };
  }
});
</script>
```

### Single Date Picker in Nuxt 2

```vue
<template>
  <div>
    <client-only>
      <litepie-datepicker
        as-single
        :formatter="formatter"
        v-model="dateValue"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateValue: '',
      formatter: {
        date: 'YYYY-MM-DD',
        month: 'MMM'
      }
    };
  }
};
</script>
```

### With Custom Shortcuts in Nuxt 2

```vue
<template>
  <div>
    <client-only>
      <litepie-datepicker
        :shortcuts="customShortcuts"
        v-model="dateValue"
      />
    </client-only>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      dateValue: []
    };
  },
  methods: {
    customShortcuts() {
      return [
        {
          label: 'Today',
          atClick: () => {
            const today = dayjs();
            return [today, today];
          }
        },
        {
          label: 'Last 7 days',
          atClick: () => {
            const today = dayjs();
            return [today.subtract(6, 'day'), today];
          }
        },
        {
          label: 'This month',
          atClick: () => {
            const today = dayjs();
            return [today.startOf('month'), today.endOf('month')];
          }
        }
      ];
    }
  }
};
</script>
```

### Disable Dates in Nuxt 2

```vue
<template>
  <div>
    <client-only>
      <litepie-datepicker
        :disable-date="disablePastDates"
        v-model="dateValue"
      />
    </client-only>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      dateValue: []
    };
  },
  methods: {
    disablePastDates(date) {
      return dayjs(date).isBefore(dayjs(), 'day');
    }
  }
};
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `Array`, `Object`, `String` | `[]` | The selected date value |
| `asSingle` | `Boolean` | `false` | Use as a single date picker instead of range |
| `useRange` | `Boolean` | `false` | Enable range selection with single calendar |
| `placeholder` | `Boolean`, `String` | `false` | Custom placeholder text |
| `separator` | `String` | `' ~ '` | Separator between start and end dates |
| `formatter` | `Object` | `{ date: 'YYYY-MM-DD HH:mm:ss', month: 'MMM' }` | Date format options |
| `autoApply` | `Boolean` | `true` | Automatically apply selection without confirmation button |
| `shortcuts` | `Boolean`, `Function` | `true` | Show shortcuts or provide custom shortcuts function |
| `disableDate` | `Boolean`, `Array`, `Function` | `false` | Disable specific dates |
| `disableInRange` | `Boolean` | `true` | Disable dates that are in the selected range |
| `trigger` | `String` | `null` | Element ID that triggers the datepicker |
| `overlay` | `Boolean` | `false` | Show overlay behind datepicker |
| `startFrom` | `Object`, `String` | `new Date()` | Initial date to show in calendar |
| `i18n` | `String` | `'en'` | Locale for day.js |

## Formatter Object

The `formatter` prop accepts an object with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `date` | `String` | `'YYYY-MM-DD HH:mm:ss'` | Date format (follows day.js format) |
| `month` | `String` | `'MMM'` | Month format in calendar header |

### Common Date Formats

| Format | Example |
|--------|---------|
| `YYYY-MM-DD` | 2024-01-15 |
| `DD/MM/YYYY` | 15/01/2024 |
| `MM/DD/YYYY` | 01/15/2024 |
| `DD MMM YYYY` | 15 Jan 2024 |
| `MMMM DD, YYYY` | January 15, 2024 |
| `YYYY-MM-DD HH:mm:ss` | 2024-01-15 00:00:00 |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `input` | `Array`, `Object`, `String` | Emitted when the date selection changes |

## Slots

### Default Slot

The default slot allows you to customize the trigger element.

| Slot Prop | Type | Description |
|-----------|------|-------------|
| `value` | `String` | The formatted date value |
| `placeholder` | `String` | The placeholder text |

## Theming

### Light Mode

<p align="center">
    <img src="https://raw.githubusercontent.com/kenhyuwa/litepie-datepicker/main/assets/light-mode.png" alt="Light mode" />
</p>

### Dark Mode

The datepicker supports dark mode through Tailwind CSS. Add the `dark` class to a parent element:

```html
<div class="dark">
  <litepie-datepicker v-model="dateValue" />
</div>
```

<p align="center">
    <img src="https://raw.githubusercontent.com/kenhyuwa/litepie-datepicker/main/assets/dark-mode.png" alt="Dark mode" />
</p>

### Custom Colors

You can customize the datepicker colors by extending your Tailwind CSS theme with custom `litepie-primary` and `litepie-secondary` color palettes (see Configuration section above).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with appropriate polyfills)

## Changelog

All notable changes to this project will be documented in the [CHANGELOG](CHANGELOG.md).

## License

The [MIT](LICENSE) License. Please [see](http://opensource.org/licenses/MIT) for more information.

## Credits

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [day.js](https://day.js.org/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
