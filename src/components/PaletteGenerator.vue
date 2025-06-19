<template>
  <div class="palette-generator">
    <div class="controls">
      <div class="control-group">
        <label for="paletteType">Tipo de Harmonia:</label>
        <select id="paletteType" v-model="selectedPaletteType">
          <option value="random">Aleatória (Pura)</option>
          <option value="monochromatic">Monocromática</option>
          <option value="analogous">Análoga</option>
          <option value="complementary">Complementar</option>
          <option value="triadic">Triádica</option>
        </select>
      </div>

      <div class="control-group">
        <label for="paletteEnergy">Energia da Paleta:</label>
        <select id="paletteEnergy" v-model="selectedPaletteEnergy">
          <option value="random">Qualquer (Aleatória)</option>
          <option value="passion">Paixão & Energia</option>
          <option value="calm">Calma & Serenidade</option>
          <option value="joyful">Alegria & Otimismo</option>
          <option value="nature">Natureza & Equilíbrio</option>
          <option value="trust">Confiança & Profissionalismo</option>
          <option value="sophisticated">Sofisticação & Mistério</option>
        </select>
      </div>

      <button class="generate-btn" @click="generatePalette">Gerar Nova Paleta</button>
    </div>

    <div class="color-cards-container">
      <ColorCard
        v-for="(color, index) in currentPalette"
        :key="index"
        :color="color.hex"
        :rgb="color.rgb"
        :hsl="color.hsl"
      />
    </div>
  </div>
</template>

<script>
import ColorCard from './ColorCard.vue';
import { mapState, mapActions } from 'vuex'; // Ajuda a mapear o estado e as ações do Vuex

// Importa funções utilitárias para manipulação e geração de cores (HSL para RGB/HEX, random)
// Localizadas em src/utils/colorUtils.js
import { hslToRgb, rgbToHex, getColorDataFromHSL, getRandomInt } from '@/utils/colorUtils';

// Mapeamento das energias para faixas de Matiz (Hue), Saturação (Saturation) e Luminosidade (Lightness)
// Isso define as características de cor para cada "energia" selecionada
const ENERGY_MAPPING = {
  'random': { hueRange: [0, 359], satRange: [40, 90], lightRange: [30, 70] },
  'passion': { hueRange: [330, 30], satRange: [70, 100], lightRange: [40, 60] }, // Vermelhos, laranjas vibrantes
  'calm': { hueRange: [180, 240], satRange: [30, 60], lightRange: [50, 80] },   // Azuis, cianos suaves
  'joyful': { hueRange: [30, 90], satRange: [60, 95], lightRange: [50, 85] },    // Amarelos, verdes-limão brilhantes
  'nature': { hueRange: [90, 150], satRange: [50, 80], lightRange: [30, 70] },  // Verdes, marrons terrosos
  'trust': { hueRange: [200, 220], satRange: [40, 70], lightRange: [30, 60] },  // Azuis mais escuros, neutros
  'sophisticated': { hueRange: [270, 300], satRange: [10, 40], lightRange: [20, 50] }, // Roxos dessaturados, cinzas escuros
};

