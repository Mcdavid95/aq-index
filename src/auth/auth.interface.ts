export enum Action {
  create = 'create',
  update = 'update',
  read = 'read',
  delete = 'delete',
}

export enum Subject {
  packages = 'packages',
  subscriptions = 'subscriptions',
  machines = 'machines',
  deployments = 'deploymemnts',
  providers = 'providers',
  organizations = 'organizations',
  users = 'users',
}

export class ActionSubjectResponse {
  action: Action;
  subject: Subject;
}
