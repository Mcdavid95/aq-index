import { EnvironmentService } from '@aq-index/environment-service';
import { EnvironmentVariables } from '@aq-index/environment-service/env.interface';
import { Injectable } from '@nestjs/common';
import OpenAi, { OpenAI } from 'openai';

@Injectable()
export class GptService {
  private readonly openAIClient: OpenAI;
  private readonly env: EnvironmentVariables;

  constructor() {
    this.env = EnvironmentService.getAll();
    this.openAIClient = new OpenAi({
      apiKey: this.env.openai_ai_key,
    });
  }
  public async getGPTResponse(text) {
    const response = await this.openAIClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You're a helpful assistant who helps  people with their inquiries on Air quality Indices.",
        },
        {
          role: 'user',
          content: `What are the health repercussions of the following air quality indices:
          ${text}
          `,
        },
      ],
    });
    console.log('====================================');
    console.log(response.choices[0]);
    console.log('====================================');
    return response.choices[0];
  }
}
