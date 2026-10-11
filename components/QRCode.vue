<template>
  <div class="qrcode_container" ref="qrCodeRef"></div>
</template>

<script lang="ts" setup>
import QRCodeStyling, { Options } from 'styled-qr-code';
import { watch, computed, onMounted, ref } from 'vue';

const qrCodeRef: any = ref(null);

export interface Props {
  value: string,
  color?: string,
  offsetColor?: string,
  width?: number,
  height?: number,
  image?: string,
}

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 200,
  color: '000000',
  image: '',
});

const computedOffsetColor = computed<string>(() => {
  const percent = 85;
  const normalizedColor = props.color.startsWith('#') ? props.color.slice(1) : props.color;

  let r = parseInt(normalizedColor.slice(0, 2), 16),
    g = parseInt(normalizedColor.slice(2, 4), 16),
    b = parseInt(normalizedColor.slice(4, 6), 16);

  r = Math.round(r * (100 - percent) / 100);
  g = Math.round(g * (100 - percent) / 100);
  b = Math.round(b * (100 - percent) / 100);

  return ('0' + (r || 0).toString(16)).slice(-2) +
    ('0' + (g || 0).toString(16)).slice(-2) +
    ('0' + (b || 0).toString(16)).slice(-2);
});

const resolvedOffsetColor = computed<string>(() => {
  return props.offsetColor || computedOffsetColor.value;
});

const options: Options = {
  width: props.width,
  height: props.height,
  type: 'svg',
  data: props.value,
  image: props.image,
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'H',
  },
  imageOptions: {
    hideBackgroundDots: true,
    crossOrigin: 'anonymous',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#' + props.color
  },
  cornersDotOptions: {
    type: 'square',
    color: '#' + props.color
  },
  dotsOptions: {
    type: 'rounded',
    color: '#' + props.color,
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        {
          offset: 0,
          color: '#' + props.color
        },
        {
          offset: 1,
          color: '#' + resolvedOffsetColor.value
        }
      ]
    }
  },
};

const qrCode = new QRCodeStyling(options);

onMounted(async () => {
  qrCode.append(qrCodeRef.value);
});

watch(
  () => props.value,
  (newValue) => {
    qrCode.update({ ...options, data: newValue });
  },
);

</script>
