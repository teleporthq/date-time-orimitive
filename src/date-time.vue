<template>
 <span>{{ formattedDate }}</span>
</template>

<script>

import dayjs from 'dayjs'
export default {
  name: 'DateTimePrimitive',
  props: {
    date: { type: [String, Date, Number], required: true },
    format: { type: String, default: 'DD/MM/YYYY' },
  },
  data() {
    return {
      formattedDate: ''
    };
  },
  created() {
    this.formatDate()
  },
  watch: {
    date() {
      this.formatDate()
    },
    format() {
      this.formatDate()
    }
  },
  methods: {
    formatDate() {
      const dateTime = dayjs.unix(new Date(this.date).getTime() / 1000);
      this.formattedDate = dayjs(dateTime).format(this.format);
    }
  },
}
</script>
