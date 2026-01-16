import { isReactive, isReadonly } from 'vue';

export const usePreviousDate = date => {
  const display = [];
  for (let i = 0; i <= date.date(0).day(); i++) {
    display.push(date.date(0).subtract(i, 'day'));
  }
  return display.sort((a, b) => a.date() - b.date());
};

export const useCurrentDate = date => {
  return Array.from(
    {
      length: date.daysInMonth()
    },
    (v, k) => date.date(k + 1)
  );
};

export const useNextDate = date => {
  const display = [];
  for (
    let i = 1;
    i <= 42 - (usePreviousDate(date).length + date.daysInMonth());
    i++
  ) {
    display.push(
      date
        .date(i)
        .month(date.month())
        .add(1, 'month')
    );
  }
  return display;
};

export const useDisableDate = (date, { disableDate }) => {
  if (typeof disableDate === 'function') {
    return disableDate(date.toDate());
  } else {
    return false;
  }
};

export const useBetweenRange = (date, { previous, next }) => {
  return !!(date.isBetween(previous, next, 'date', '[]') && !date.off);
};

export const useToValueFromString = (date, { formatter }) => {
  return date.format(formatter.date);
};

export const useToValueFromArray = (
  { previous, next },
  { formatter, separator }
) => {
  return `${previous.format(formatter.date)}${separator}${next.format(
    formatter.date
  )}`;
};

export const useDirective = (binding, vnode) => {
  const { arg, value } = binding;
  const { context } = vnode;
  document.body.addEventListener('click', $event => {
    if ($event.target.classList.contains('litepie-datepicker-overlay')) {
      console.log('closed by overlay check!');
      return (context.isShow = false);
    } else {
      if (context.LitepieDatepickerRef) {
        const { autoApply, previous, next } = context;
        const target = $event.target.classList.contains(
          'litepie-datepicker-date'
        );
        if (target && autoApply && !previous && !next) {
          return (context.isShow = false);
        }
        if (
          !autoApply &&
          $event.target.classList.contains(`${arg}-apply-picker`) &&
          context.value !== ''
        ) {
          return (context.isShow = false);
        }
        if ($event.target.classList.contains(`${arg}-cancel-picker`)) {
          return (context.isShow = false);
        }

        return (context.isShow =
          context.LitepieDatepickerRef.contains($event.target) ||
          document.getElementById(value) === $event.target ||
          value === $event.target);
      }
      return (context.isShow = true);
    }
  });
};

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
