import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModuleBuilder, Test } from '@nestjs/testing';
import { AppModule } from 'src/modules/app.module';
import supertest from 'supertest';

export const initTestApp = async (
  override?: (testModule: TestingModuleBuilder) => TestingModuleBuilder,
  module: any = AppModule,
) => {
  let rootBuilder = Test.createTestingModule({
    imports: [module],
  });

  if (override) {
    rootBuilder = override(rootBuilder);
  }
  const app = (await rootBuilder.compile())
    .createNestApplication()
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        validationError: {
          target: true,
          value: false,
        },
        validateCustomDecorators: true,
      }),
    );
  await app.init();
  return {
    app,
  };
};

export const createRequestFunction = (app: INestApplication) =>
  async function request(
    url: string,
    {
      expected = 200,
      method = 'get',
      body,
      contentType = 'application/json',
      accept = 'application/json',
      attachment,
      query,
      accessToken = 'Token',
    }: {
      expected?: number;
      method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
      body?: any;
      contentType?: string;
      accept?: string;
      attachment?: {
        name: string;
        file: string;
      };
      accessToken?: string;
      query?: Record<string, any>;
    } = {},
  ) {
    const agent = supertest.agent(app.getHttpServer());
    const req = agent[method](url)
      .set('Accept', accept)
      .set('Authorization', `Bearer ${accessToken}`);
    if (attachment) {
      req.attach(attachment.name, attachment.file);
    }
    if (query) {
      req.query(query);
    }
    const reqAfterSend = body
      ? req.set('Content-Type', contentType).send(body)
      : req;

    return reqAfterSend.expect(expected).then((res) => {
      return res;
    });
  };

export const initTestAppWithCustomModule = async (
  module: any,
): Promise<{
  app: INestApplication;
}> => {
  const testBuilder = Test.createTestingModule({
    imports: [module],
  });

  const fixture = await testBuilder.compile();
  const app = fixture.createNestApplication();

  await app.init();
  return {
    app,
  };
};
