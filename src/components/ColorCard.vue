<template>
  <div class="color-card" :style="{ backgroundColor: color }">
    <div class="color-info">
      <span class="hex-code">{{ color }}</span>
      <button @click="copyToClipboard(color)" title="Copiar HEX">HEX</button>
      <button @click="copyToClipboard(rgb)" title="Copiar RGB">RGB</button>
      <button @click="copyToClipboard(hsl)" title="Copiar HSL">HSL</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorCard',
  props: {
    color: {
      type: String,
      required: true,
    },
    rgb: {
        type: String,
        default: ''
    },
    hsl: {
        type: String,
        default: ''
    }
  },
  methods: {
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        alert(`"${text}" copiado para a área de transferência!`);
      } catch (err) {
        console.error('Falha ao copiar: ', err);
        alert('Erro ao copiar. Seu navegador pode não suportar a API Clipboard.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.color-card {
  width: 200px;
  height: 150px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  color: #fff; 
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }

  .color-info {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 12px;
    border-radius: 5px;
    display: flex;
    gap: 10px;
    align-items: center;

    .hex-code {
      font-weight: bold;
      font-size: 1.1em;
    }

    button {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8em;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>