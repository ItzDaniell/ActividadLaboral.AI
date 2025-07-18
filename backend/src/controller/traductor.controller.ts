import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('api/translate-cv')
export class TraductorController {
  @Post()
  async translateCV(@Body() body: { text: string; to: string }): Promise<any> {
    const { text, to } = body;
    const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
    const url = `${endpoint}&to=${to}`;
    const subscriptionKey = process.env.AZURE_TRANSLATOR_KEY || '';
    const region = 'southcentralus';

    try {
      const response = await axios.post(url, [{ Text: text }], {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Ocp-Apim-Subscription-Region': region,
          'Content-type': 'application/json',
        },
      });

      const data = response.data as any[];
      return { translation: data[0]?.translations[0]?.text || '' };
    } catch (error) {
      console.error('Error en la traducción:', error.response?.data || error.message);
      throw new Error(`Error en la traducción: ${error.response?.data || error.message}`);
    }
  }
}