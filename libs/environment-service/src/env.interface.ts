export interface EnvironmentVariables {
  // DB Envs
  db_host?: string;
  db_port: number;
  db_name: string;
  db_user: string;
  db_password: string;

  // JWT Envs
  jwt_secret: string;
  jwt_expires_in: string;

  // Mail Envs
  mail_host?: string;
  mail_port?: number;
  mail_user?: string;
  mail_password?: string;
  mail_from?: string;

  // Server Envs
  media_port?: number;
  node_env?: string;

  // Azure Envs
  azure_storage_account?: string;
  azure_storage_key?: string;
  azure_storage_container?: string;

  // Redis Envs
  redis_host?: string;
  redis_port?: number;
  redis_password?: string;

  // RabbitMQ Envs
  rabbitmq_host?: string;
  rabbitmq_port?: number;
  rabbitmq_user?: string;
  rabbitmq_password?: string;
  rabbitmq_url?: string;

  // Kafka Envs
  kafka_host?: string;
  kafka_port?: number;
  kafka_produce_topic?: string;
  kafka_consume_topic?: string;
  kafka_group_id?: string;
  kafka_user?: string;
  kafka_password?: string;
  kafka_client_id?: string;
  analysis_result?: string;
  new_upload?: string;

  // ERP
  erp_api_key?: string;
  erp_api_secret?: string;
  erp_base_url?: string;
  middleware_url?: string;

  // Sendgrid Envs
  send_grid_key?: string;
  user_url?: string;
  accu_api_key?: string;
  open_weather_api_key?: string;
  openai_ai_key?: string;
}
