import { config } from 'dotenv';
import { EnvironmentVariables } from './env.interface';

config();

export class EnvironmentService {
  public static getAll(): EnvironmentVariables {
    return {
      azure_storage_account: process.env.AZURE_STORAGE_ACCOUNT,
      openai_ai_key: process.env.OPENAI_API_KEY,
      accu_api_key: process.env.ACCU_API_KEY,
      open_weather_api_key: process.env.OPEN_WEATHER_API_KEY,
      azure_storage_container: process.env.AZURE_STORAGE_CONTAINER,
      azure_storage_key: process.env.AZURE_STORAGE_KEY,
      db_host: process.env.DB_HOST,
      db_name: process.env.DB_NAME,
      db_password: process.env.DB_PASSWORD,
      db_port: Number(process.env.DB_PORT),
      db_user: process.env.DB_USER,
      jwt_secret: process.env.JWT_SECRETE_KEY,
      jwt_expires_in: process.env.JWT_EXPIRES_IN,
      mail_from: process.env.MAIL_FROM,
      mail_host: process.env.MAIL_HOST,
      mail_password: process.env.MAIL_PASSWORD,
      mail_port: Number(process.env.MAIL_PORT),
      mail_user: process.env.MAIL_USER,
      redis_host: process.env.REDIS_HOST,
      redis_password: process.env.REDIS_PASSWORD,
      redis_port: Number(process.env.REDIS_PORT),
      node_env: process.env.NODE_ENV,
      media_port: Number(process.env.MEDIA_PORT),
      rabbitmq_host: process.env.RABBITMQ_HOST,
      rabbitmq_password: process.env.RABBITMQ_PASSWORD,
      rabbitmq_port: Number(process.env.RABBITMQ_PORT),
      rabbitmq_user: process.env.RABBITMQ_USER,
      rabbitmq_url: process.env.RABBITMQ_URL,
      kafka_host: process.env.KAFKA_HOST,
      kafka_port: Number(process.env.KAFKA_PORT),
      kafka_user: process.env.KAFKA_USER,
      kafka_password: process.env.KAFKA_PASSWORD,
      kafka_consume_topic: process.env.KAFKA_CONSUME_TOPIC,
      kafka_produce_topic: process.env.KAFKA_PRODUCE_TOPIC,
      kafka_group_id: process.env.KAFKA_GROUP_ID,
      kafka_client_id: process.env.KAFKA_CLIENT_ID,
      analysis_result: process.env.ANALYSIS_RESULT,
      new_upload: process.env.NEW_UPLOAD,
      send_grid_key: process.env.SEND_GRID_KEY,
      user_url: process.env.USER_URL,
      erp_api_key: process.env.ERP_API_KEY,
      erp_api_secret: process.env.ERP_API_SECRET,
      erp_base_url: process.env.ERP_BASE_URL,
      middleware_url: process.env.MIDDLEWARE_URL,
    };
  }

  public static getValue(key: string): string {
    return EnvironmentService.getAll()[key.toLocaleLowerCase()];
  }
}