export default {
  name: 'PaletteGenerator', // Nome do componente Vue
  components: {
    ColorCard, // Registra o componente ColorCard para uso neste template
  },
  data() {
    return {
      // Propriedade para armazenar o tipo de harmonia selecionado pelo usuário
      selectedPaletteType: 'random',
      // Propriedade para armazenar a energia da paleta selecionada pelo usuário
      selectedPaletteEnergy: 'random',
      // Número de cores na paleta gerada
      numColors: 5,
    };
  },
  computed: {
    // Mapeia o estado 'currentPalette' do Vuex para uma propriedade computada local
    ...mapState(['currentPalette']),
  },
  methods: {
    // Mapeia a ação 'setPalette' do Vuex para um método local
    ...mapActions(['setPalette']),

    // Método principal para gerar a paleta de cores
    generatePalette() {
      let newPalette = []; // Array que armazenará as novas cores da paleta
      
      // Obtém as configurações de matiz, saturação e luminosidade base da energia selecionada
      const energyConfig = ENERGY_MAPPING[this.selectedPaletteEnergy];
      let baseHue; // Matiz base para a geração da paleta

      // Lógica para determinar a matiz base, considerando ranges que cruzam 0/360 graus
      if (this.selectedPaletteEnergy === 'random' || energyConfig.hueRange[0] <= energyConfig.hueRange[1]) {
        // Se a energia for aleatória ou o range de matiz for normal (não cruza 0/360)
        baseHue = getRandomInt(energyConfig.hueRange[0], energyConfig.hueRange[1]);
      } else {
        // Se o range de matiz cruza 0/360 (ex: de 330 a 30, passando por 0)
        const range1 = 360 - energyConfig.hueRange[0]; // Ex: 360 - 330 = 30
        const range2 = energyConfig.hueRange[1];      // Ex: 30
        // Sorteia em qual parte do range (antes ou depois de 0) a matiz base cairá
        if (getRandomInt(0, range1 + range2) < range1) {
          baseHue = getRandomInt(energyConfig.hueRange[0], 359);
        } else {
          baseHue = getRandomInt(0, energyConfig.hueRange[1]);
        }
      }

      // Gera saturação e luminosidade base dentro dos ranges definidos pela energia
      const baseSaturation = getRandomInt(energyConfig.satRange[0], energyConfig.satRange[1]);
      const baseLightness = getRandomInt(energyConfig.lightRange[0], energyConfig.lightRange[1]);

      // Lógica de geração da paleta baseada no tipo de harmonia selecionado
      switch (this.selectedPaletteType) {
        case 'random': 
          // Gera cores aleatórias, mas respeitando os ranges de matiz, saturação e luminosidade da energia
          for (let i = 0; i < this.numColors; i++) {
            newPalette.push(getColorDataFromHSL(
              // Matiz aleatório dentro do range de energia (ou totalmente aleatório se energia for 'random')
              (this.selectedPaletteEnergy === 'random' || energyConfig.hueRange[0] <= energyConfig.hueRange[1]) ? 
                getRandomInt(energyConfig.hueRange[0], energyConfig.hueRange[1]) :
                (Math.random() * (360 - energyConfig.hueRange[0] + energyConfig.hueRange[1]) < (360 - energyConfig.hueRange[0])) ?
                  getRandomInt(energyConfig.hueRange[0], 359) : getRandomInt(0, energyConfig.hueRange[1]),
              
              getRandomInt(energyConfig.satRange[0], energyConfig.satRange[1]), // Saturação aleatória dentro do range de energia
              getRandomInt(energyConfig.lightRange[0], energyConfig.lightRange[1]) // Luminosidade aleatória dentro do range de energia
            ));
          }
          break;
        case 'monochromatic':
          // Gera cores com a mesma matiz, variando saturação e luminosidade
          for (let i = 0; i < this.numColors; i++) {
            // Calcula variações lineares de luminosidade e saturação
            const lightness = (energyConfig.lightRange[0] + (i * (energyConfig.lightRange[1] - energyConfig.lightRange[0]) / (this.numColors -1) ) );
            const saturation = (energyConfig.satRange[0] + (i * (energyConfig.satRange[1] - energyConfig.satRange[0]) / (this.numColors -1) ) );

            newPalette.push(getColorDataFromHSL(baseHue, 
                // Garante que saturação e luminosidade fiquem dentro dos limites da energia
                Math.max(energyConfig.satRange[0], Math.min(energyConfig.satRange[1], saturation)), 
                Math.max(energyConfig.lightRange[0], Math.min(energyConfig.lightRange[1], lightness))
            ));
          }
          break;
        case 'analogous':
          // Gera cores adjacentes no círculo cromático (ex: +/- 20 graus da matiz base)
          for (let i = 0; i < this.numColors; i++) {
            const hue = (baseHue + (i - Math.floor(this.numColors / 2)) * 20 + 360) % 360;
            newPalette.push(getColorDataFromHSL(hue, baseSaturation, baseLightness));
          }
          break;
        case 'complementary':
          // Gera cores complementares (opostas no círculo cromático) e suas variações
          newPalette.push(getColorDataFromHSL(baseHue, baseSaturation, baseLightness)); // Cor base
          newPalette.push(getColorDataFromHSL((baseHue + 180) % 360, baseSaturation, baseLightness)); // Cor complementar
          // Adiciona mais cores variando luminosidade/saturação a partir das duas cores base
          for (let i = 2; i < this.numColors; i++) {
              const adjustedLightness = (baseLightness + (i % 2 === 0 ? 10 : -10) + 100) % 100;
              const adjustedSaturation = (baseSaturation + (i % 2 === 0 ? -10 : 10) + 100) % 100;
              // Pega o H da cor base complementar correspondente para manter a harmonia
              const currentBaseHue = newPalette[i % 2 === 0 ? 0 : 1].hsl.match(/hsl\((\d+)/)[1];
              newPalette.push(getColorDataFromHSL(parseInt(currentBaseHue), 
                Math.max(energyConfig.satRange[0], Math.min(energyConfig.satRange[1], adjustedSaturation)), 
                Math.max(energyConfig.lightRange[0], Math.min(energyConfig.lightRange[1], adjustedLightness))
              ));
          }
          break;
        case 'triadic':
            // Gera 3 cores igualmente espaçadas (120 graus) no círculo cromático
            for (let i = 0; i < 3; i++) {
                const hue = (baseHue + i * 120) % 360;
                newPalette.push(getColorDataFromHSL(hue, baseSaturation, baseLightness));
            }
            // Adiciona mais cores variando luminosidade/saturação a partir das três cores base
            for (let i = 3; i < this.numColors; i++) {
                // Pega o H da cor base triádica correspondente para manter a harmonia
                const baseHueForVariation = newPalette[i % 3].hsl.match(/hsl\((\d+)/)[1];
                const adjustedLightness = (baseLightness + (i % 2 === 0 ? 10 : -10) + 100) % 100;
                const adjustedSaturation = (baseSaturation + (i % 2 === 0 ? -10 : 10) + 100) % 100;
                newPalette.push(getColorDataFromHSL(parseInt(baseHueForVariation), 
                  Math.max(energyConfig.satRange[0], Math.min(energyConfig.satRange[1], adjustedSaturation)), 
                  Math.max(energyConfig.lightRange[0], Math.min(energyConfig.lightRange[1], adjustedLightness))
                ));
            }
            break;
        default: 
          // Fallback para qualquer caso não coberto (deve ser raro com os cases acima)
          for (let i = 0; i < this.numColors; i++) {
            newPalette.push(getColorDataFromHSL(
              getRandomInt(0, 359),
              getRandomInt(40, 90),
              getRandomInt(30, 70)
            ));
          }
          break;
      }
      // Commita a nova paleta para o estado do Vuex
      this.$store.commit('setPalette', newPalette);
    },
  },
  created() {
    // Gera uma paleta inicial quando o componente é criado pela primeira vez
    this.generatePalette();
  },
};
</script>


<style lang="scss" scoped>
.palette-generator {
  margin-top: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 10px;

  label {
    font-size: 1.1em;
    font-weight: bold;
    white-space: nowrap;
  }

  select {
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    min-width: 150px;
    flex-grow: 1;
    max-width: 250px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    flex-shrink: 0;

    &:hover {
      background-color: #369c71;
    }
  }
}

.color-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 65px; 

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
    flex-shrink: 0; 

    
    flex: 0 0 200px;

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
}
</style>