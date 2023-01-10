export interface IDatabaseConfigAttributes {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  dialect?: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
