<template>
  <QRCodeVue3
    :width="width"
    :height="height"
    :value="value"
    :qr-options="{ errorCorrectionLevel: 'H' }"
    :image-options="{ hideBackgroundDots: true, margin: 5 }"
    :cornersSquareOptions="{ type: 'extra-rounded', color: '#' + color }"
    :cornersDotOptions="{ type: 'square', color: '#' + color }"
    :dots-options="{ type: 'square', color: '#' + color , gradient: { type: 'linear', rotation: 0, colorStops: [ { offset: 0, color: '#'  + color }, { offset: 1, color: '#' + offsetColor } ] } }"
    :image="image"
  />
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'

export interface Props {
  value: string,
  color: string,
  width: number,
  height: number,
  image: string,
}

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 200,
  color: "000000",
});

defineComponent({
  components: {
    QRCodeVue3
  }
});

const offsetColor = computed<string>(() => {
  const percent = 85;
  let r = parseInt(props.color.slice(1, 3), 16),
    g = parseInt(props.color.slice(3, 5), 16),
    b = parseInt(props.color.slice(5, 7), 16);

  r = Math.round(r * (100 - percent) / 100);
  g = Math.round(g * (100 - percent) / 100);
  b = Math.round(b * (100 - percent) / 100);

  return ('0' + (r || 0).toString(16)).slice(-2) +
    ('0' + (g || 0).toString(16)).slice(-2) +
    ('0' + (b || 0).toString(16)).slice(-2);
});
</script>
