import configuration from '../configuration';

describe('Configuration', () => {
  it('should return the correct value', () => {
    const cfg = configuration();

    expect(cfg).toBeTruthy();
    expect(Object.keys(cfg)).toHaveLength(8);
    expect(cfg).toHaveProperty('version');
    expect(cfg).toHaveProperty('mode');
    expect(cfg).toHaveProperty('port');
    expect(cfg).toHaveProperty('sentry');
    expect(cfg).toHaveProperty('cerberus');
    expect(cfg).toHaveProperty('database');
    expect(cfg).toHaveProperty('sign');
    expect(cfg).toHaveProperty('sabiumRest');

    expect(cfg.sentry).toBeTruthy();
    expect(Object.keys(cfg.sentry)).toHaveLength(1);
    expect(cfg.sentry).toHaveProperty('dsn');

    expect(cfg.cerberus).toBeTruthy();
    expect(Object.keys(cfg.cerberus)).toHaveLength(6);
    expect(cfg.cerberus).toHaveProperty('url');
    expect(cfg.cerberus).toHaveProperty('serviceId');
    expect(cfg.cerberus).toHaveProperty('serviceKey');
    expect(cfg.cerberus).toHaveProperty('timeout');
    expect(cfg.cerberus).toHaveProperty('publicKey');
    expect(cfg.cerberus).toHaveProperty('appId');

    expect(cfg.database).toBeTruthy();
    expect(Object.keys(cfg.database)).toHaveLength(2);
    expect(cfg.database).toHaveProperty('default');
    expect(cfg.database).toHaveProperty('sabium');

    expect(cfg.database.default).toBeTruthy();
    expect(Object.keys(cfg.database.default)).toHaveLength(6);
    expect(cfg.database.default).toHaveProperty('host');
    expect(cfg.database.default).toHaveProperty('port');
    expect(cfg.database.default).toHaveProperty('database');
    expect(cfg.database.default).toHaveProperty('username');
    expect(cfg.database.default).toHaveProperty('password');
    expect(cfg.database.default).toHaveProperty('timeout');

    expect(cfg.database.sabium).toBeTruthy();
    expect(Object.keys(cfg.database.sabium)).toHaveLength(6);
    expect(cfg.database.sabium).toHaveProperty('host');
    expect(cfg.database.sabium).toHaveProperty('port');
    expect(cfg.database.sabium).toHaveProperty('database');
    expect(cfg.database.sabium).toHaveProperty('username');
    expect(cfg.database.sabium).toHaveProperty('password');
    expect(cfg.database.sabium).toHaveProperty('timeout');

    expect(cfg.sign).toBeTruthy();
    expect(Object.keys(cfg.sign)).toHaveLength(4);
    expect(cfg.sign).toHaveProperty('api');
    expect(cfg.sign).toHaveProperty('token');
    expect(cfg.sign).toHaveProperty('secret');
    expect(cfg.sign).toHaveProperty('returnUrl');

    expect(cfg.sabiumRest).toBeTruthy();
    expect(Object.keys(cfg.sabiumRest)).toHaveLength(2);
    expect(cfg.sabiumRest).toHaveProperty('port');
    expect(cfg.sabiumRest).toHaveProperty('timeout');
  });
});
